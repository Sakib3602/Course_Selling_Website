import { AuthContext } from "@/components/Authentication_Work/AuthProvider/AuthProvider";
import { Button } from "@/components/ui/button";
import useAxiosPublic from "@/url/useAxiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Crown,
  ArrowRight,
  Zap,
  ShieldCheck,
  Download,
  Users,
} from "lucide-react";
import { useContext } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";

const benefits = [
  {
    icon: Zap,
    title: "Unlimited Course Access",
    description:
      "Unlock our entire library of 500+ expert-led courses, including all future releases and workshops.",
  },
  {
    icon: ShieldCheck,
    title: "Industry Certification",
    description:
      "Earn verified gold-tier certificates upon completion to showcase your skills on LinkedIn and resumes.",
  },
  {
    icon: Download,
    title: "Offline Learning",
    description:
      "Download video lessons and resources to your mobile device and learn anywhere, anytime, without internet.",
  },
  {
    icon: Users,
    title: "Priority & Mentorship",
    description:
      "Get 24/7 priority support and exclusive access to monthly live Q&A sessions with industry mentors.",
  },
];

const Premium = () => {
  const axiosPub = useAxiosPublic();
  const { data } = useQuery({
    queryKey: ["premium"],
    queryFn: async () => {
      const response = await axiosPub.get(`/premium/${person?.email}`);
      return response.data;
    },
  });
  console.log(data.role);

  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext is not available");
  }
  const { person } = auth;
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
    if (data?.Premium === true) {
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
    mutationUp.mutate();
  };

  const mutationUp = useMutation({
    mutationFn: async () => {
      const response = await axiosPub.patch(`/premium/${person?.email}`);
      return response.data;
    },
    onSuccess: () => {
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
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24">
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
      {/* --- Premium Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grainy Texture for cinematic feel */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-soft-light"></div>

        {/* Subtle Gold Ambient Light */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-600/10 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-yellow-800/10 rounded-full blur-[120px] opacity-30" />

        {/* Architectural Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* --- Header Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          {/* Crown Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 mb-8 backdrop-blur-md animate-pulse-slow">
            <Crown className="w-5 h-5 text-amber-400 fill-amber-400/20" />
            <span className="text-amber-400 text-sm font-bold tracking-[0.25em] uppercase">
              Exclusive Offer
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
            Unlock Your Full Potential with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]">
              Premium Membership.
            </span>
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-10 font-light">
            Stop limiting your growth. Join the elite tier of learners and get
            the tools, recognition, and support you need to accelerate your
            career faster than ever before.
          </p>

          {/* Main CTA Button */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => buyPre()}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black text-lg font-bold px-10 py-7 rounded-sm hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.6)] hover:scale-105 transition-all duration-300"
            >
              Upgrade to Premium - $29 one time payment
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            <p className="text-slate-400 text-sm mt-3 sm:mt-0 sm:self-center">
              Cancel anytime. 30-day money-back guarantee.
            </p>
          </div>
        </div>

        {/* --- Benefits Grid --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((item, index) => (
            // Glassmorphic Dark Card
            <div
              key={index}
              className="group relative bg-[#1a1a1a]/60 backdrop-blur-md border border-white/5 p-8 rounded-2xl overflow-hidden transition-all duration-500 hover:border-amber-500/50 hover:bg-[#1a1a1a]/80"
            >
              {/* Hover Gradient Blob */}
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 blur-2xl"></div>

              <div className="relative z-10">
                {/* Icon Container */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-700 flex items-center justify-center mb-6 shadow-lg shadow-amber-900/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Premium;
