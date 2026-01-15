import { Link } from "react-router"; // or "react-router-dom" depending on your version
import Card from "../Card/Card";
import { useQuery } from "@tanstack/react-query";
import { Crown} from "lucide-react";
import useAxiosPublic from "@/url/useAxiosPublic";

interface Course {
  _id: string;
  id: number;
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
}

const AllProduct = () => {
  const axiosPub = useAxiosPublic();
  
  const { data, isLoading } = useQuery({
    queryKey: ["all-courses"],
    queryFn: async () => {
      const res = await axiosPub.get("/courses");
      return res.data;
    },
  });

  return (
    <section className="relative min-h-screen bg-slate-50 selection:bg-amber-100 selection:text-amber-900 overflow-hidden">
      
      {/* --- Custom CSS for Loading Shimmer --- */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* --- Premium Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Right Warmth */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-amber-100/60 to-transparent rounded-full blur-[100px]" />
        {/* Bottom Left Coolness */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-slate-200/50 to-transparent rounded-full blur-[100px]" />
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        
        {/* --- Header Section --- */}
        <div className="mb-16 md:ml-4 lg:ml-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-200 bg-white shadow-sm mb-6 transition-transform hover:scale-105 cursor-default">
            <Crown className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-amber-700 text-xs font-bold tracking-[0.2em] uppercase">
              The Collection
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Explore Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700">
              Elite Curriculum
            </span>
          </h2>

          {/* Decorative Divider */}
          <div className="h-1.5 w-24 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></div>
        </div>

        {/* --- Grid Layout --- */}
        {/* Changed from flex to grid for perfect alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {!isLoading && data ? (
            data.map((x: Course) => (
              <Link 
                key={x._id} 
                to={`/d/${x._id}`}
                className="group block h-full"
              >
                {/* Note: Depending on how your <Card> component is styled, 
                   you might want to pass className="h-full" to it.
                   The wrapper here adds a lift effect to the whole card.
                */}
                <div className="h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/50 rounded-2xl">
                   <Card course={x} />
                </div>
              </Link>
            ))
          ) : (
            /* Premium Skeleton Loading */
            [...Array(6)].map((_, i) => <CourseSkeleton key={i} />)
          )}
        </div>
      </div>
    </section>
  );
};

// --- Helper Skeleton Component for Cleaner Code ---
const CourseSkeleton = () => {
  return (
    <div className="relative bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm h-[420px] w-full">
      {/* Image Placeholder */}
      <div className="h-56 w-full bg-slate-100 relative overflow-hidden">
        <div className="animate-shimmer"></div>
        <div className="absolute top-4 left-4 h-6 w-20 bg-white/50 rounded-md"></div>
      </div>
      
      {/* Content Placeholder */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between">
            <div className="h-4 w-24 bg-slate-100 rounded relative overflow-hidden"><div className="animate-shimmer"></div></div>
            <div className="h-4 w-12 bg-slate-100 rounded relative overflow-hidden"><div className="animate-shimmer"></div></div>
        </div>
        <div className="h-8 w-3/4 bg-slate-100 rounded relative overflow-hidden"><div className="animate-shimmer"></div></div>
        <div className="h-4 w-full bg-slate-100 rounded relative overflow-hidden"><div className="animate-shimmer"></div></div>
        
        <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
            <div className="h-8 w-20 bg-slate-100 rounded relative overflow-hidden"><div className="animate-shimmer"></div></div>
            <div className="h-10 w-28 bg-slate-100 rounded-full relative overflow-hidden"><div className="animate-shimmer"></div></div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;