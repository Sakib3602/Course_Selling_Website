import { AuthContext } from "@/components/Authentication_Work/AuthProvider/AuthProvider";
import useAxiosPublic from "@/url/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const EnrolledCourses = () => {
  const axiosPub = useAxiosPublic();
  const auth = useContext(AuthContext);
  
  if (!auth) {
    throw new Error("AuthContext is undefined");
  }
  
  const { person } = auth;
  
  const { data, isLoading } = useQuery({
    queryKey: ["enrolledCourses", person?.email],
    queryFn: async () => {
      const res = await axiosPub.get(`/enrolled/${person?.email}`);
      return res.data;
    },
  });

  console.log(data);

  return (
    <div className="flex justify-start items-start gap-6 flex-wrap py-6 px-4">
      {isLoading && <p>Loading...</p>}
      
      {data && data.length > 0 ? (
        data.map((course: any, index: number) => (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden w-full max-w-sm mx-auto transition hover:shadow-lg"
          >
            <img
              src={course.img}
              alt={course.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-slate-900">
                {course.title}
              </h3>

              <p className="text-sm text-slate-600">
                {course.description}
              </p>

              <span className="text-sm font-medium text-amber-500 underline cursor-pointer w-full block">
                Continue Learning
              </span>
            </div>
          </div>
        ))
      ) : (
         <p>No enrolled courses found.</p>
      )}
    </div>
  );
};

export default EnrolledCourses;