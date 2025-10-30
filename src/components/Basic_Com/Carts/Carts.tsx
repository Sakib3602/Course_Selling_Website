"use client";

import { useState } from "react";
import { ShoppingCart, Trash2, Star, Check } from "lucide-react";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Footer";

interface CartItem {
  id: number;
  title: string;
  instructor: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  students: number;
}

export default function Carts() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "Advanced React Patterns",
      instructor: "Sarah Chen",
      price: 99.99,
      originalPrice: 149.99,
      image: "/react-course.jpg",
      rating: 4.8,
      students: 12500,
    },
    {
      id: 2,
      title: "Next.js Mastery Course",
      instructor: "John Smith",
      price: 129.99,
      originalPrice: 199.99,
      image: "/nextjs-course.jpg",
      rating: 4.9,
      students: 8300,
    },
    {
      id: 3,
      title: "TypeScript for Professionals",
      instructor: "Emma Wilson",
      price: 79.99,
      originalPrice: 129.99,
      image: "/typescript-course.jpg",
      rating: 4.7,
      students: 6200,
    },
  ]);

  const removeItem = (id: number) => {
    alert("Remove functionality is not implemented in this demo.");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const discount = (item: CartItem) =>
    Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

  return (
    <div>
      <Nav></Nav>
      <div className="min-h-screen bg-white">
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
                {cartItems.length} courses
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <ShoppingCart className="w-12 sm:w-16 h-12 sm:h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-2">
                Your cart is empty
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Start learning by adding courses to your cart
              </p>
              <button className="bg-black text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition text-sm sm:text-base">
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-3 sm:space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition"
                    >
                      {/* Course Image */}
                      <div className="relative w-full sm:w-24 sm:h-24 h-40 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {discount(item) > 0 && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            -{discount(item)}%
                          </div>
                        )}
                      </div>

                      {/* Course Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-black line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">
                            by {item.instructor}
                          </p>

                          {/* Rating and Students */}
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 sm:w-4 h-3 sm:h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium text-black">
                                {item.rating}
                              </span>
                            </div>
                            <span className="whitespace-nowrap">
                              ({item.students.toLocaleString()} students)
                            </span>
                          </div>
                        </div>

                        {/* Price and Remove Button */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg sm:text-xl font-bold text-black">
                              ${item.price.toFixed(2)}
                            </span>
                            
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition flex-shrink-0"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 sm:w-5 h-4 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <button className="text-black font-medium hover:text-gray-600 transition text-sm sm:text-base">
                    ← Continue Shopping
                  </button>
                </div>
              </div>

              {/* Pricing Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-20 sm:top-24 bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                    Order Summary
                  </h2>

                  {/* Price Breakdown */}
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">
                        Subtotal ({cartItems.length} courses)
                      </span>
                      <span className="font-medium text-black">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Tax (10%)</span>
                      <span className="font-medium text-black">
                        ${tax.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <span className="text-base sm:text-lg font-semibold text-black">
                      Total
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-black">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <button className="w-full bg-black text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-800 transition mb-2 sm:mb-3 text-sm sm:text-base">
                    Proceed to Checkout
                  </button>

                  {/* Continue Shopping */}
                  <button className="w-full border border-gray-300 text-black py-2.5 sm:py-3 rounded-lg font-medium hover:bg-gray-50 transition text-sm sm:text-base">
                    Continue Shopping
                  </button>

                  {/* Benefits */}
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Check className="w-4 sm:w-5 h-4 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-700">
                        Lifetime access to all courses
                      </span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Check className="w-4 sm:w-5 h-4 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-700">
                        30-day money-back guarantee
                      </span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Check className="w-4 sm:w-5 h-4 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-700">
                        Certificate of completion
                      </span>
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
