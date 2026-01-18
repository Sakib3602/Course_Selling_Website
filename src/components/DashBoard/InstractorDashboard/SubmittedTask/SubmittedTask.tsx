import React, { useState } from 'react';
import { FileText, Link as LinkIcon, Calendar, User, ChevronDown, CheckCircle2, XCircle, Send, Loader2 } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPublic from '@/url/useAxiosPublic';
import { Slide, toast, ToastContainer } from 'react-toastify';

// 1. Define the Interface
interface Submission {
  // Ideally your backend should return a unique _id for the submission itself
  _id?: string; 
  taskId: string;
  taskTitle: string;
  studentEmail: string;
  submissionLink: string;
  submittedAt: string;
  mark: number | null;
}

const SubmittedTask = () => {
  const axiosPub = useAxiosPublic();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [tempMark, setTempMark] = useState<string>('');

  // 2. Fetch Data with Type Safety
  // We default 'data' to an empty array [] to avoid undefined errors
  const { data: submissions = [], isLoading } = useQuery<Submission[]>({
    queryKey: ['submittedTasks'],
    queryFn: async () => {
      const res = await axiosPub.get('/replyAllTask');
      return res.data;
    }
  });

  // 3. Toggle the grading row
  // We use a unique identifier logic here (taskId + email) to avoid conflicts if taskId is shared
  const toggleRow = (id: string, currentMark: number | null) => {
    if (expandedId === id) {
      setExpandedId(null);
      setTempMark('');
    } else {
      setExpandedId(id);
      setTempMark(currentMark ? currentMark.toString() : '');
    }
  };

  // 4. Handle the Mark Submission (Console Log only)
  const handleSubmitMark = (taskId: string) => {
    console.log("Submitting for Task ID:", taskId);
    console.log("Mark Value:", tempMark);
    const d ={
        taskId : taskId,
        mark : tempMark
    }
    mutationSubMark.mutate(d);
    
    // You can add your axios.patch/post logic here later
  };
  const mutationSubMark = useMutation({
    mutationFn : async({taskId, mark} : {taskId: string, mark: string})=>{
        const res = await axiosPub.put(`/submark/${taskId}`, {mark : mark});
        return res.data;
    },
    onSuccess : ()=>{
         toast.success("Mark submitted successfully!", {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-indigo-600">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2 font-medium">Loading submissions...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="text-indigo-600" /> Student Submissions
        </h1>
      </div>
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

      <div className="bg-transparent md:bg-white md:border md:border-gray-200 md:rounded-xl md:shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse block md:table">
          {/* Table Header (Desktop Only) */}
          <thead className="hidden md:table-header-group">
            <tr className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b">
              <th className="px-6 py-4">Task Info</th>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Submitted At</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="block md:table-row-group space-y-4 md:space-y-0">
            {submissions.length > 0 ? (
              submissions.map((sub, index) => {
                // Generate a truly unique key to fix the console error. 
                // Using taskId + index ensures uniqueness even if multiple students submitted the same task.
                const uniqueKey = sub._id || `${sub.taskId}-${index}`;
                // We use this uniqueKey for the expanded logic too, to prevent multiple rows opening if IDs share values
                const isExpanded = expandedId === uniqueKey;

                return (
                  <React.Fragment key={uniqueKey}>
                    {/* Main Row */}
                    <tr className={`
                      block md:table-row 
                      bg-white md:bg-transparent 
                      border border-gray-200 md:border-none md:border-b md:border-gray-100
                      rounded-xl md:rounded-none shadow-sm md:shadow-none
                      ${isExpanded ? "bg-indigo-50/40" : "hover:bg-gray-50/50"}
                      transition-colors
                    `}>
                      
                      {/* Task Info Column */}
                      <td className="block md:table-cell px-4 py-3 md:px-6 md:py-4">
                        <span className="md:hidden text-xs text-gray-400 uppercase font-bold block mb-1">Task</span>
                        <div>
                          <div className="font-medium text-gray-900">{sub.taskTitle}</div>
                          <div className="text-xs font-mono text-gray-400 mt-1 truncate max-w-[200px]" title={sub.taskId}>
                            ID: {sub.taskId}
                          </div>
                        </div>
                      </td>

                      {/* Student Column */}
                      <td className="block md:table-cell px-4 py-2 md:px-6 md:py-4">
                        <div className="flex items-center gap-2">
                          <span className="md:hidden text-sm text-gray-500 font-medium w-24">Student:</span>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="w-4 h-4 text-gray-400" />
                            {sub.studentEmail}
                          </div>
                        </div>
                      </td>

                      {/* Date & Link Column */}
                      <td className="block md:table-cell px-4 py-2 md:px-6 md:py-4">
                        <div className="space-y-2 md:space-y-1">
                          {/* Mobile Label */}
                          <span className="md:hidden text-sm text-gray-500 font-medium block">Details:</span>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span className="truncate">
                              {sub.submittedAt ? sub.submittedAt.split(',')[0] : 'N/A'}
                            </span>
                          </div>
                          <a 
                            href={sub.submissionLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline"
                          >
                            <LinkIcon className="w-3 h-3" /> View Assignment
                          </a>
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="block md:table-cell px-4 py-2 md:px-6 md:py-4">
                          <div className="flex items-center gap-2 justify-between md:justify-start">
                            <span className="md:hidden text-sm text-gray-500 font-medium">Grade:</span>
                            {sub.mark !== null ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                                <CheckCircle2 className="w-3.5 h-3.5" /> {sub.mark}/100
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 border border-yellow-200">
                                <XCircle className="w-3.5 h-3.5" /> Pending
                              </span>
                            )}
                          </div>
                      </td>

                      {/* Action Column */}
                      <td className="block md:table-cell px-4 py-4 md:px-6 md:py-4 md:text-right border-t md:border-none border-gray-100 mt-2 md:mt-0">
                        <button
                          // Use uniqueKey here to expand the correct row
                          onClick={() => toggleRow(uniqueKey, sub.mark)}
                          className={`w-full md:w-auto flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all border ${
                            isExpanded
                              ? "bg-gray-800 text-white border-gray-800"
                              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 shadow-sm"
                          }`}
                        >
                          {isExpanded ? "Close" : (sub.mark !== null ? "Edit Mark" : "Grade")}
                          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                      </td>
                    </tr>

                    {/* Expandable Grading Form */}
                    {isExpanded && (
                      <tr className="block md:table-row bg-gray-50 md:bg-gray-50/50 mt-[-1rem] md:mt-0 rounded-b-xl md:rounded-none mb-4 md:mb-0 border-x border-b border-gray-200 md:border-none shadow-sm md:shadow-inner">
                        <td colSpan={5} className="block md:table-cell px-4 py-6 md:px-8 md:py-6">
                          <div className="flex flex-col md:flex-row items-end md:items-center gap-4 animate-in fade-in slide-in-from-top-1">
                            
                            <div className="w-full md:w-64">
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                                Assign Mark (0-100)
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={tempMark}
                                  onChange={(e) => setTempMark(e.target.value)}
                                  placeholder="e.g., 85"
                                  className="block w-full pl-3 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                                  autoFocus
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 text-sm font-medium">
                                  / 100
                                </div>
                              </div>
                            </div>

                            <button
                              // Pass the actual task ID to the handler
                              onClick={() => handleSubmitMark(sub.taskId)}
                              className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-md text-sm font-bold h-[42px]"
                            >
                              <Send className="w-4 h-4" />
                              Submit Result
                            </button>

                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
               <tr className="block md:table-row">
                <td colSpan={5} className="block md:table-cell px-6 py-8 text-center text-gray-500">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmittedTask;