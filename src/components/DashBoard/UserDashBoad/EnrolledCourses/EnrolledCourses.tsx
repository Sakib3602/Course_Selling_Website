import { AuthContext } from "@/components/Authentication_Work/AuthProvider/AuthProvider";
import useAxiosPublic from "@/url/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronRight,
  BookOpen,
  X,
  CheckCircle2,
  Telescope,
  PlayCircle,
} from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router";

interface OrderDataType {
  drive: string;
  id: string;
  orderDate: string;
  name: string;
  img: string;
}

const EnrolledCourses = () => {
  const axiosPub = useAxiosPublic();
  const auth = useContext(AuthContext);

  // State for the Modal
  const [selectedCourse, setSelectedCourse] = useState<OrderDataType | null>(
    null
  );

  if (!auth) {
    throw new Error("AuthContext is undefined");
  }

  const { person } = auth;

  const { data, isLoading } = useQuery({
    queryKey: ["enrolledCourses", person?.email],
    queryFn: async () => {
      if (!person?.email) return [];
      const res = await axiosPub.get(`/enrolled/${person?.email}`);
      return res.data;
    },
    enabled: !!person?.email,
  });

  console.log(data)

  // --- Handlers ---
  const openModal = (course: OrderDataType) => {
    console.log(course);
    setSelectedCourse(course);
    // Optional: Prevent background scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedCourse(null);
    document.body.style.overflow = "auto";
  };

  // --- Loading Skeleton ---
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 max-w-[1400px] mx-auto">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm h-[380px] animate-pulse"
          >
            <div className="h-48 bg-slate-200 w-full rounded-t-2xl" />
            <div className="p-5 space-y-3">
              <div className="h-6 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="mt-6 h-10 bg-slate-200 rounded-lg w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
      {/* Header Section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            My Learning
          </h2>
          <p className="text-slate-500 mt-1 text-sm md:text-base">
            You have enrolled in {data?.length || 0} courses
          </p>
        </div>
      </div>

      {!data || data.length === 0 ? (
        // --- Empty State ---
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-center mx-auto max-w-2xl">
          <div className="bg-white p-4 rounded-full shadow-sm mb-4">
            <BookOpen className="w-10 h-10 text-indigo-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            No courses enrolled yet
          </h3>
          <p className="text-slate-500 max-w-xs md:max-w-md mt-2 mb-6">
            Start your journey today. Browse our catalog to find the perfect
            course for you.
          </p>
          <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition shadow-lg shadow-slate-200">
            Browse Courses
          </button>
        </div>
      ) : (
        // --- Course Grid (Responsive) ---
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((course: OrderDataType, index: number) => (
            <div
              key={index}
              className="group flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48 w-full bg-slate-100">
                <img
                  src={course.img}
                  alt={course.name}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Status Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-emerald-600 shadow-sm flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Enrolled
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
                  <Telescope className="w-3.5 h-3.5" />
                  <span>Continue Learning Now</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 line-clamp-2">
                  {course?.name}
                </h3>

                <div className="mt-auto pt-4 border-t border-slate-50">
                  <button
                    onClick={() => openModal(course)}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 group/btn"
                  >
                    <span>Continue Learning</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- MODAL POPUP --- */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full text-slate-500 hover:text-red-500 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="h-48 w-full relative">
              <img
                src={selectedCourse.img}
                alt={selectedCourse.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider bg-indigo-600 px-2 py-1 rounded mb-2 inline-block">
                    Now Playing
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {selectedCourse.name}
              </h3>

              <div className=" text-sm text-gray-600 mb-6">
                {selectedCourse?.downloadLink ? (
                  <span>
                    Your Learning Meterial Is Live Continue Learning.
                  </span>
                ) : (
                  <span className="text-red-600">No Drive Link Available. Wait for it!</span>
                )}
              </div>
              <div className="space-y-3 ">
                {
                  selectedCourse?.downloadLink ? <Link to={selectedCourse?.downloadLink}><button className="mb-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-200">
                  <PlayCircle className="w-5 h-5" />
                  Start Watching Now
                </button> </Link> : <button className="mb-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-200">
                  <PlayCircle className="w-5 h-5" />
                  Start Watching Now
                </button>
                }

                <Link to={`/d/${selectedCourse.id}`}>
                  <button
                    onClick={closeModal}
                    className="w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3.5 rounded-xl border border-slate-200 transition-colors"
                  >
                    View Course Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
