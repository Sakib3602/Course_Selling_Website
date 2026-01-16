import React, { useContext, useState } from "react";
import {
  Crown,
  Calendar,
  Clock,
  AlignLeft,
  Type,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import useAxiosPublic from "@/url/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "@/components/Authentication_Work/AuthProvider/AuthProvider";
import { Slide, toast, ToastContainer } from "react-toastify";

interface MeetingData {
  topic: string;
  date: string;
  time: string;
  agenda: string;
}

const PremiumDas: React.FC = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext is not available");
  }
  const { person } = auth;

  const axiosPub = useAxiosPublic();
  const { data } = useQuery({
    queryKey: ["premium"],
    queryFn: async () => {
      const response = await axiosPub.get(`/premium/${person?.email}`);
      return response.data;
    },
  });

  const [formData, setFormData] = useState<MeetingData>({
    topic: "",
    date: "",
    time: "",
    agenda: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (data?.Premium !== true) {
      toast.error("You need to be a premium member to request a meeting.", {
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
    }
    e.preventDefault();
    console.log("Premium Meeting Requested:", formData);
  };
console.log(data);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 font-sans">
      {/* 1. Membership Banner (Compact & Responsive) */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mb-6">
        {
            data?.Premium === false || !("Premium" in data) && <div className="bg-gradient-to-r from-amber-50 to-white border border-amber-200 rounded-xl p-4 sm:p-5 shadow-sm relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between relative z-10">
            {/* Text Content */}
            <div className="flex-1">
              <h3 className="text-amber-900 font-bold text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
                Unlock Gold Access
              </h3>
              <p className="text-xs text-amber-800/70 mt-1 mb-2">
                Upgrade now to book exclusive 1v1 sessions.
              </p>

              {/* Advantages List - Compact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs font-medium text-amber-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />{" "}
                  Priority Booking
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" /> 60-Min
                  Extended Time
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />{" "}
                  Session Recording
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" /> 24/7
                  Direct Support
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="group whitespace-nowrap bg-amber-900 hover:bg-amber-800 text-amber-50 text-sm font-semibold py-2.5 px-5 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
              Get Membership
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        }
      </div>

      {/* 2. Main Form Card */}
      <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl group">
        {/* Animated Gold Gradient Border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 rounded-2xl opacity-50 blur-sm transition duration-1000 group-hover:opacity-75 group-hover:duration-200"></div>

        <div className="relative bg-white rounded-xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 mb-3 sm:mb-4 border border-amber-300 shadow-sm">
              <Crown
                className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600"
                strokeWidth={2.5}
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Premium 1v1 Session
            </h2>
            <p className="text-amber-600/80 text-xs sm:text-sm mt-2 tracking-wide font-semibold uppercase">
              Exclusive Gold Member Access
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Topic Input */}
            <div className="group/input">
              <label className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-1.5 ml-1">
                Meeting Topic
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Type className="h-5 w-5 text-gray-400 group-focus-within/input:text-amber-500 transition-colors" />
                </div>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="e.g. Strategic Planning Review"
                  className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm sm:text-base focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder-gray-400 hover:bg-gray-50/80"
                  required
                />
              </div>
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group/input">
                <label className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-1.5 ml-1">
                  Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400 group-focus-within/input:text-amber-500 transition-colors" />
                  </div>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm sm:text-base focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all appearance-none"
                    required
                  />
                </div>
              </div>

              <div className="group/input">
                <label className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-1.5 ml-1">
                  Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400 group-focus-within/input:text-amber-500 transition-colors" />
                  </div>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm sm:text-base focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all appearance-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Agenda/Description */}
            <div className="group/input">
              <label className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-1.5 ml-1">
                Meeting Agenda
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <AlignLeft className="h-5 w-5 text-gray-400 group-focus-within/input:text-amber-500 transition-colors" />
                </div>
                <textarea
                  name="agenda"
                  rows={4}
                  value={formData.agenda}
                  onChange={handleChange}
                  placeholder="Briefly describe what you'd like to discuss..."
                  className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm sm:text-base focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder-gray-400 resize-none hover:bg-gray-50/80"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full relative overflow-hidden group bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 text-white font-bold text-base sm:text-lg py-3 sm:py-3.5 rounded-lg shadow-lg shadow-amber-500/30 transform active:scale-95 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-shadow-sm">
                Book Consultation <Crown className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/20"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PremiumDas;
