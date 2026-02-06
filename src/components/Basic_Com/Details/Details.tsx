import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Clock, Users, Award, Globe } from "lucide-react";
import { useParams } from "react-router";
import Nav from "../Navbar/Nav";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/url/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { Slide, toast } from "react-toastify";
import { AuthContext } from "@/components/Authentication_Work/AuthProvider/AuthProvider";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
interface Course {
  _id: string;
  id: number;
  drive: string;
  title: string;
  description: string;
  fullDescription: string;
  price: number;
  rating: number;
  students: number;
  image: string;
  instructor: string;
  duration: string;
  level: string;
  curriculum: string[];
  whatYouLearn: string[];
  priceBDT?: number;
  priceUSD?: number;
}
type OrderCourse = {
  name: string;
  id: string;
  img: string;
  status: "pending" | "completed" | "waitting";
  price: number;
};
type Order = {
  courses: OrderCourse[];
  totalAmount: number;
  currency: "BDT" | "USD";
  paymentStatus: "Pending" | "Paid" | "Failed" | "waitting";
  email: string | null;
  orderDate: string;
  link: string;
};



const Details = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext is undefined");
  }
  const { person } = auth;
  //
  //
  //
  //
  //
  const [con, setCon] = useState("BD");
  const [totalmoney,setTotalMoney] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [allData, setAllData] = useState<Order | null>(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_address: '',
    customer_city: '',
    customer_post_code: '',
    amount: totalmoney, 
    currency: con
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      
    });
  };
  const handleSubmitt = async(e) => {
    e.preventDefault();

    console.log("Submitting total amount:", totalmoney);
    
    try {
      const dataToSend = {
        ...formData,
        ...allData,
        totalAmount: totalmoney,
        amount: totalmoney,
        currency: con
      };
      console.log("Shurjopay-র জন্য রেডি করা ডাটা:", dataToSend);

      const res = await axios.post('http://localhost:3000/api/payment/pay', dataToSend)
      console.log("Shurjopay response:", res.data);

      // Check if payment URL exists in response
      if (res.data && res.data.checkout_url) {
        // Redirect to payment gateway
        window.location.href = res.data.checkout_url;
      } else if (res.data && res.data.url) {
        // Alternative URL field
        window.location.href = res.data.url;
      } else {
        toast.error("Payment URL not found. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          transition: Slide,
        });
      }
      
      setIsOpen(false);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        transition: Slide,
      });
      setIsOpen(false);
    }
  };

  // Optimized country detection
  const fetchCountry = async () => {
    const COUNTRY_CACHE_KEY = "userCountry";
    const COUNTRY_CACHE_AT = "userCountryTime";
    const RATE_LIMIT_COOLDOWN_UNTIL = "ipLookupCooldownUntil";

    // Helper: fetch with timeout
    const fetchWithTimeout = async (url: string, ms = 5000) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), ms);
      try {
        const res = await fetch(url, { signal: controller.signal });
        return res;
      } finally {
        clearTimeout(id);
      }
    };

    try {
      // Respect cooldown if previously rate-limited
      const cooldownUntil = parseInt(
        localStorage.getItem(RATE_LIMIT_COOLDOWN_UNTIL) || "0",
        10
      );
      if (cooldownUntil && Date.now() < cooldownUntil) {
        const cached = localStorage.getItem(COUNTRY_CACHE_KEY);
        if (cached) {
          setCon((prev) => (prev !== cached ? cached : prev));
        }
        setIsLoading(false);
        return;
      }

      let newCountry: string | null = null;

      // Primary provider: ipapi.co
      try {
        const res = await fetchWithTimeout("https://ipapi.co/json/", 6000);
        if (!res.ok) {
          // If rate-limited, set cooldown for 10 minutes
          if (res.status === 429) {
            localStorage.setItem(
              RATE_LIMIT_COOLDOWN_UNTIL,
              String(Date.now() + 10 * 60 * 1000)
            );
          }
          throw new Error(`ipapi.co failed with ${res.status}`);
        }
        const data = await res.json();
        newCountry = data?.country || null;
      } catch {
        // Fallback provider: ipwho.is
        try {
          const res2 = await fetchWithTimeout("https://ipwho.is/", 6000);
          if (res2.ok) {
            const data2 = await res2.json();
            if (data2 && data2.success !== false) {
              newCountry = data2?.country_code || null;
            }
          }
        } catch {
          // ignore, will use cache/default below
        }
      }

      // If both providers failed, use cached value if available
      if (!newCountry) {
        const cached = localStorage.getItem(COUNTRY_CACHE_KEY);
        if (cached) {
          setCon((prev) => (prev !== cached ? cached : prev));

          setIsLoading(false);
          return;
        }
        // Final fallback
        newCountry = "BD";
      }

      // Update state only if changed
      setCon((prev) => {
        if (prev !== newCountry) {
          console.log(`Country changed: ${prev} -> ${newCountry}`);
          return newCountry as string;
        }
        return prev;
      });

      // Cache successful result
      localStorage.setItem(COUNTRY_CACHE_KEY, newCountry);
      localStorage.setItem(COUNTRY_CACHE_AT, String(Date.now()));

      setIsLoading(false);
    } catch (error) {
      console.error("IP fetch error:", error);
      // On error, try use cached country to avoid blocking UI
      const cached = localStorage.getItem("userCountry");
      if (cached) {
        setCon((prev) => (prev !== cached ? cached : prev));
      }
      setIsLoading(false);
    }
  };

  // Manual refresh for immediate VPN change detection
  const handleRefreshCountry = () => {
    setIsLoading(true);
    fetchCountry();
  };

  // Optimized: Check on mount, tab visibility change, and every 60 seconds
  useEffect(() => {
    fetchCountry(); // Initial fetch

    // Check when user returns to tab (likely after VPN change)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchCountry();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Check every 60 seconds as backup (92% fewer API calls than 5 seconds)
    const interval = setInterval(fetchCountry, 60000);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(interval);
    };
  }, []);

  const { id } = useParams();
  const axiosPub = useAxiosPublic();
  const { data: course } = useQuery({
    queryKey: ["all-courses-single", id, con],
    queryFn: async () => {
      const res = await axiosPub.get(`/single/${id}`);
      return res.data;
    },
    enabled: !isLoading,
  });

  // add to local storage function
  const prod = (c: Course) => {
    const storedData = localStorage.getItem("loca");
    const loca = storedData ? JSON.parse(storedData) : [];
    const x = loca.find((item: Course) => item._id == c._id);
    if (x) {
      toast.success("Already Added To Cart!", {
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
    loca.push(c);
    localStorage.setItem("loca", JSON.stringify(loca));
    toast.success("Added To Cart!", {
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

  // Order work from here
  const order = (c: Course) => {
    if (!person) {
      toast.error("Please Login First!");
      return;
    }
    setIsOpen(true);


    
    
    const orderInfo: Order = {
      courses: [
        {
          name: c?.title,
          id: c._id,
          img: c.image,
          status: "pending",
          price: con == "BD" ? conPremium ? Number( course.priceBDT )* 0.8 : Number( course.priceBDT ): conPremium ? Number(course.priceUSD) * 0.8 : Number(course.priceUSD),
        },
      ],
      totalAmount: con == "BD" ? conPremium ? Number( course.priceBDT )* 0.8 : Number( course.priceBDT ): conPremium ? Number(course.priceUSD) * 0.8 : Number(course.priceUSD),
      currency: con === "BDT" ? "BDT" : "USD",
      paymentStatus: "waitting",
      email: person.email,
      orderDate: moment().format("LL"),
      link: "pending",
    };

    setTotalMoney(orderInfo.totalAmount);
    setAllData(orderInfo);

    // mutationOrder.mutate(orderInfo);
  };
  // Order work end here

  // const mutationOrder = useMutation({
  //   mutationFn: async (orderData: Order) => {
  //     const response = await axiosPub.post(`/finalorders`, orderData);
  //     return response.data;
  //   },
  //   onSuccess: () => {
  //     toast.success("Order Placed Successfully!", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //       transition: Slide,
  //     });
  //   },
  // });
  const { data : premiumData } = useQuery({
    queryKey: ["premium"],
    queryFn: async () => {
      const response = await axiosPub.get(`/premium/${person?.email}`);
      return response.data;
    },
  });

  const conPremium = premiumData?.Premium;

  

  // SEBL WORK START
  //
  //
  //
  // const handleOrderNow = async () => {
  //   if(!person){
  //     toast.error("Please Login First!");
  //     return;
  //   }
  //   try {
  //     // ✅ Backend এ payment initiate request পাঠাচ্ছি
  //     const res = await axiosPub.post("/api/initiate-payment", {
  //       amount: 500, // Demo amount
  //       currency : con === "BD" ? "BDT" : "USD",
  //     });

  //     // ✅ Gateway URL পেলে redirect
  //     if (res.data.url) {
  //       console.log(res.data, "SEBL data")
  //       window.location.href = res.data.url;
  //     } else {
  //       alert("Payment gateway link not found!");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error initiating payment!");
  //   }
  // };
  //
  //
  //
  //
  //
  // SEBL WORK END

  return (
    <div>
      <Nav></Nav>
      {/*  */}
      {/* skalaton loader start */}
      {course ? (
        <>
          <div className="poppins min-h-screen bg-background  md:mt-20 lg:mt-0  md:max-w-7xl sm:p-0 md:mx-auto md:px-4  lg:px-8 pt-16 pb-20 lg:pt-20 lg:pb-32">
            {/* <div className="container mx-auto px-4 py-4 lg:block hidden">
                  <button
                    onClick={handleRefreshCountry}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                  >
                    <Globe className="h-4 w-4" />
                    {isLoading ? "Detecting..." : `Location: ${con}`}
                    
                    <span className="ml-2 text-xs opacity-75">
                      Click to refresh
                    </span>
                  </button>
                </div> */}
            {/* Hero Section */}
            <div className="relative h-96 bg-card border-b">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${course.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/70" />
              </div>

              <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl">
                  {course.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-6 max-w-2xl">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="font-semibold text-lg">
                      {course.rating}
                    </span>
                    <span className="text-muted-foreground">rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    {/* <span className="font-semibold text-lg">
                  {course.students.toLocaleString()}
                </span> */}
                    <span className="text-muted-foreground">students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-lg">
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-lg">
                      {course.level}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Course Details */}
                <div className="lg:col-span-2 space-y-8">
                  {/* About */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">
                      About This Course
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {course.fullDescription}
                    </p>
                  </section>

                  {/* What You'll Learn */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">
                      What You'll Learn
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.whatYouLearn.map(
                        (item: string, index: string) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 bg-card p-4 rounded-lg border"
                          >
                            <span className="text-primary mt-1 text-xl">✓</span>
                            <span className="text-muted-foreground">
                              {item}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </section>

                  {/* Curriculum */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">
                      Course Curriculum
                    </h2>
                    <div className="space-y-3">
                      {course.curriculum.map((item: string, index: string) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 bg-card p-4 rounded-lg border"
                        >
                          <span className="text-primary font-bold text-lg min-w-[32px]">
                            {index + 1}.
                          </span>
                          <span className="text-foreground font-medium">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Instructor */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Your Instructor</h2>
                    <div className="bg-card p-6 rounded-lg border">
                      <p className="text-xl font-semibold">
                        {course.instructor}
                      </p>
                      <p className="text-muted-foreground mt-2">
                        Expert instructor with years of experience in the field
                      </p>
                    </div>
                  </section>
                </div>

                {/* Right Column - Purchase Card */}
                <div className="lg:col-span-1">
  <div className="sticky top-4 bg-card border rounded-lg p-6 shadow-lg">
    {/* Course Image */}
    <div className="aspect-video w-full bg-muted rounded-lg mb-4 overflow-hidden relative">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-full object-cover"
      />
      {/* Optional: Overlay Badge on image if Premium */}
      {conPremium && (
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
          Premium 20% OFF
        </div>
      )}
    </div>

    {/* Price Section */}
    <div className="mb-6">
      {(() => {
        // 1. Calculate variables cleanly before rendering
        const currency = con === "BD" ? "BDT" : "USD";
        const originalPrice = con === "BD" ? Number( course.priceBDT ): Number(course.priceUSD);
        // Calculate discounted price if premium, otherwise use original
        const finalPrice = conPremium ? originalPrice * 0.8 : originalPrice;

        return (
          <div className="space-y-1">
            {/* Conditional Premium Badge above price */}
            {conPremium && (
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  Membership Active
                </span>
                <span className="text-xs text-green-600 font-bold">
                  20% Saved
                </span>
              </div>
            )}

            <div className="flex items-end flex-wrap gap-2">
              {/* Main Price */}
              <p className="text-4xl font-bold text-primary">
                <span className="text-2xl font-semibold text-muted-foreground mr-1">
                  {currency}
                </span>
                {/* Math.round or toFixed(0) creates cleaner numbers */}
                {Math.round(Number(finalPrice))} 
              </p>

              {/* Strikethrough Original Price (Only if Premium) */}
              {conPremium && (
                <p className="text-lg text-muted-foreground line-through mb-1">
                   {Math.round(originalPrice)}
                </p>
              )}
            </div>
          </div>
        );
      })()}
    </div>

    {/* Actions */}
    <div className="space-y-3">
      <Button onClick={() => order(course)} className="w-full text-lg h-12">
        Buy Now
      </Button>
      {isOpen && (
       <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 relative animate-fade-in-down">
            
            {/* ক্লোজ বাটন (X) */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Payment Details</h2>

            <form onSubmit={handleSubmitt} className="space-y-4">
              
              {/* নাম */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="customer_name"
                  required
                  placeholder="Your Name"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* ফোন ও পোস্ট কোড (পাশাপাশি) */}
              <div className="flex gap-4">
                <div className="w-2/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    name="customer_phone"
                    required
                    placeholder="xxxxxxxxxx"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Post Code <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="customer_post_code"
                    required
                    placeholder="1200"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* ঠিকানা */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="customer_address"
                  required
                  placeholder="Your address"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* শহর */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="customer_city"
                  required
                  placeholder="Your City"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* সাবমিট বাটন */}
              <button 
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg mt-4 transition duration-300"
              >
                Proceed to Pay
              </button>

            </form>
          </div>
        </div>
      )}
      <Button
        onClick={() => prod(course)}
        variant="outline"
        className="w-full text-lg h-12"
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
    </div>

    {/* Features */}
    <div className="mt-6 pt-6 border-t space-y-3">
      <h3 className="font-semibold mb-3">This course includes:</h3>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>{course.duration} of content</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Award className="h-4 w-4" />
        <span>Certificate of completion</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Users className="h-4 w-4" />
        <span>Lifetime access</span>
      </div>
    </div>
  </div>
</div>
                {/* Location Refresh Button */}
                <div className="container mx-auto px-4 py-4 ">
                  <button
                    onClick={handleRefreshCountry}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                  >
                    <Globe className="h-4 w-4" />
                    {isLoading ? "Detecting..." : `Location: ${con}`}
                    {/* {locInfo && (
                      <span className="ml-2 text-[10px] opacity-70">
                        {locInfo === "cooldown"
                          ? "rate-limited (cache)"
                          : locInfo === "fallback"
                          ? "via fallback"
                          : locInfo === "cache"
                          ? "cache"
                          : "live"}
                      </span>
                    )} */}
                    <span className="ml-2 text-xs opacity-75">
                      Click to refresh
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </>
      ) : (
        <>
          <div className="poppins min-h-screen bg-background md:mt-20 lg:mt-0 md:max-w-7xl sm:p-0 md:mx-auto md:px-4 lg:px-8 pt-16 pb-20 lg:pt-20 lg:pb-32">
            {/* Hero Section */}
            <div className="relative h-96 bg-card border-b overflow-hidden rounded-lg">
              <div className="absolute inset-0 skeleton-shimmer" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/70" />

              <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
                <div className="h-10 w-3/4 rounded-lg bg-muted mb-4 skeleton-shimmer" />
                <div className="h-6 w-2/3 rounded-lg bg-muted mb-6 skeleton-shimmer" />

                <div className="flex flex-wrap gap-6 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-muted skeleton-shimmer" />
                      <div className="h-4 w-20 rounded bg-muted skeleton-shimmer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-10">
                  {/* About Section */}
                  <section>
                    <div className="h-7 w-1/3 rounded bg-muted mb-4 skeleton-shimmer" />
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-4 w-full bg-muted rounded skeleton-shimmer"
                        />
                      ))}
                    </div>
                  </section>

                  {/* What You'll Learn */}
                  <section>
                    <div className="h-7 w-1/3 rounded bg-muted mb-4 skeleton-shimmer" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 bg-card p-4 rounded-lg border"
                        >
                          <div className="h-5 w-5 rounded-full bg-muted mt-1 skeleton-shimmer" />
                          <div className="h-4 w-3/4 bg-muted rounded skeleton-shimmer" />
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Curriculum */}
                  <section>
                    <div className="h-7 w-1/3 rounded bg-muted mb-4 skeleton-shimmer" />
                    <div className="space-y-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-4 bg-card p-4 rounded-lg border"
                        >
                          <div className="h-4 w-8 bg-muted rounded skeleton-shimmer" />
                          <div className="h-4 w-3/4 bg-muted rounded skeleton-shimmer" />
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Instructor */}
                  <section>
                    <div className="h-7 w-1/3 rounded bg-muted mb-4 skeleton-shimmer" />
                    <div className="bg-card p-6 rounded-lg border space-y-3">
                      <div className="h-5 w-1/3 bg-muted rounded skeleton-shimmer" />
                      <div className="h-4 w-2/3 bg-muted rounded skeleton-shimmer" />
                    </div>
                  </section>
                </div>

                {/* Right Column - Purchase Card */}
                <div className="lg:col-span-1">
                  <div className="sticky top-4 bg-card border rounded-2xl p-6 shadow-xl space-y-4">
                    <div className="aspect-video w-full bg-muted rounded-lg mb-4 skeleton-shimmer" />
                    <div className="h-8 w-1/3 bg-muted rounded mb-6 skeleton-shimmer" />

                    <div className="space-y-3">
                      <div className="h-12 w-full bg-muted rounded skeleton-shimmer" />
                      <div className="h-12 w-full bg-muted rounded skeleton-shimmer" />
                    </div>

                    <div className="mt-6 pt-6 border-t space-y-3">
                      <div className="h-4 w-1/2 bg-muted rounded skeleton-shimmer" />
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="h-4 w-4 bg-muted rounded-full skeleton-shimmer" />
                          <div className="h-3 w-1/2 bg-muted rounded skeleton-shimmer" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </>
      )}

      {/* skalaton loader end */}
      {/*  */}
    </div>
  );
};

export default Details;
