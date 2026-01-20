import { useState } from "react";
import { Megaphone, Users, GraduationCap, Send, Trash2, Calendar, Loader2 } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/url/useAxiosPrivate";
import { Slide, toast, ToastContainer } from "react-toastify";

// Types
type TargetAudience = "user" | "instructor";

interface AnnouncementItem {
  _id: string;
  title: string;
  description: string;
  target: TargetAudience;
  date: string;
}

type CreateAnnouncement = Omit<AnnouncementItem, "_id" | "date"> & {
  date?: string;
};

const Announcement = () => {
  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState<TargetAudience>("user");

  const axiosPriv = useAxiosPrivate();

  // 1. Fetch Data
  const { data, refetch, isLoading } = useQuery<AnnouncementItem[]>({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosPriv.get("/announcements");
      return res.data as AnnouncementItem[];
    },
  });

  // 2. Create Mutation
  const mutationAnn = useMutation({
    mutationFn: async (d: CreateAnnouncement) => {
      const res = await axiosPriv.post("/announcements", d);
      return res.data as AnnouncementItem;
    },
    onSuccess: () => {
      refetch(); // ✅ Refresh the list immediately
      toast.success("Announcement created successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Slide,
      });
      // Reset form
      setTitle("");
      setDescription("");
      setTarget("user");
    }
  });

  // 3. Delete Mutation
  const mutationDel = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosPriv.delete(`/announcements/${id}`);
      return res.data as { deletedId: string };
    },
    onSuccess: () => {
      refetch(); // ✅ Refresh the list immediately
      toast.success("Announcement deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Slide,
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const announcementData: CreateAnnouncement = {
      title,
      description,
      target,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    mutationAnn.mutate(announcementData);
  };

  const handleDelete = (id: string) => {
    mutationDel.mutate(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-poppins">
      <div className="max-w-7xl mx-auto">
        <ToastContainer transition={Slide} />
        
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            <Megaphone className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Announcement Board</h1>
            <p className="text-sm text-gray-500">Manage and view latest updates</p>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT SIDE: Create Form */}
          <div className="lg:col-span-1 h-fit">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                Create Announcement
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter announcement title..."
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    required
                  />
                </div>

                {/* Audience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
                  <div className="relative">
                    <select
                      value={target}
                      onChange={(e) => setTarget(e.target.value as TargetAudience)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none text-sm bg-white"
                    >
                      <option value="user">Student</option>
                      <option value="instructor">Instructor</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                      {target === "user" ? <GraduationCap size={16} /> : <Users size={16} />}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Write your announcement here..."
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={mutationAnn.isPending}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  {mutationAnn.isPending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                  {mutationAnn.isPending ? "Posting..." : "Post Announcement"}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE: Announcement List */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center justify-between">
              <span>Recent Announcements</span>
              <span className="text-xs font-normal px-2 py-1 bg-gray-200 rounded-full text-gray-600">
                Total: {data?.length || 0}
              </span>
            </h2>

            <div className="space-y-4">
              {isLoading ? (
                 // Loading State
                 <div className="flex justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                 </div>
              ) : data && data.length > 0 ? (
                // ✅ Data Found State
                data.map((item) => (
                  <div
                    key={item._id}
                    className="group bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
                  >
                    <div 
                      className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                        item.target === "user" ? "bg-green-500" : "bg-purple-500"
                      }`} 
                    />

                    <div className="flex justify-between items-start mb-2 pl-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                            item.target === "user"
                              ? "bg-green-100 text-green-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {item.target === "user" ? <GraduationCap size={12} /> : <Users size={12} />}
                          {item.target === "user" ? "Student" : "Instructor"}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Calendar size={12} />
                          {item.date}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDelete(item._id!)}
                        className="text-gray-400 hover:text-red-500 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="pl-3">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                // ✅ No Data State (Empty)
                <div className="flex flex-col items-center justify-center py-12 text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
                  <Megaphone className="h-10 w-10 mb-2 opacity-20" />
                  <p className="font-medium">No announcements found</p>
                  <p className="text-xs mt-1">Create one to get started</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Announcement;