import useAxiosPrivate from "@/url/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";


const ProfileA = () => {
  const axiosPriv = useAxiosPrivate();
  
  const { data, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axiosPriv.get("/admin/stats");
      return res.data;
    }
  });

  if (isLoading) {
    return <div className="p-10 text-center">Loading dashboard stats...</div>;
  }

  // Create the dynamic stats array using the fetched 'data'
  const statsCards = [
    { 
      title: "Total Users", 
      value: data?.totalUsers || 0, 
      color: "bg-blue-50", 
      icon: "👥" 
    },
    { 
      title: "Active Students", 
      value: data?.totalStudents || 0, 
      color: "bg-indigo-50", 
      icon: "🎓" 
    },
    { 
      title: "Instructors", 
      value: data?.totalInstructors || 0, 
      color: "bg-orange-50", 
      icon: "👨‍🏫" 
    },
    { 
      title: "Total Orders", 
      value: data?.totalOrders || 0, 
      color: "bg-green-50", 
      icon: "📦" 
    },
    { 
      title: "Total Courses", 
      value: data?.totalCourses || 0, 
      color: "bg-pink-50", 
      icon: "📚" 
    },
    // { 
    //   title: "Total Revenue", 
    //   value: `$${data?.totalRevenue || 0}`, // Added $ sign
    //   color: "bg-yellow-50", 
    //   icon: "💰" 
    // },
    { 
      title: "Pending Support", 
      value: data?.pendingSupport || 0, 
      color: "bg-red-50", 
      icon: "📩" 
    },
  ];

  return (
    <div>
      <main className="flex-1 overflow-auto bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black text-balance">Welcome to Admin Panel</h2>
            <p className="text-gray-600 mt-2">Manage your business with our premium admin dashboard</p>
          </div>

          {/* Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((card, index) => (
              <div
                key={index}
                className={`${card.color} rounded-lg p-6 border border-gray-200 hover:shadow-lg transition`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                    <p className="text-2xl font-bold text-black mt-2">{card.value}</p>
                  </div>
                  <span className="text-3xl">{card.icon}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default ProfileA;