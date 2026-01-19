import React, { useContext, useState } from "react";
import {
  FileText,
  Calendar,
  Link as LinkIcon,
  AlertCircle,
  CheckCircle2,
  Send,
} from "lucide-react";
import { AuthContext } from "@/components/Authentication_Work/AuthProvider/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/url/useAxiosPublic";
import moment from "moment";
import { Slide, toast, ToastContainer } from "react-toastify";
interface TaskSubmission {
  taskId: string;
  taskTitle: string;
  studentEmail: string;
  submissionLink: string;
  submittedAt: string;
  mark: number | null;
}

interface Task {
  _id: string;
  title: string;
  courseId: string;
  link: string;
  postedAt: string;
  mail: string[];
}

const Tasks: React.FC = () => {
  const auth = useContext(AuthContext);
  const { person } = auth || {};
  const axiosPub = useAxiosPublic();

  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [assignmentLink, setAssignmentLink] = useState("");

  const { data: enrolledData = [], refetch: refetchEnrolled } = useQuery({
    queryKey: ["enrolledCourses", person?.email],
    queryFn: async () => {
      if (!person?.email) return [];
      const res = await axiosPub.get(`/enrolled/${person?.email}`);
      return res.data;
    },
    enabled: !!person?.email,
  });

  // 2. Fetch All Tasks
  const { data: allTasks = [], isLoading, refetch } = useQuery({
    queryKey: ["allTasks"],
    queryFn: async () => {
      const res = await axiosPub.get("/tasks");
      return res.data as Task[];
    },
  });

  const myCourseIds = new Set<string>();

  if (Array.isArray(enrolledData)) {
    enrolledData.forEach((course) => {
      if (course.id) {
        myCourseIds.add(String(course.id));
      }
    });
  }

  const myTasks = allTasks.filter((task) => {
    return myCourseIds.has(String(task.courseId));
  });

  // --- SUBMISSION HANDLER ---
  const toggleRow = (taskId: string) => {
    if (expandedTaskId === taskId) {
      setExpandedTaskId(null);
      setAssignmentLink("");
    } else {
      setExpandedTaskId(taskId);
      setAssignmentLink("");
    }
  };

  const handleSubmit = (taskId: string, title: string) => {
    if (!assignmentLink) {
      alert("Please enter a valid link.");
      return;
    }

    console.log("Submitting Assignment:", {
      taskId,
      taskTitle: title,
      studentEmail: person?.email,
      submissionLink: assignmentLink,
      submittedAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      mark: null,
    });

    const tasksR = {
      taskId,
      taskTitle: title,
      studentEmail: person?.email || "",
      submissionLink: assignmentLink,
      submittedAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      mark: null,
    };
    
    mutationTask.mutate(tasksR);
    mutationAddmail.mutate(taskId);

    
    setExpandedTaskId(null);
    setAssignmentLink("");
  };
  const mutationTask = useMutation({
    mutationFn: async (newTask: TaskSubmission) => {
      const res = await axiosPub.post("/replyTask", newTask);
      return res.data;
    },
    onSuccess: () => {
      refetchEnrolled()
      refetch();
      toast.success("Task submitted successfully!", {
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

  const mutationAddmail = useMutation({
    mutationFn: async(t : string)=>{
      const res = await axiosPub.put(`/replyTask/${t}`, {mail : person?.email});
      return res.data;
    }
  })


  // Create an array to mimic multiple rows (e.g., 5 items)
  const skeletonRows = Array(5).fill(null);

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen font-sans">
        {/* Header Skeleton */}
        <div className="mb-6 animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded-md"></div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {/* Replicating headers to maintain column widths */}
                {[
                  "Task Title",
                  "Course ID",
                  "Posted Date",
                  "Resource",
                  "Action",
                ].map((_, index) => (
                  <th key={index} className="px-6 py-4">
                    <div
                      className={`h-4 bg-gray-200 rounded w-20 ${index === 4 ? "ml-auto" : ""}`}
                    ></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {skeletonRows.map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {/* Task Title Column */}
                  <td className="px-6 py-4">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                  </td>

                  {/* Course ID Column (Badge shape) */}
                  <td className="px-6 py-4">
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                  </td>

                  {/* Posted Date Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </td>

                  {/* Resource Column */}
                  <td className="px-6 py-4">
                    <div className="h-4 w-12 bg-gray-200 rounded"></div>
                  </td>

                  {/* Action Column (Button shape) */}
                  <td className="px-6 py-4 text-right">
                    <div className="inline-block h-9 w-24 bg-gray-200 rounded-lg"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
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
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="text-indigo-600" /> My Course Tasks
        </h1>
      </div>

      <div className="bg-transparent md:bg-white md:border md:border-gray-200 md:rounded-xl md:shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse block md:table">
          {/* Table Header - Hidden on Mobile */}
          <thead className="hidden md:table-header-group">
            <tr className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b">
              <th className="px-6 py-4">Task Title</th>
              <th className="px-6 py-4">Course ID</th>
              <th className="px-6 py-4">Posted Date</th>
              <th className="px-6 py-4">Resource</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="block md:table-row-group space-y-4 md:space-y-0">
            {myTasks.length > 0 ? (
              myTasks.map((task) => {
                const isSubmitted = task.mail?.includes(person?.email || "");

                return (
                  <React.Fragment key={task._id}>
                    {/* Main Row / Card */}
                    <tr
                      className={`
                  block md:table-row 
                  bg-white md:bg-transparent 
                  border border-gray-200 md:border-none md:border-b md:border-gray-100
                  rounded-xl md:rounded-none shadow-sm md:shadow-none
                  hover:bg-gray-50/50 transition-colors
                  ${expandedTaskId === task._id ? "ring-2 ring-indigo-500 md:ring-0 md:bg-indigo-50/30" : ""}
                `}
                    >
                      {/* Title Column */}
                      <td className="block md:table-cell px-4 py-3 md:px-6 md:py-4 font-medium text-gray-900 border-b md:border-none border-gray-100">
                        <span className="md:hidden text-xs text-gray-400 uppercase font-bold block mb-1">
                          Title
                        </span>
                        {task.title}
                      </td>

                      {/* Course ID Column */}
                      <td className="block md:table-cell px-4 py-2 md:px-6 md:py-4">
                        <div className="flex items-center justify-between md:block">
                          <span className="md:hidden text-sm text-gray-500 font-medium">
                            Course:
                          </span>
                          <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-mono">
                            {task.courseId}
                          </span>
                        </div>
                      </td>

                      {/* Date Column */}
                      <td className="block md:table-cell px-4 py-2 md:px-6 md:py-4 text-sm text-gray-500">
                        <div className="flex items-center justify-between md:justify-start gap-2">
                          <span className="md:hidden text-sm text-gray-500 font-medium">
                            Posted:
                          </span>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {task.postedAt
                              ? task.postedAt.split("T")[0]
                              : "N/A"}
                          </div>
                        </div>
                      </td>

                      {/* Resource Column */}
                      <td className="block md:table-cell px-4 py-2 md:px-6 md:py-4">
                        <div className="flex items-center justify-between md:justify-start">
                          <span className="md:hidden text-sm text-gray-500 font-medium">
                            Resource:
                          </span>
                          <a
                            href={task.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:underline"
                          >
                            <LinkIcon className="w-3 h-3" /> Link
                          </a>
                        </div>
                      </td>

                      {/* Action Column */}
                      <td className="block md:table-cell px-4 py-4 md:px-6 md:py-4 md:text-right border-t md:border-none border-gray-100 mt-2 md:mt-0">
                        <div className="flex justify-end w-full">
                          {isSubmitted ? (
                            <span className="w-full md:w-auto flex justify-center md:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                              <CheckCircle2 className="w-3 h-3" /> Submitted
                            </span>
                          ) : (
                            <button
                              onClick={() => toggleRow(task._id)}
                              className={`w-full md:w-auto text-sm font-medium px-4 py-2 rounded-lg transition-all border ${
                                expandedTaskId === task._id
                                  ? "bg-gray-200 text-gray-800 border-gray-300"
                                  : "bg-indigo-600 text-white hover:bg-indigo-700 border-transparent shadow-sm hover:shadow"
                              }`}
                            >
                              {expandedTaskId === task._id
                                ? "Cancel"
                                : "Submit"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Submission Form */}
                    {expandedTaskId === task._id && !isSubmitted && (
                      <tr className="block md:table-row bg-indigo-50/30 md:bg-indigo-50/30 mt-[-1rem] md:mt-0 rounded-b-xl md:rounded-none mb-4 md:mb-0 border-x border-b border-indigo-100 md:border-none shadow-sm md:shadow-none">
                        <td
                          colSpan={5}
                          className="block md:table-cell px-4 pb-6 pt-4 md:px-6 md:pt-2"
                        >
                          <div className="bg-white border border-indigo-100 rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-3 items-end md:items-center animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="flex-1 w-full">
                              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5 block">
                                Paste Assignment Link
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <LinkIcon className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                  type="url"
                                  value={assignmentLink}
                                  onChange={(e) =>
                                    setAssignmentLink(e.target.value)
                                  }
                                  placeholder="https://github.com/..."
                                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                                  autoFocus
                                />
                              </div>
                            </div>

                            <button
                              onClick={() => handleSubmit(task._id, task.title)}
                              className="w-full md:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-black transition-colors shadow-lg shadow-gray-200 text-sm font-bold"
                            >
                              <Send className="w-4 h-4" />
                              Submit
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr className="block md:table-row bg-white rounded-xl md:rounded-none border border-gray-200 md:border-none">
                <td
                  colSpan={5}
                  className="block md:table-cell p-8 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <AlertCircle className="w-8 h-8 text-gray-300" />
                    <p>No tasks found for your purchased courses.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
