import useAxiosPrivate from "@/url/useAxiosPrivate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
type CourseF = {
  _id: string;
  title: string;
  instructor: string;
  priceUSD: string;
  priceBDT: string;
  rating: string;
  students: string;
  duration: string;
  level: string;
  image: string;
  description: string;
  fullDescription: string;
  curriculum: string[];
  whatYouLearn: string[];
};
const ManageCourses = () => {
  const axiosPrivate = useAxiosPrivate();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["manage-courses"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/manage-courses");
      return res.data;
    },
  });
  console.log(data);
  const DeleteData = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateDel.mutate(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const mutateDel = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosPrivate.delete(`/manage-courses/${id}`);
      return res.data;
    },
    onSuccess: () => {
      refetch();
    },
  });


  if (isLoading) {
    return (
      <div className="p-10 h-full bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden w-full animate-pulse flex flex-col">
        {/* Image Placeholder */}
        <div className="h-48 w-full bg-gray-300" />

        {/* Content Placeholder */}
        <div className="p-5 flex-1">
          {/* Title Lines (simulating 2 lines of text) */}
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4" />

          {/* Subtitle/Text Line */}
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>

        {/* Buttons Placeholder */}
        <div className="p-5 pt-0 flex gap-3 mt-auto">
          <div className="flex-1 h-10 bg-blue-200 rounded-lg" />{" "}
          {/* Lighter blue to hint at button color */}
          <div className="flex-1 h-10 bg-red-200 rounded-lg" />{" "}
          {/* Lighter red to hint at button color */}
        </div>
      </div>
    );
  }
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((x: CourseF) => (
        <div
          key={x?._id || x?.title}
          className="group relative bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden w-full hover:shadow-xl transition-all duration-300"
        >
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={x?.image}
              alt={x?.title || "Course image"}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="p-5">
            <h3
              className="text-xl font-bold text-gray-800 mb-2 line-clamp-2"
              title={x?.title}
            >
              {x?.title}
            </h3>
            <p className="text-sm text-gray-500">
              Click below to manage this course.
            </p>
          </div>

          <div className="p-5 pt-0 flex gap-3 mt-auto">
    <Link to={"/admin/dashboard/updateCourse"} state={{courseData: x}}>
    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
              Update
            </button>
            
            </Link>
            <button
              onClick={() => DeleteData(x?._id)}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageCourses;
