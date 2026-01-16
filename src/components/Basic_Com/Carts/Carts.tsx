"use client";

import { useState, useEffect, useContext } from "react";
import { ShoppingCart, Trash2, Star, Check } from "lucide-react";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Footer";
import { Slide, toast } from "react-toastify";
import { AuthContext } from "@/components/Authentication_Work/AuthProvider/AuthProvider";
import moment from "moment";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "@/url/useAxiosPublic";
import { Link } from "react-router";

type CourseItem = {
  name: string;
  id: string;
  price: number;
  img: string;
};

type CartInfo = {
  courses: CourseItem[];
  totalAmount: number;
  currency: "BDT" | "USD";
  paymentStatus: "Pending" | "Paid" | "Failed";
  email: string | null;
  orderDate: string;
  link: string;
};

interface Course {
  _id: string;
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  priceBDT: number;
  priceUSD: number;
  rating: number;
  students: number;
  image: string;
  instructor: string;
  duration: string;
  level: string;
  curriculum: string[];
  whatYouLearn: string[];
}

export default function Carts() {
  const authContext = useContext(AuthContext);
  // FIX 1: Safely access person without throwing an error that crashes the app
  const person = authContext?.person;

  const [data, setData] = useState<Course[]>([]);
  const [con, setCon] = useState("BD");
  const [mounted, setMounted] = useState(false); // FIX 2: Prevents hydration mismatch

  // Load cart data and country from localStorage on mount
  useEffect(() => {
    setMounted(true); // Indicate component has mounted on client

    // FIX 3: Safe JSON parsing
    try {
      const stData = localStorage.getItem("loca");
      const cartData = stData ? JSON.parse(stData) : [];

      // Double check if it's actually an array
      if (Array.isArray(cartData)) {
        setData(cartData);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      setData([]); // Fallback to empty to prevent crash
    }

    // Get country from localStorage (set by Details page)
    const country = localStorage.getItem("userCountry") || "BD";
    setCon(country);
  }, []);

  // Remove item from cart
  const removeItem = (id: string) => {
    const updatedCart = data.filter((item) => item._id !== id);
    setData(updatedCart);
    localStorage.setItem("loca", JSON.stringify(updatedCart));
    toast.success("Item Removed From Cart!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  };

  //
  const axiosPub = useAxiosPublic();
  const { data: user } = useQuery({
    queryKey: ["premium-user"],
    queryFn: async () => {
      const response = await axiosPub.get(`/premium/${person?.email}`);
      return response.data;
    },
  });

  console.log(user?.Premium);

  const getPrice = (item: Course) => {
    const rawPrice = con === "BD" ? item.priceBDT : item.priceUSD;
    // convert to number
    const finalPrice = Number(rawPrice);
    return isNaN(finalPrice) ? 0 : finalPrice;
  };

  // Calculate totals
  const subtotal = data.reduce((sum, item) => sum + getPrice(item), 0);
  const tax = subtotal * 0.1;
  const total =
    user?.Premium === true ? (subtotal + tax) * 0.8 : subtotal + tax;
  // const total = subtotal + tax;

  const mutationUp = useMutation({
    mutationFn: async (cartInfoo: CartInfo) => {
      const res = await axiosPub.post("/finalorders", cartInfoo);
      return res.data;
    },
    onSuccess: () => {
      localStorage.setItem("loca", JSON.stringify([]));
      setData([]);
      toast.success("Order placed successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    },
  });

  // proceed to checkout
  const ProceedToCheckout = () => {
    if (!person) {
      toast.error("Please log in to proceed to checkout!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      return;
    }

    const selectedData = data.map((item) => ({
      name: item?.title,
      id: item._id,
      price: con === "BD" ? item.priceBDT : item.priceUSD,
      img: item.image,
      status: "pending",
    }));

    const cartInfo: CartInfo = {
      courses: selectedData,
      totalAmount: total,
      currency: con === "BD" ? "BDT" : "USD",
      paymentStatus: "Pending",
      email: person.email,
      orderDate: moment().format("LL"),
      link: "pending",
    };

    console.log(cartInfo);
    mutationUp.mutate(cartInfo);
  };
    const buyPre = () => {
    if (!person) {
      toast.error("Please log in to purchase premium membership!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      return;
    }
    if (user?.Premium === true) {
      toast.info("You already have a premium membership!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      return;
    }
    mutationUpX.mutate();

  };
  const queryClient = useQueryClient();

  const mutationUpX = useMutation({
    mutationFn: async () => {
      const response = await axiosPub.patch(`/premium/${person?.email}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["premium-user"] });
      toast.success("Premium membership activated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    },
  });

  // FIX 4: Don't render until mounted to prevent hydration errors/white screen
  if (!mounted) return null;

  return (
    <div>
      <Nav></Nav>
      <div className="poppins min-h-screen bg-white mt-20">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <ShoppingCart className="w-6 sm:w-8 h-6 sm:h-8 text-black flex-shrink-0" />
                <h1 className="text-lg sm:text-2xl font-bold text-black truncate">
                  Learning Cart
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 flex-shrink-0 ml-2">
                {data.length} courses
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {data.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <ShoppingCart className="w-12 sm:w-16 h-12 sm:h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-2">
                Your cart is empty
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Start learning by adding courses to your cart
              </p>
              <Link to="/allproducts">
                <button className="bg-black text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition text-sm sm:text-base">
                  Browse Courses
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4 sm:space-y-5">
                  {data.map((item: Course) => (
                    <Link key={item._id} to={`/d/${item._id}`}>
                      <div className="group relative flex flex-col sm:flex-row gap-4 sm:gap-5 p-4 sm:p-5 border-2 border-gray-200 rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-xl hover:border-gray-400 transition-all duration-300 hover:-translate-y-1">
                        {/* Course Image */}
                        <div className="relative w-full sm:w-32 sm:h-32 h-48 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 shadow-md">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {/* Overlay Badge */}
                          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
                            {item.level}
                          </div>
                        </div>

                        {/* Course Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-black transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3 font-medium">
                              by <span className="text-gray-900">{item.instructor}</span>
                            </p>

                            {/* Rating and Students */}
                            <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
                              <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-bold text-gray-900">
                                  {item.rating}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
                                <span className="text-xs font-semibold text-blue-900">
                                  {item.students.toLocaleString()} students
                                </span>
                              </div>
                            </div>

                            {/* Duration Badge */}
                            <div className="inline-flex items-center gap-2 text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                              <span className="font-medium">Duration:</span>
                              <span className="font-bold text-gray-900">{item.duration}</span>
                            </div>
                          </div>

                          {/* Price and Remove Button */}
                          <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-200">
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500 font-medium mb-1">Price</span>
                              <span className="text-2xl sm:text-3xl font-extrabold text-black">
                                {con === "BD" ? "TK" : "$"}
                                {getPrice(item).toFixed(2)}
                              </span>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                removeItem(item._id);
                              }}
                              className="group/btn p-3 text-gray-400 hover:text-white hover:bg-red-500 rounded-xl transition-all duration-300 flex-shrink-0 border-2 border-gray-300 hover:border-red-500 shadow-sm hover:shadow-md"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Continue Shopping */}
                <div className="mt-8 sm:mt-10">
                  <Link to="/allproducts">
                    <button className="group flex items-center gap-2 text-black font-bold hover:text-gray-600 transition-all duration-300 text-base px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl border-2 border-gray-300">
                      <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                      <span>Continue Shopping</span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Pricing Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-20 sm:top-24">
                  {/* Premium Badge */}
                  {user?.Premium === true && (
                    <div className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-500 rounded-full p-1.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm font-bold text-blue-900">
                            Premium Active
                          </span>
                        </div>
                        <div className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-300">
                          20% OFF
                        </div>
                      </div>
                    </div>
                  )}
                  {user?.Premium === false && (
                    <div className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-red-500 rounded-full p-1.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm font-bold text-blue-900">
                            Get Premium for 20% OFF
                          </span>
                        </div>
                        <div onClick={() => buyPre()} className="cursor-pointer bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-300">
                          Upgrade
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Order Summary Card */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-2xl p-5 sm:p-7 shadow-lg">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-black rounded-lg p-2">
                        <ShoppingCart className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Order Summary
                      </h2>
                    </div>

                    {/* Price Breakdown */}
                    <div className="bg-white rounded-xl p-4 mb-5 shadow-sm">
                      <div className="space-y-3.5">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 font-medium">
                            Subtotal ({data.length} {data.length === 1 ? 'course' : 'courses'})
                          </span>
                          <span className="font-semibold text-gray-900 text-base">
                            {con === "BD" ? "TK" : "$"}
                            {subtotal.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 font-medium">
                            Tax (10%)
                          </span>
                          <span className="font-semibold text-gray-900 text-base">
                            {con === "BD" ? "TK" : "$"}
                            {tax.toFixed(2)}
                          </span>
                        </div>
                        
                        {/* Divider */}
                        <div className="border-t-2 border-dashed border-gray-300 my-3"></div>
                        
                        {/* Total */}
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-lg font-bold text-gray-900">
                            Total Amount
                          </span>
                          <span className="text-2xl font-extrabold text-black">
                            {con === "BD" ? "TK" : "$"}
                            {total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 mb-5">
                      <button
                        onClick={() => ProceedToCheckout()}
                        className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-3.5 rounded-xl font-bold hover:from-gray-800 hover:to-black transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 text-base"
                      >
                        Proceed to Checkout →
                      </button>

                      <Link to="/allproducts">
                        <button className="w-full border-2 border-gray-300 bg-white text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-base">
                          Continue Shopping
                        </button>
                      </Link>
                    </div>

                    {/* Benefits Section */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                      <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        What's Included
                      </h3>
                      <div className="space-y-2.5">
                        <div className="flex items-start gap-2.5">
                          <div className="bg-green-500 rounded-full p-0.5 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-xs sm:text-sm text-gray-700 font-medium">
                            Lifetime access to all courses
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <div className="bg-green-500 rounded-full p-0.5 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-xs sm:text-sm text-gray-700 font-medium">
                            30-day money-back guarantee
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <div className="bg-green-500 rounded-full p-0.5 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-xs sm:text-sm text-gray-700 font-medium">
                            Certificate of completion
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
}
