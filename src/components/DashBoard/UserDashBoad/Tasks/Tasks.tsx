import React, { useContext, useState } from "react";
import {
  FileText,
  Calendar,
  Link as LinkIcon,
  AlertCircle,
  CheckCircle2,
  Send
} from "lucide-react";
import { AuthContext } from "@/components/Authentication_Work/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/url/useAxiosPublic";


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

  const { data: enrolledData = [] } = useQuery({
    queryKey: ["enrolledCourses", person?.email],
    queryFn: async () => {
      if (!person?.email) return [];
      const res = await axiosPub.get(`/enrolled/${person?.email}`);
      return res.data;
    },
    enabled: !!person?.email,
  });

  // 2. Fetch All Tasks
  const { data: allTasks = [], isLoading } = useQuery({
    queryKey: ["allTasks"],
    queryFn: async () => {
      const res = await axiosPub.get("/tasks");
      return res.data as Task[];
    },
  });

  
  const myCourseIds = new Set<string>();

  if (Array.isArray(enrolledData)) {
    enrolledData.forEach((course: any) => {
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
      submittedAt: new Date().toISOString(),
    });

    // TODO: Add your API call here to update the 'mail' array in DB
    // await axiosPub.post('/submit-task', { ... })

    alert("Assignment Submitted! (Check Console)");
    setExpandedTaskId(null);
    setAssignmentLink("");
  };

  if (isLoading) {
    return <div className="p-10 text-center">Loading tasks...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="text-indigo-600" /> My Course Tasks
        </h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b">
              <th className="px-6 py-4">Task Title</th>
              <th className="px-6 py-4">Course ID</th>
              <th className="px-6 py-4">Posted Date</th>
              <th className="px-6 py-4">Resource</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {myTasks.length > 0 ? (
              myTasks.map((task) => {
                // Check if user has already submitted
                // Using optional chaining and fallback in case 'mail' array is undefined
                const isSubmitted = task.mail?.includes(person?.email || "");

                return (
                  <React.Fragment key={task._id}>
                    {/* Main Row */}
                    <tr className={`hover:bg-gray-50/50 transition-colors ${expandedTaskId === task._id ? "bg-indigo-50/30" : ""}`}>
                      <td className="px-6 py-4 font-medium text-gray-900">{task.title}</td>
                      <td className="px-6 py-4">
                        <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-mono">
                          {task.courseId}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {task.postedAt ? task.postedAt.split("T")[0] : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={task.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:underline"
                        >
                          <LinkIcon className="w-3 h-3" /> Link
                        </a>
                      </td>
                      
                      {/* Action Column: Submit Button or Submitted Badge */}
                      <td className="px-6 py-4 text-right">
                        {isSubmitted ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                            <CheckCircle2 className="w-3 h-3" /> Submitted
                          </span>
                        ) : (
                          <button
                            onClick={() => toggleRow(task._id)}
                            className={`text-sm font-medium px-4 py-2 rounded-lg transition-all border ${
                              expandedTaskId === task._id
                                ? "bg-gray-200 text-gray-800 border-gray-300"
                                : "bg-indigo-600 text-white hover:bg-indigo-700 border-transparent shadow-sm hover:shadow"
                            }`}
                          >
                            {expandedTaskId === task._id ? "Cancel" : "Submit"}
                          </button>
                        )}
                      </td>
                    </tr>

                    {/* Expandable Submission Form */}
                    {expandedTaskId === task._id && !isSubmitted && (
                      <tr className="bg-indigo-50/30">
                        <td colSpan={5} className="px-6 pb-6 pt-2">
                          <div className="bg-white border border-indigo-100 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-end sm:items-center animate-in fade-in slide-in-from-top-2 duration-200">
                            
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
                                  onChange={(e) => setAssignmentLink(e.target.value)}
                                  placeholder="https://github.com/username/project..."
                                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                                  autoFocus
                                />
                              </div>
                            </div>

                            <button
                              onClick={() => handleSubmit(task._id, task.title)}
                              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-black transition-colors shadow-lg shadow-gray-200 text-sm font-bold"
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
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
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