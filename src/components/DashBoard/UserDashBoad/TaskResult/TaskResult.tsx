import useAxiosPublic from "@/url/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import {
  FileCheck,
  Calendar,
  Hash,
  Trophy,
  CheckCircle2,
} from "lucide-react";

// // 1. Define the Interface
interface GradedTask {
  taskId: string;
  taskTitle: string;
  submittedAt: string;
  mark: string | number | null;
}

const TaskResult = () => {
  const axiosPub = useAxiosPublic();
  // 2. The specific data you requested
 
  const { data, isLoading } = useQuery({
    queryKey: ["gradedTasks"],
    queryFn: async () => {
      const res = await axiosPub.get("/replyAllTask");
      return res.data;
    },
  });
  const skeletonRows = Array(4).fill(null);

  if(isLoading){
    return <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header Skeleton */}
        <div className="mb-6 flex items-center gap-3 animate-pulse">
          {/* Icon Box */}
          <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0"></div>
          
          {/* Title & Subtitle */}
          <div className="space-y-2">
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Content Container */}
        <div className="bg-transparent md:bg-white md:border md:border-gray-200 md:rounded-xl md:shadow-sm overflow-hidden">
          
          {/* --- DESKTOP TABLE HEADER SKELETON --- */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100">
            <div className="col-span-5 h-3 w-20 bg-gray-200 rounded"></div>
            <div className="col-span-4 h-3 w-24 bg-gray-200 rounded"></div>
            <div className="col-span-3 h-3 w-20 bg-gray-200 rounded ml-auto"></div>
          </div>

          {/* --- DATA LIST SKELETON --- */}
          <div className="space-y-4 md:space-y-0 divide-y divide-gray-100">
            {skeletonRows.map((_, index) => (
              <div 
                key={index}
                className="
                  flex flex-col md:grid md:grid-cols-12 md:items-center md:gap-4 
                  bg-white p-5 md:px-6 md:py-5
                  rounded-xl md:rounded-none 
                  border border-gray-200 md:border-none md:border-transparent
                  shadow-sm md:shadow-none
                  animate-pulse
                "
              >
                
                {/* 1. Task Title & ID Skeleton */}
                <div className="col-span-5 mb-4 md:mb-0">
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="w-8 h-8 bg-gray-200 rounded-lg shrink-0"></div>
                    <div className="w-full">
                      {/* Title */}
                      <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
                      {/* ID Badge */}
                      <div className="h-5 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* 2. Submission Date Skeleton */}
                <div className="col-span-4 mb-4 md:mb-0">
                  {/* Mobile Label */}
                  <div className="md:hidden h-3 w-20 bg-gray-200 rounded mb-2"></div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* 3. Mark / Score Skeleton */}
                <div className="col-span-3 flex md:justify-end items-center border-t md:border-none border-gray-100 pt-4 md:pt-0 mt-2 md:mt-0">
                   <div className="w-full md:w-auto flex justify-between md:block items-center">
                      {/* Mobile Label */}
                      <div className="md:hidden h-4 w-24 bg-gray-200 rounded"></div>
                      
                      {/* Badge Pill */}
                      <div className="h-8 w-28 bg-gray-200 rounded-full"></div>
                   </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="p-3 bg-indigo-100 rounded-xl">
            <Trophy className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Grades</h1>
            <p className="text-sm text-gray-500">
              View your graded task submissions
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="bg-transparent md:bg-white md:border md:border-gray-200 md:rounded-xl md:shadow-sm overflow-hidden">
          {/* --- DESKTOP TABLE HEADER (Hidden on Mobile) --- */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div className="col-span-5">Task Details</div>
            <div className="col-span-4">Submission Date</div>
            <div className="col-span-3 text-right">Score Obtained</div>
          </div>

          {/* --- DATA LIST --- */}
          <div className="space-y-4 md:space-y-0 divide-y divide-gray-100">
            {data.map((task : GradedTask) => (
              <div
                key={task.taskId}
                className="
                  group relative 
                  flex flex-col md:grid md:grid-cols-12 md:items-center md:gap-4 
                  bg-white p-5 md:px-6 md:py-5
                  rounded-xl md:rounded-none 
                  border border-gray-200 md:border-none md:border-transparent
                  shadow-sm md:shadow-none
                  hover:bg-gray-50 transition-colors
                "
              >
                {/* 1. Task Title & ID */}
                <div className="col-span-5 mb-4 md:mb-0">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-indigo-50 rounded-lg shrink-0">
                      <FileCheck className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                        {task.taskTitle}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-400 font-mono bg-gray-50 w-fit px-1.5 py-0.5 rounded border border-gray-100">
                        <Hash className="w-3 h-3" />
                        <span className="truncate max-w-[150px]">
                          {task.taskId}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Submission Date */}
                <div className="col-span-4 mb-4 md:mb-0">
                  <span className="md:hidden text-xs font-bold text-gray-400 uppercase tracking-wide mb-1 block">
                    Submitted On
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{task.submittedAt}</span>
                  </div>
                </div>

                {/* 3. Mark / Score */}
                <div className="col-span-3 flex md:justify-end items-center border-t md:border-none border-gray-100 pt-4 md:pt-0 mt-2 md:mt-0">
                  <div className="w-full md:w-auto flex justify-between md:block items-center">
                    <span className="md:hidden text-sm font-bold text-gray-700">
                      Final Grade:
                    </span>

                    <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 px-4 py-1.5 rounded-full">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm font-bold">
                        {task.mark !== null ? (
                          `${task.mark} / 100`
                        ) : (
                          <span className="text-red-400">"Not graded yet"</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskResult;
