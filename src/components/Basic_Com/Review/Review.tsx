"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Review {
  id: number;
  name: string;
  image: string;
  text: string;
  address: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi9V0Mo9DXIVaXe2FcHiUjoUAu3Ob7kJcaew&s",
    text: "Good value for money.ssed with the attention tossed with the attention tossed with the attention tossed with the attention to The features are exactly what I needed.",
    address: "New York, USA",
  },
  {
    id: 2,
    name: "Michael Chen",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi9V0Mo9DXIVaXe2FcHiUjoUAu3Ob7kJcaew&s",
    text: "Good value for money.ssed with the attention tossed with the attention tossed with the attention tossed with the attention to The features are exactly what I needed.",
    address: "New York, USA",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToYSmfIWKdhIy_kzBYSSXfwyOkh7zh9Gigvw&s",
    text: "Good value for money.ssed with the attention tossed with the attention tossed with the attention tossed with the attention to The features are exactly what I needed.",
    address: "New York, USA",
  },
  {
    id: 4,
    name: "David Thompson",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScRpzrYhY7WsOTyT-E_UXrV7EapQeFsGHbOw&s",
    text: "Good value for money.ssed with the attention tossed with the attention tossed with the attention tossed with the attention to The features are exactly what I needed.",
    address: "New York, USA",
  },
  {
    id: 5,
    name: "Jessica Lee",
    image:
      "https://media.tycsports.com/files/2023/04/05/552819/messi-selfie-fanatica_w862.webp",
    text: "Good value for money.ssed with the attention tossed with the attention tossed with the attention tossed with the attention to The features are exactly what I needed.",
    address: "New York, USA",
  },
];

export function Review() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
    setIsAutoPlay(false);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    setIsAutoPlay(false);
  };

  return (
    <>
      <div className="bg-[#D22F2F] py-10">
        <div className="flex justify-center items-center text-white">
          <div className="mb-10 md:ml-4 lg:ml-20 text-center">
            <h2 className="text-sm font-bold uppercase mb-4 poppins">
              Online Learning
            </h2>
            <h2 className="text-2xl font-bold uppercase mb-4 poppins">
              Popular Courses
            </h2>
            <hr className="w-[222px] h-[4px] bg-gray-500 " />
          </div>
        </div>

        <div className="w-full max-w-2xl mx-auto px-4">
          <div className="relative">
            {/* Carousel Container - Fixed overflow */}
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${current * 100}%)`,
                }}
              >
                {reviews.map((review) => (
                  <div key={review.id} className="w-full flex-shrink-0 poppins">
                    <Card className="border border-slate-200 dark:border-slate-700 shadow-lg bg-white dark:bg-slate-900 hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col items-center text-center gap-4">
                          {/* Avatar - Compact premium styling */}
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-full blur-md opacity-40"></div>
                            <img
                              src={review.image || "/placeholder.svg"}
                              alt={review.name}
                              className="relative w-16 h-16 rounded-full object-cover border border-slate-300 dark:border-slate-600 shadow-md"
                            />
                          </div>

                          {/* Review Text - Compact and elegant */}
                          <div className="space-y-3 max-w-xl">
                            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                              "{review.text}"
                            </p>
                          </div>

                          {/* Minimal divider */}
                          <div className="w-8 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600"></div>

                          {/* Name - Premium minimal */}
                          <div>
                            <h3 className="text-sm md:text-base font-medium text-slate-900 dark:text-slate-50 tracking-wide">
                              {review.name}
                            </h3>
                            <h3 className="text-sm md:text-base  text-slate-900 dark:text-slate-50 ">
                              {review.address}
                            </h3>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 h-8 w-8"
              aria-label="Previous review"
            >
              <ChevronLeft size={18} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 h-8 w-8"
              aria-label="Next review"
            >
              <ChevronRight size={18} />
            </Button>

            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full transition-all duration-500 ${
                    index === current
                      ? "bg-slate-900 dark:bg-slate-100 w-6 h-1.5"
                      : "bg-slate-300 dark:bg-slate-600 w-1.5 h-1.5 hover:bg-slate-400 dark:hover:bg-slate-500"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium"
              >
                {isAutoPlay ? "⏸" : "▶"} {isAutoPlay ? "Pause" : "Play"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
