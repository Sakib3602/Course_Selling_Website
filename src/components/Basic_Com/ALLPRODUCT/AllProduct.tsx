import { Link } from "react-router";
import Card from "../Card/Card";
import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "@/url/useAxiosPublic";

interface Course {
  _id: string;
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  price: number;
  rating: number;
  students: number;
  image: string;
  instructor: string;
  duration: string;
  level: string;
  curriculum: string[];
  whatYouLearn: string[];
}

const AllProduct = () => {
  //
  //
  //
  //
  //
  //
  //

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  const axiosPub = useAxiosPublic();
  const { data } = useQuery({
    queryKey: ["all-courses"],
    queryFn: async () => {
      const res = await axiosPub.get("/courses");
      return res.data;
    },
  });

  data?.map((x: Course) => {
    console.log(x);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-32 ">
      <div className="mb-10 md:ml-4 lg:ml-20">
        <h2 className="text-sm font-bold uppercase mb-4 poppins">
          Online Learning
        </h2>
        <h2 className="text-2xl font-bold uppercase mb-4 poppins">
          Popular Courses
        </h2>
        <hr className="w-[62px] h-[4px] bg-gray-500 " />
      </div>

      <div className="flex sm:flex-col md:flex-row lg:flex-row gap-2 flex-wrap justify-center">
        {data ? (
          data.map((x: Course) => (
            <Link key={x._id} to={`/d/${x._id}`}>
              <Card course={x}></Card>
            </Link>
          ))
        ) : (
          <div className="flex gap-6 flex-wrap justify-center">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-[380px] h-[400px] bg-gray-200 animate-pulse rounded-xl"
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProduct;
