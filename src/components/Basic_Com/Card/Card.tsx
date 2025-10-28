"use client"

import { Star, Clock, BarChart3, Globe } from "lucide-react"

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

interface CourseCardProps {
  course: Course
}

export default function Card({ course }: CourseCardProps) {
  const fullStars = Math.floor(course.rating)
  const hasHalfStar = course.rating % 1 >= 0.5

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 max-w-md hover:-translate-y-1 cursor-pointer">
      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={ "/placeholder.svg"}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-xl text-gray-900 leading-tight">{course.title}</h3>

        {/* Instructor and Price */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            by <span className="font-medium text-gray-900">{course.instructor}</span>
          </span>
          <span className="text-lg font-bold text-gray-900">
            {typeof course.price === "number" ? `$${course.price}` : course.price}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < fullStars
                    ? "fill-amber-400 text-amber-400"
                    : i === fullStars && hasHalfStar
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
          <span className="text-sm text-gray-500">00</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{course.description}</p>

        {/* Course Meta */}
        <div className="flex items-center gap-4 pt-2 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-amber-500" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BarChart3 className="h-4 w-4 text-amber-500" />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="h-4 w-4 text-amber-500" />
            <span>00</span>
          </div>
        </div>
      </div>
    </div>
  )
}
