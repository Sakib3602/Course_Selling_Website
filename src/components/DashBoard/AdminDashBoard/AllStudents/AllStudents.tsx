import useAxiosPrivate from "@/url/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export interface Course {
  name: string;
  id: string;
  price: number;
  img: string;
  status: string;
  downloadLink?: string;
}

export interface Order {
  _id: string;
  courses: Course[];
  currency: string;
  email: string;
  link: string;
  orderDate: string;
  paymentStatus: string;
  totalAmount: number;
}

const AllStudents = () => {
  const axiosSec = useAxiosPrivate();
  const { data, isLoading } = useQuery({
    queryKey: ["all-students"],
    queryFn: async () => {
      const res = await axiosSec.get("/allStudents");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const uniqueStudents = data?.filter((person: Order, index: number, self: Order[]) =>
    index === self.findIndex((t) => (
      t.email === person.email
    ))
  ) || [];

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
              All Students
            </h2>
            <p className="text-gray-500 mt-1">Directory of enrolled members</p>
          </div>
          <div className="mt-4 sm:mt-0 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm">
            Total: {uniqueStudents.length}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uniqueStudents.map((x: Order) => (
            <div
              key={x._id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 border border-gray-100 flex flex-col items-center"
            >
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative w-24 h-24 p-1 rounded-full bg-white border border-gray-100">
                  <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRLRMXynnc7D6-xfdpeaoEUeon2FaU0XtPg&s'
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              
              <div className="text-center w-full">
                <h3 className="text-gray-800 font-bold text-lg truncate px-2" title={x.email}>
                  {x.email.split('@')[0]}
                </h3>
                <p className="text-gray-500 text-sm truncate px-2 mt-1" title={x.email}>
                  {x.email}
                </p>
              </div>

              <div className="mt-6 w-full pt-4 border-t border-gray-50 flex justify-center">
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                  Active Student
                </span>
              </div>
            </div>
          ))}
        </div>

        {uniqueStudents.length === 0 && (
           <div className="text-center text-gray-500 mt-20">
             No students found.
           </div>
        )}
      </div>
    </div>
  );
};

export default AllStudents;