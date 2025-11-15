import useAxiosPrivate from "@/url/useAxiosPrivate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Slide, toast, ToastContainer } from "react-toastify";

const AllUsers = () => {
  const axiosPrivate = useAxiosPrivate();

  const { data, isLoading ,refetch} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/Onlyusers");
      return res.data;
    },
  });

  console.log(data);

  const handleUpdateRole = (userId: string) => {
    // Implement role update logic here
    console.log("Update role for user:", userId);
    mutationUp.mutate(userId);
  };

  const mutationUp = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosPrivate.patch(`/roleChange/${id}`, {
        role: "instructor",
      });
      return res.data;
    },
    onSuccess: () => {
    refetch();
      toast.success("Role updated successfully!", {
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

  //

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/3" />
          <div className="h-6 bg-gray-300 rounded w-full" />
          <div className="h-6 bg-gray-300 rounded w-full" />
          <div className="h-6 bg-gray-300 rounded w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
    <ToastContainer></ToastContainer>
      <div className="bg-white shadow rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 hidden md:table">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleUpdateRole(user?._id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-black hover:bg-black-700  focus:outline-none"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="md:hidden divide-y">
          {data?.map((user) => (
            <div key={user.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {user.role} • {user.email}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleUpdateRole(user?._id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-black hover:bg-black-700 focus:outline-none"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
