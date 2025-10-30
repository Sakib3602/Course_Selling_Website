import { Button } from "@/components/ui/button";
import CountUp from "@/components/ui/CountUp";
import { Play, Star, Users, Award } from "lucide-react";
// import { CountUp } from "@components/ui/Countup";
export default function Hero() {
  return (
    <section className="relative  overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute right-0 top-0 h-full w-auto hidden lg:block"
          viewBox="0 0 600 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMaxYMid slice"
        >
          <path
            d="M600,0 C300,200 200,400 200,600 C200,800 300,900 200,1000 L600,1000 L600,0 Z"
            fill="#41246D"
            opacity="0.3"
          />
          <path
            d="M600,0 C350,180 250,380 250,580 C250,780 350,880 250,980 L600,980 L600,0 Z"
            fill="#41246D"
            opacity="0.4"
          />
          <path
            d="M600,0 C400,150 300,350 300,550 C300,750 400,850 300,950 L600,950 L600,0 Z"
            fill="#41246D"
            opacity="0.6"
          />
        </svg>

        <svg
          className="absolute bottom-0 left-0 w-full h-auto lg:hidden"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 C360,100 480,250 720,225 C960,200 1080,100 1440,150 L1440,600 L0,600 Z"
            fill="#41246D"
            opacity="0.12"
          />
          <path
            d="M0,240 C400,140 520,290 720,265 C920,240 1040,140 1440,190 L1440,600 L0,600 Z"
            fill="#41246D"
            opacity="0.18"
          />
          <path
            d="M0,280 C440,180 560,330 720,305 C880,280 1000,180 1440,230 L1440,600 L0,600 Z"
            fill="#41246D"
            opacity="0.25"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#41246D]/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-[#41246D]/20">
              <Star className="w-4 h-4 text-[#41246D] fill-[#41246D]" />
              <span className="text-[#41246D] text-sm font-medium">
                Trusted by 50,000+ students
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight text-balance">
              Master New Skills with Expert-Led Courses
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed text-pretty max-w-2xl mx-auto lg:mx-0">
              Transform your career with premium online courses taught by
              industry professionals. Learn at your own pace, anytime, anywhere.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-[#41246D] text-white hover:bg-[#5a3a8f] transition-all duration-200 text-lg px-8 py-6 font-semibold"
              >
                Start Learning Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#41246D] text-[#41246D] hover:bg-[#41246D] hover:text-white transition-all duration-200 text-lg px-8 py-6 font-semibold bg-transparent"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200">
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-[#41246D] mb-1">
                  <CountUp
                    from={0}
                    to={100}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />{" "}
                  +
                </div>
                <div className="text-sm text-gray-600">Expert Courses</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-[#41246D] mb-1">
                  <CountUp
                    from={0}
                    to={22}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                  k +
                </div>
                <div className="text-sm text-gray-600">Active Students</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-[#41246D] mb-1">
                  <CountUp
                    from={0}
                    to={4}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                  .
                  <CountUp
                    from={0}
                    to={9}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                </div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative z-10">
            <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-gray-200 shadow-xl">
              {/* Course Preview Card */}
              <div className="bg-white rounded-2xl p-6 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-[#41246D] to-[#5a3a8f] rounded-xl mb-4 flex items-center justify-center">
                  <Play className="w-16 h-16 text-white" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">(4.9)</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Complete Web Development Bootcamp
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>12,450 students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span>Certificate</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#41246D]">
                        $49.99
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        $199.99
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-xl border border-gray-100">
                <Award className="w-8 h-8 text-[#41246D]" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-xl border border-gray-100">
                <Users className="w-8 h-8 text-[#41246D]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
