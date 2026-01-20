import { AuthContext } from "@/components/Authentication_Work/AuthProvider/AuthProvider";
import useAxiosPrivate from "@/url/useAxiosPrivate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";

type SupportItem = {
  _id: string;
  subject?: string;
  question?: string;
  description?: string;
  status?: string;
  date?: string;
  userEmail?: string;
};

const SupportReq = () => {
  const axiosPrivate = useAxiosPrivate();
  const auth = useContext(AuthContext);

  // --- 1. New State for Modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  if (!auth) {
    throw new Error("AuthContext is undefined");
  }
  const { person } = auth;

  const { data, isLoading, refetch } = useQuery<SupportItem[]>({
    queryKey: ["support-requests"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/supportAll", {
        params: { email: person?.email },
      });
      return res.data;
    },
  });

  const items = data ?? [];

  const handleAdd = () => {
    // TODO: open add modal or navigate to create page
    console.log("Add new support request");
  };

  // --- 2. Update Handle Reply to open Modal ---
  const handleReply = (id: string) => {
    setSelectedRequestId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequestId(null);
    setReplyText("");
  };

  const handleSubmitReply = async (id: string | null) => {
    if (!replyText.trim()) return;

    // TODO: Add your Axios POST request here to send the reply
    console.log(`Sending reply to ID: ${id}`, replyText);
    const replyPayload = {
      replyText: replyText,
    };
    mutateReply.mutate(replyPayload);

    // After success:
    // handleCloseModal();
  };

  const mutateReply = useMutation({
    mutationFn: async (data: { replyText: string }) => {
      const res = await axiosPrivate.patch(`/support-reply/${selectedRequestId}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Reply sent successfully!", {
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

      handleCloseModal();
      refetch();
    },
  });
  // const del = (id : string)=>{

  // }

  // const mutationDel = useMutation({
  //   mutationFn : async (id: string) => {
  //     const res = await axiosPrivate.delete(`/delSup/${id}`);
  //     return res.data;
  //   }
    
  // })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-2">
          <div className="h-6 w-48 bg-gray-200 rounded" />
          <div className="h-40 w-80 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Support Requests
            </h2>
            <ToastContainer></ToastContainer>
            <p className="mt-1 text-sm text-gray-500">
              Review and respond to user questions and issues.
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-200 p-8 text-center text-gray-500">
            No support requests found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((q) => {
              const title = q.subject ?? q.question ?? "(no title)";
              const id = q._id;
              const initial = title.charAt(0).toUpperCase();
              return (
                <article
                  key={id}
                  className="relative flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition transform hover:-translate-y-1"
                  aria-labelledby={`support-title-${id}`}
                >
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-tr from-gray-100 to-gray-50 text-gray-800 font-bold text-lg">
                          {initial}
                        </div>
                        <div>
                          <h3
                            id={`support-title-${id}`}
                            className="text-lg font-semibold text-gray-900"
                          >
                            {title}
                          </h3>
                          <p className="mt-0.5 text-sm text-gray-400">
                            {q?.userEmail}
                          </p>
                          <p className="mt-0.5 text-sm text-gray-400">
                            {q.date ?? "-"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            q.status === "Pending"
                              ? "bg-yellow-50 text-yellow-800"
                              : "bg-green-50 text-green-800"
                          }`}
                        >
                          {q.status ?? "Unknown"}
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-gray-600 flex-1">
                      {q.description ?? "No description"}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-3">
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => handleReply(id)}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition"
                        >
                          Reply
                        </button>
                        <button
                          onClick={() => console.log("Close", id)}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-200 text-sm rounded-md hover:bg-gray-50 transition"
                        >
                          Close
                        </button>
                      </div>

                      <div className="hidden sm:flex items-center text-sm text-gray-400">
                        <span className="select-none">ID: #{id}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile FAB */}
      <button
        onClick={handleAdd}
        aria-label="Add request"
        className="fixed bottom-6 right-6 sm:hidden flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-xl hover:bg-gray-800 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {/* --- 3. The Modal UI --- */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          {/* Modal Container */}
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">
                Reply to Request
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">
                Replying to ID: <span className="font-mono">{selectedRequestId}</span>
              </p>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your response here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none outline-none transition"
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmitReply(selectedRequestId)}
                disabled={!replyText.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportReq;