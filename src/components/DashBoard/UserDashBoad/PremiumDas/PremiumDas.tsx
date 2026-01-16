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
  MessageSquare,
  Clock3
} from "lucide-react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthContext } from "@/components/Authentication_Work/AuthProvider/AuthProvider";
import { Slide, toast, ToastContainer } from "react-toastify";
import useAxiosPrivate from "@/url/useAxiosPrivate";
import moment from "moment";


interface MeetingData {
  topic: string;
  date: string;
  time: string;
  agenda: string;
  link : string;
  email : string | null | undefined;
  meetingReqTime : string;
  ReplyTime : string | null;
}
interface MeetingD {
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

  const axiosPrivate = useAxiosPrivate();
  const { data } = useQuery({
    queryKey: ["premium-opopo"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/premium/${person?.email}`);
      return response.data;
    },
  });

  const { data: meetings, refetch} = useQuery({
    queryKey: ["meetings", person?.email],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/setMeeting/${person?.email}`);
      return response.data;
    },
  });

  const [formData, setFormData] = useState<MeetingD>({
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
      return;
    }
    e.preventDefault();
    
    const met = { ...formData, link: "", email : person?.email, meetingReqTime : moment().format('MMMM Do YYYY, h:mm:ss a'), ReplyTime : null };
    
    Mutationfh.mutate(met);
  };

  const Mutationfh = useMutation({
    mutationFn: async (d : MeetingData) => {
        const res = await axiosPrivate.post("/setMeeting", d)
        return res.data;
    },
    onSuccess: ()=>{
        refetch()
        toast.success("Premium meeting requested successfully!", {
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
  })


  const memberUpdate = ()=>{
    mutationUp.mutate();
  }


  const mutationUp = useMutation({
    mutationFn: async () => {
      const response = await axiosPrivate.patch(`/premium/${person?.email}`);
      return response.data;
    },
    onSuccess: () => {
        refetch()
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
 

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-10 lg:px-8 lg:py-12 font-sans">
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
      <div className="w-full max-w-full sm:max-w-md md:max-w-2xl lg:max-w-5xl mx-auto mb-6 sm:mb-8">
        {
            (data?.Premium === false || (data && !("Premium" in data))) && <div className="bg-gradient-to-r from-amber-50 to-white border border-amber-200 rounded-xl p-4 sm:p-5 shadow-sm relative overflow-hidden">
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
            <button onClick={()=> memberUpdate()} className="group whitespace-nowrap bg-amber-900 hover:bg-amber-800 text-amber-50 text-sm font-semibold py-2.5 px-5 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
              Get Membership
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        }
      </div>

      {/* 2. Main Form Card and 3. Replies Section - Side by Side */}
      <div className="w-full max-w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 md:mt-10">
        
        {/* 2. Main Form Card */}
        <div className="relative group w-full">
          {/* Animated Gold Gradient Border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 rounded-2xl opacity-50 blur-sm transition duration-1000 group-hover:opacity-75 group-hover:duration-200"></div>

          <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8">
            {/* Header Section */}
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <div className="inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 mb-2 sm:mb-3 md:mb-4 border border-amber-300 shadow-sm">
                <Crown
                  className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-600"
                  strokeWidth={2.5}
                />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Premium Session
              </h2>
              <p className="text-amber-600/80 text-[10px] sm:text-xs md:text-sm mt-1 sm:mt-2 tracking-wide font-semibold uppercase">
                Exclusive Access
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
              {/* Topic Input */}
              <div className="group/input">
                <label className="block text-gray-500 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-1.5 ml-1">
                  Meeting Topic
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                    <Type className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within/input:text-amber-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="e.g. Planning Review"
                  className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder-gray-400 hover:bg-gray-50/80"
                  required
                />
              </div>
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="group/input">
                <label className="block text-gray-500 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-1.5 ml-1">
                  Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within/input:text-amber-500 transition-colors" />
                  </div>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all appearance-none"
                    required
                  />
                </div>
              </div>

              <div className="group/input">
                <label className="block text-gray-500 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-1.5 ml-1">
                  Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within/input:text-amber-500 transition-colors" />
                  </div>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all appearance-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Agenda/Description */}
            <div className="group/input">
              <label className="block text-gray-500 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-1.5 ml-1">
                Meeting Agenda
              </label>
              <div className="relative">
                <div className="absolute top-3 left-2.5 sm:left-3 pointer-events-none">
                  <AlignLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within/input:text-amber-500 transition-colors" />
                </div>
                <textarea
                  name="agenda"
                  rows={3}
                  value={formData.agenda}
                  onChange={handleChange}
                  placeholder="Describe your meeting..."
                  className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder-gray-400 resize-none hover:bg-gray-50/80"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full relative overflow-hidden group bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 text-white font-bold text-sm sm:text-base md:text-lg py-2.5 sm:py-3 md:py-3.5 rounded-lg shadow-lg shadow-amber-500/30 transform active:scale-95 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-shadow-sm">
                Book <span className="hidden sm:inline">Consultation</span> <Crown className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/20"></div>
            </button>
          </form>
        </div>
        </div>

        {/* 3. Replies Section */}
       <div className="relative w-full group">
  
  {/* 1. Outer Gold Glow (Subtle Luxury Effect) */}
  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 rounded-xl sm:rounded-2xl opacity-40 blur-sm transition duration-1000 group-hover:opacity-60"></div>

  <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl border border-amber-100 p-4 sm:p-6 md:p-8">
    
    {/* Header */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6 border-b border-gray-100 pb-4">
      <div className="bg-gradient-to-br from-amber-100 to-yellow-50 rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-sm border border-amber-200">
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
      </div>
      <div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 tracking-tight">VIP Log</h3>
        <p className="text-[10px] sm:text-xs text-amber-600/80 font-semibold uppercase tracking-wider mt-0.5">
          History & Replies
        </p>
      </div>
    </div>

    {/* Replies List or Empty State */}
    {!meetings || meetings.length === 0 ? (
      <div className="text-center py-8 sm:py-12 bg-gray-50/50 rounded-lg sm:rounded-xl border border-dashed border-gray-200">
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-50 mb-3 sm:mb-4">
          <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" />
        </div>
        <p className="text-gray-900 font-semibold text-base sm:text-lg">No sessions yet</p>
        <p className="text-gray-500 text-xs sm:text-sm mt-2 max-w-xs mx-auto px-2">
          Your meeting requests will appear here.
        </p>
      </div>
    ) : (
      <div className="space-y-3 sm:space-y-4 md:space-y-5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {meetings.map((meeting: any, index: number) => (
          <div
            key={index}
            className="group/card border border-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 bg-white hover:bg-amber-50/30 hover:border-amber-200 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            {/* Meeting Topic & Status */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg group-hover/card:text-amber-700 transition-colors line-clamp-2">
                  {meeting.topic}
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  Requested: {meeting.meetingReqTime}
                </p>
              </div>

              {/* Premium Status Badge */}
              <div className={`self-start px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border shadow-sm flex items-center gap-1 whitespace-nowrap ${
                meeting.ReplyTime
                  ? "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200"
                  : "bg-gray-100 text-gray-600 border-gray-200"
              }`}>
                {meeting.ReplyTime ? (
                  <><CheckCircle2 className="w-3 h-3" /> Replied</>
                ) : (
                  <><Clock3 className="w-3 h-3" /> Pending</>
                )}
              </div>
            </div>

            {/* Meeting Details (Date/Time) */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm border-y border-gray-50 py-2 sm:py-3">
              <div className="flex items-center gap-1.5 text-gray-600">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 flex-shrink-0" />
                <span className="font-medium">{meeting.date}</span>
              </div>
              <div className="hidden sm:block w-px h-auto bg-gray-200"></div>
              <div className="flex items-center gap-1.5 text-gray-600">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 flex-shrink-0" />
                <span className="font-medium">{meeting.time}</span>
              </div>
            </div>

            {/* Agenda */}
            <div className="bg-gray-50 rounded p-2.5 sm:p-3 md:p-4 mb-3 border border-gray-100">
              <p className="text-[10px] sm:text-xs text-amber-600 font-bold uppercase tracking-wider mb-1 sm:mb-2">Agenda</p>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed line-clamp-2">{meeting.agenda}</p>
            </div>

            {/* Reply Section - "Gold Letter" Style */}
            {meeting.ReplyTime && (
              <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50/50 border border-amber-200 rounded p-2.5 sm:p-3 md:p-4 mt-2 sm:mt-3">
                {/* Decorative shimmer */}
                <div className="absolute top-0 right-0 -mt-2 -mr-2 w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400/10 rounded-full blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="bg-white p-1 rounded-full border border-amber-100 shadow-sm">
                      <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                    </div>
                    <p className="text-[10px] sm:text-xs font-bold text-amber-900 uppercase tracking-wide">
                      Response
                    </p>
                  </div>
                  
                  <div className="text-xs sm:text-sm text-gray-800 font-medium pl-2 border-l-2 border-amber-300/50 ml-1 py-1">
                      {meeting.link || "Check your email for the meeting link."}
                  </div>

                  <div className="flex justify-end mt-2">
                    <p className="text-[9px] sm:text-[10px] text-amber-700/60 font-medium bg-amber-100/50 px-2 py-0.5 sm:py-1 rounded">
                      {meeting.ReplyTime}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
</div>
      </div>
    </div>
  );
};

export default PremiumDas;
