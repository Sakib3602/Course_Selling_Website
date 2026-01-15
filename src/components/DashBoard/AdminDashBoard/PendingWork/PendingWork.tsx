"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "@/url/useAxiosPublic"; 
import { toast,ToastContainer, Slide } from "react-toastify";
import { Link2, Save, X, Loader2 } from "lucide-react";

export default function PendingWork() {
  const axiosPub = useAxiosPublic();
  const queryClient = useQueryClient();
  
  // State to track which row is currently being edited
  const [editingRow, setEditingRow] = useState<Record<string, boolean>>({});
  
  // State to store the input text
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  // 1. Fetch Data from '/pendings'
  const { data: courses = [], isLoading, refetch } = useQuery({
    queryKey: ["pending-work"],
    queryFn: async () => {
      const res = await axiosPub.get("/pendings");
      return res.data;
    },
  });

  

     // 2. Mutation to Update Link
  const updateMutation = useMutation({
    mutationFn: async ({ orderId, courseId, link }: { orderId: string, courseId: string, link: string }) => {
      const res = await axiosPub.patch("/admin/update-course-link", { 
        orderId, 
        courseId, 
        link 
      });
      return res.data;
    },
    onSuccess: () => {
      refetch()
      toast.success("Link updated successfully!");
      setEditingRow({});
    },
    onError: () => {
      toast.error("Failed to update link.");
    }
  });

  const handleEditClick = (id: string, currentLink: string) => {
    setEditingRow({ [id]: true });
    setInputValues({ [id]: currentLink === "pending" ? "" : currentLink });
  };

  const handleCancel = (id: string) => {
    setEditingRow({ ...editingRow, [id]: false });
  };

  const handleSubmit = (orderId: string, courseId: string) => {
    const linkToSave = inputValues[courseId];
    if (!linkToSave) return toast.warning("Please enter a link!");
    updateMutation.mutate({ orderId, courseId, link: linkToSave });
  };

  if (isLoading) return <div className="flex justify-center mt-20"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
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
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">Pending Work Queue</h1>
      
      {/* Responsive Table Wrapper */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-gray-100 text-gray-700 text-xs sm:text-sm uppercase">
              <tr>
                <th className="p-3 sm:p-4 border-b">Course Info</th>
                <th className="p-3 sm:p-4 border-b">Order ID</th>
                <th className="p-3 sm:p-4 border-b">Price</th>
                <th className="p-3 sm:p-4 border-b">Status</th>
                <th className="p-3 sm:p-4 border-b w-[300px]">Access Link</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200">
              {courses.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  
                  {/* 1. Course Info */}
                  <td className="p-3 sm:p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover border bg-gray-100"
                      />
                      <span className="font-semibold text-gray-800 text-xs sm:text-sm max-w-[180px] sm:max-w-[200px] truncate block">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  {/* 2. Order ID */}
                  <td className="p-3 sm:p-4 text-xs text-gray-500 font-mono">
                    {item.orderId}
                  </td>

                  {/* 3. Price */}
                  <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium">
                    {item.price} BDT
                  </td>

                  {/* 4. Status */}
                  <td className="p-3 sm:p-4">
                    <span className={`px-2 py-1 rounded text-[10px] sm:text-xs font-bold 
                      ${item.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                      {item.status}
                    </span>
                  </td>

                  {/* 5. Action / Input */}
                  <td className="p-3 sm:p-4">
                    {editingRow[item.id] ? (
                      // Edit Mode
                      <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                        <input 
                          type="text" 
                          placeholder="Paste link..."
                          value={inputValues[item.id] || ""}
                          onChange={(e) => setInputValues({ ...inputValues, [item.id]: e.target.value })}
                          className="border border-blue-400 rounded px-2 py-1 text-xs sm:text-sm w-full min-w-[140px] focus:outline-none focus:ring-2 focus:ring-blue-200"
                          autoFocus
                        />
                        <div className="flex gap-1">
                          <button 
                            onClick={() => handleSubmit(item.orderId, item.id)}
                            className="p-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition"
                            title="Save"
                          >
                            <Save size={14} className="sm:w-4 sm:h-4" />
                          </button>
                          <button 
                            onClick={() => handleCancel(item.id)}
                            className="p-1.5 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                            title="Cancel"
                          >
                            <X size={14} className="sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="flex items-center justify-between gap-2">
                        {item.downloadLink && item.downloadLink !== "pending" ? (
                          <a 
                            href={item.downloadLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-blue-600 hover:underline text-xs sm:text-sm max-w-[120px] sm:max-w-[150px] truncate block"
                          >
                            {item.downloadLink}
                          </a>
                        ) : (
                          <span className="text-gray-400 text-xs sm:text-sm italic">No link</span>
                        )}
                        
                        <button 
                          onClick={() => handleEditClick(item.id, item.downloadLink)}
                          className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-black text-white text-[10px] sm:text-xs rounded hover:bg-gray-800 transition whitespace-nowrap"
                        >
                          <Link2 size={12} className="sm:w-3.5 sm:h-3.5" />
                          {item.downloadLink && item.downloadLink !== "pending" ? "Edit" : "Add Link"}
                        </button>
                      </div>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          
          {courses.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No pending work found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}