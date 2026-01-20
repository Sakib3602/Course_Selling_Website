
import useAxiosPrivate from "@/url/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";


interface User {
  _id: string;
  name: string;
  email: string;
  Premium: boolean; // The property we are filtering by
  img?: string;     // Optional image
}

const PremiumUsers = () => {
  const axiosPriv = useAxiosPrivate();
  
 
  const { data, isLoading } = useQuery({
    queryKey: ["premium-userss"],
    queryFn: async () => {
      const res = await axiosPriv.get("/usersss"); 
      return res.data;
    },
  });
  console.log(data)

  // 2. Filter Logic: Only keep users where Premium is true
  const premiumUsers = data?.filter((user: User) => user.Premium === true) || [];

  if (isLoading) {
    return <div className="p-10 text-center">Loading premium users...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Premium Users</h2>
          <span className="bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full border border-amber-200">
            Count: {premiumUsers.length}
          </span>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {premiumUsers.map((user: User) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    {/* User Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover bg-gray-200"
                            src={user.img || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                            alt={user.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name || "Unknown Name"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Email Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>

                    {/* Status Column (Premium Badge) */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900">
                        <svg className="mr-1.5 h-3 w-3 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.699-3.181a1 1 0 011.827.954L17.412 7.73l2.827 2.122a1 1 0 01.361.768v8.38a1 1 0 01-1 1H4.4a1 1 0 01-1-1v-8.38a1 1 0 01.361-.768l2.827-2.122-1.07-3.952a1 1 0 011.827-.954l1.699 3.181L10 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Premium
                      </span>
                    </td>

                    {/* Generic Role Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Member
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {premiumUsers.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No premium users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PremiumUsers;