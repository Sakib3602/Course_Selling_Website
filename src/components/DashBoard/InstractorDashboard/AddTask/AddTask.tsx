import React, { useState } from "react";
import {
  BookOpen,
  Link as LinkIcon,
  Type,
  PlusCircle,
  Send,
} from "lucide-react";
import useAxiosPublic from "@/url/useAxiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Slide, toast, ToastContainer } from "react-toastify";

const AddTask: React.FC = () => {
  const axiosPublic = useAxiosPublic();

  // Types
  interface Course {
    _id: string;
    title: string;
  }

  interface NewTaskForm {
    courseId: string;
    title: string;
    link: string;
  }

  interface NewTask extends NewTaskForm {
    postedAt: string;
    mail: string[];
  }

  const { data } = useQuery<Course[]>({
    queryKey: ["instructorTasks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/insCourse");
      return res.data as Course[];
    },
  });
  console.log(data);

  const myCourses =
    data?.map((x: Course) => ({
      id: x._id,
      name: x.title,
    })) ?? [];

  // 2. State for form fields
  const [formData, setFormData] = useState<NewTaskForm>({
    courseId: "",
    title: "",
    link: "",
  });

  // Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.courseId || !formData.title || !formData.link) {
      alert("Please fill in all fields");
      return;
    }

    // --- CONSOLE LOG AS REQUESTED ---
    console.log("Submitting Task Data:", {
      ...formData,
      postedAt: new Date().toISOString(),
    });

    // Reset form (optional)
    const allDta: NewTask = {
      ...formData,
      postedAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      mail: [],
    };
    console.log(allDta);
    mutateTask.mutate(allDta);

    setFormData({ courseId: "", title: "", link: "" });
  };
  const mutateTask = useMutation({
    mutationFn: async (newTask: NewTask) => {
      const response = await axiosPublic.post("/tasks", newTask);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Task posted successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
        transition: Slide,
      });
    },
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 p-6 flex items-center gap-3">
          <div className="p-2 bg-indigo-500 rounded-lg text-white">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Post New Task</h2>
            <p className="text-slate-400 text-sm">
              Assign work to enrolled students
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 1. Course Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Select Course
            </label>
            <div className="relative">
              <select
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-3 pr-8 transition-colors"
                required
              >
                <option value="" disabled>
                  -- Choose a course --
                </option>
                {myCourses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
              {/* Custom Arrow Icon */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* 2. Task Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Type className="w-4 h-4 text-indigo-600" />
              Task Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Implement Authentication Middleware"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3"
              required
            />
          </div>

          {/* 3. Task Link */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-indigo-600" />
              Resource / Reference Link
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://docs.github.com/..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-3 transition-all shadow-md hover:shadow-lg"
          >
            <Send className="w-4 h-4" />
            Publish Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
