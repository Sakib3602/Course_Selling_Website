import { Megaphone, Users, GraduationCap, Calendar, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/url/useAxiosPublic";

// Types
type TargetAudience = "user" | "instructor";

interface Announcement {
  _id: string;
  title: string;
  description: string;
  target: TargetAudience;
  date: string;
}

const AnnIns = () => {
  const axiosPriv = useAxiosPublic();

  // Fetch Data
  const { data, isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosPriv.get("/announcements");
      return res.data;
    }
  });

  const filDaa = data?.filter((item: Announcement) => item.target === "instructor");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-poppins">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white border border-gray-100 shadow-sm rounded-full text-primary">
              <Megaphone className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Latest Announcements</h1>
              <p className="text-sm text-gray-500">Stay updated with the latest news</p>
            </div>
          </div>
          
          {/* Count Badge */}
          {!isLoading && data?.length > 0 && (
            <span className="hidden sm:inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
              {filDaa?.length} Updates
            </span>
          )}
        </div>

        {/* Content Area */}
        <div className="space-y-4">
          {isLoading ? (
             // Loading State
             <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
                <p className="text-sm text-gray-500">Loading updates...</p>
             </div>
          ) : filDaa && filDaa.length > 0 ? (
            // ✅ Data Found State
            filDaa.map((item: Announcement) => (
              <div
                key={item._id}
                className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
              >
                {/* Colored Side Bar */}
                <div 
                  className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                    item.target === "user" ? "bg-green-500" : "bg-purple-500"
                  }`} 
                />

                {/* Header: Badge & Date */}
                <div className="flex flex-wrap items-center gap-3 mb-3 pl-3">
                  <span
                    className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${
                      item.target === "user"
                        ? "bg-green-50 text-green-700 border border-green-100"
                        : "bg-purple-50 text-purple-700 border border-purple-100"
                    }`}
                  >
                    {item.target === "user" ? <GraduationCap size={14} /> : <Users size={14} />}
                    {item.target === "user" ? "Student" : "Instructor"}
                  </span>
                  
                  <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                    <Calendar size={14} />
                    {item.date}
                  </span>
                </div>

                {/* Content */}
                <div className="pl-3">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            // ✅ No Data State
            <div className="flex flex-col items-center justify-center py-16 text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
              <div className="p-4 bg-gray-50 rounded-full mb-3">
                <Megaphone className="h-8 w-8 opacity-40" />
              </div>
              <p className="font-medium text-gray-600">No announcements yet</p>
              <p className="text-sm mt-1">Check back later for updates</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AnnIns;