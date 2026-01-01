import { AuthContext } from "@/components/Authentication_Work/AuthProvider/AuthProvider";
import useAxiosPublic from "@/url/useAxiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Slide, toast, ToastContainer } from "react-toastify";
import { Info, CheckCircle } from "lucide-react";

type Inputs = {
  subject: string;
  description: string;
};
interface SupportData {
  subject: string;
  description: string;
  userEmail?: string;
  date: string;
  status: string;
  reply?: {
    replyText?: string;
  };
  replyDate?: string;
}
const Support = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("Auth context is not available");
  }
  const { person } = auth;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const supportData = {
      subject: data.subject,
      description: data.description,
      userEmail: person?.email || "",
      date: moment().format("LLLL"),
      status: "Pending",
    };
    console.log(supportData);
    mutationUp.mutate(supportData);
  };

  const axiosPub = useAxiosPublic();

  const mutationUp = useMutation({
    mutationFn: async (supportData: SupportData) => {
      const res = await axiosPub.post("/support", supportData);
      return res.data;
    },
    onSuccess: () => {
      refetch();
      reset();
      toast.success("Support request submitted successfully!", {
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
    onError: (error) => {
      toast.error(`Failed to submit support request: ${error.message}`, {
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

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["supportRequests", person?.email],
    queryFn: async () => {
      const res = await axiosPub.get(`/support/${person?.email}`); // Removed extra colon
      return res.data;
    },
  });
  const sortedData = data && data.length > 0 
  ? [...data].sort((a: SupportData, b: SupportData) => {
      const dateA = moment(a.date, "LLLL");
      const dateB = moment(b.date, "LLLL");
      return dateB.valueOf() - dateA.valueOf();
    })
  : [];
console.log(sortedData);


  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row gap-6 lg:p-4">
      <ToastContainer></ToastContainer>
      {/* Left Side - Modal */}
      <div className="w-full lg:w-1/2">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold">
              Get Support Within 2-4 Hours
            </span>
            <button className="p-1 rounded hover:bg-gray-100">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
              </svg>
            </button>
          </div>

          {/* Modal Body */}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="subject" className="block font-medium mb-1">
                Subject
              </label>
              <input
                id="subject"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                type="text"
                {...register("subject", {
                  required: "Subject is required",
                  maxLength: { value: 32, message: "Maximum 32 characters" },
                  minLength: { value: 15, message: "At least 15 characters" },
                })}
              />
              <p className="text-sm text-gray-500 mt-1">
                Maximum 32 characters
              </p>
              {errors.subject && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                className="w-full border border-gray-300 rounded p-2 h-24 focus:outline-none focus:ring-2 focus:ring-amber-400"
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 40, message: "At least 40 characters" },
                })}
              />
              <p className="text-sm text-gray-500 mt-1">
                Provide a clear description of your issues
              </p>
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="bg-amber-400 text-white px-4 py-2 rounded hover:bg-amber-500 w-full lg:w-auto"
              >
                Post Now
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - FAQ */}
      <div className="w-full lg:w-1/2">
        <h3 className="text-xl font-bold mb-4">Replies To Support Request</h3>

        <div className="card p-4 ">
          <span className="title mb-2">Comments</span>

          {isLoading ? (
            <>
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 w-full max-w-xl mx-auto transition hover:shadow-md mt-2 animate-pulse">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  {/* Title Skeleton */}
                  <div className="h-6 w-3/4 bg-slate-200 rounded-md mb-2 sm:mb-0"></div>

                  {/* Badges Skeleton */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="h-5 w-16 bg-slate-200 rounded-full"></div>
                    <div className="h-5 w-20 bg-slate-200 rounded-full"></div>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-slate-100"></div>

                {/* Time Info Skeleton */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-xs text-slate-600">
                    <div className="h-4 w-24 bg-slate-200 rounded-md mb-2 sm:mb-0"></div>
                    <div className="h-4 w-24 bg-slate-200 rounded-md"></div>
                  </div>
                </div>

                {/* Answer Section Skeleton */}
                <div className="mt-4 space-y-2">
                  <div className="h-4 w-20 bg-slate-200 rounded-md"></div>
                  <div className="h-3 w-full bg-slate-200 rounded-md"></div>
                  <div className="h-3 w-full bg-slate-200 rounded-md"></div>
                  <div className="h-3 w-5/6 bg-slate-200 rounded-md"></div>
                </div>
              </div>
            </>
          ) : (
            <>
              {sortedData && sortedData.length > 0 ? (
                <>
                  {sortedData.slice(0,3).map((item : SupportData) => (
                    <div
                      key={item.date}
                      className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 w-full max-w-xl mx-auto transition hover:shadow-md mt-2"
                    >
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        {/* Title */}
                        <h2 className="text-lg font-semibold text-slate-900">
                          Problem: {item?.subject}
                        </h2>

                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Pending Badge */}

                          {
                            item.status === "Pending" ? <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-800 text-xs font-medium border border-yellow-100 relative group">
                            <Info className="h-3.5 w-3.5" />
                            <span>Pending</span>
                            <span className="ml-1 bg-yellow-200 text-yellow-900 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                              1
                            </span>
                            {/* Tooltip */}
                            <div className="absolute hidden group-hover:block bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-[10px] px-2 py-1 rounded-md shadow">
                              This problem is still pending
                            </div>
                          </div> : <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-100 relative group">
                            <CheckCircle className="h-3.5 w-3.5" />
                            <span>Problem Solved</span>
                            <span className="ml-1 bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                              1
                            </span>
                            {/* Tooltip */}
                            <div className="absolute hidden group-hover:block bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-[10px] px-2 py-1 rounded-md shadow">
                              Problem marked as solved
                            </div>
                          </div>
                          }
                          

                          {/* Solved Badge */}
                          
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="my-4 border-t border-slate-100" />

                      {/* Time Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-xs text-slate-600">
                          <div>
                            <div className="font-medium text-slate-800">
                              Submitted
                            </div>
                            <div>{item?.date}</div>
                          </div>
                          <div>
                            <div className="font-medium text-slate-800">
                              Answered
                            </div>
                            <div>{item?.replyDate ? item?.replyDate : "Not answered yet"}</div>
                          </div>
                        </div>
                      </div>

                      {/* Answer Section */}
                      <div className="mt-4">
                        <h3 className="text-sm font-semibold text-slate-800 mb-1">
                          Answer:
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {item?.reply?.replyText ? item?.reply?.replyText : "Our support team is reviewing your request and will get back to you shortly."}
                          
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-sm text-gray-500">
                  No support requests found.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
