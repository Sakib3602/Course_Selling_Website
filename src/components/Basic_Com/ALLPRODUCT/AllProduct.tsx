import { Link } from "react-router";
import Card from "../Card/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
   const {data , isLoading , refetch} = useQuery({
    queryKey : ["all-courses"],
    queryFn : async()=>{
      const res = await axios.get('http://localhost:3000/courses')
      return res.data;
    }
  })

  
  data?.map((x : Course)=>{
    console.log(x);
  })
  const sampleCourse = {
    id: "1",
    title: "Sample Course",
    instructor: "John Doe",
    thumbnail:
      "https://media.istockphoto.com/id/1290864946/photo/e-learning-education-concept-learning-online.jpg?s=612x612&w=0&k=20&c=y1fQ-3wbsvdDaMn-cuHPibcgozOxKQS99mIgz6DFcVA=",
    price: 49.99,
    rating: 4.5,
    reviewCount: 120,
    description: "This is a sample course description.",
    duration: "3h 30m",
    level: "Beginner",
    language: "English",
  };

 


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

      <div className="flex sm:flex-col md:flex-row lg:flex-row gap-6 flex-wrap justify-center">
        {
          data?.map((x : Course)  => <Link to={`/d/${x._id}`}><Card key={x._id} course={x}></Card></Link>)
        }
        {/* <Link to={"/d/1"}>
        <Card course={sampleCourse} />
        </Link>
        <Card course={sampleCourse} />
        <Card course={sampleCourse} />
        <Card course={sampleCourse} /> */}
      </div>
    </div>
  );
};

export default AllProduct;
