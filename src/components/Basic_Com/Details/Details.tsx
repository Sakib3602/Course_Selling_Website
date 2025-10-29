import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Star,
  Clock,
  Users,
  Award,
  
} from "lucide-react";
import { useParams } from "react-router";
import Nav from "../Navbar/Nav";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/url/useAxiosPublic";

interface Course {
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

const courses: Course[] = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Master modern web development from scratch",
    fullDescription:
      "Learn HTML, CSS, JavaScript, React, Node.js, and more. This comprehensive course covers everything you need to become a full-stack web developer. Build real-world projects and get job-ready skills. You'll master front-end and back-end technologies, databases, version control, and deployment strategies used by professional developers.",
    price: 89.99,
    rating: 4.8,
    students: 12543,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop",
    instructor: "Sarah Johnson",
    duration: "42 hours",
    level: "Beginner to Advanced",
    curriculum: [
      "HTML5 & CSS3 Fundamentals",
      "JavaScript ES6+",
      "React & Modern Frontend",
      "Node.js & Express",
      "MongoDB & PostgreSQL",
      "RESTful APIs",
      "Authentication & Security",
      "Deployment & DevOps",
    ],
    whatYouLearn: [
      "Build full-stack web applications",
      "Master modern JavaScript frameworks",
      "Create RESTful APIs",
      "Work with databases",
      "Deploy applications to production",
      "Understand web security best practices",
    ],
  },
  {
    id: 2,
    title: "Python for Data Science",
    description:
      "Learn Python programming for data analysis and machine learning",
    fullDescription:
      "Dive deep into Python programming with a focus on data science. Master NumPy, Pandas, Matplotlib, and Scikit-learn. Work with real datasets and build your own machine learning models. Learn data visualization, statistical analysis, and machine learning algorithms used in industry.",
    price: 79.99,
    rating: 4.9,
    students: 8921,
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=300&fit=crop",
    instructor: "Michael Chen",
    duration: "38 hours",
    level: "Intermediate",
    curriculum: [
      "Python Fundamentals",
      "NumPy & Pandas",
      "Data Visualization with Matplotlib",
      "Statistical Analysis",
      "Machine Learning with Scikit-learn",
      "Deep Learning Basics",
      "Real-world Projects",
    ],
    whatYouLearn: [
      "Analyze data with Python",
      "Create data visualizations",
      "Build machine learning models",
      "Work with popular data science libraries",
      "Handle real-world datasets",
      "Apply statistical methods",
    ],
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    description: "Design beautiful and user-friendly interfaces",
    fullDescription:
      "Learn the principles of great design. Master Figma, create stunning user interfaces, conduct user research, and build prototypes. Perfect for aspiring designers and developers. Learn design thinking, user psychology, and create portfolios that stand out.",
    price: 69.99,
    rating: 4.7,
    students: 6789,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
    instructor: "Emily Rodriguez",
    duration: "28 hours",
    level: "Beginner",
    curriculum: [
      "Design Principles",
      "User Research Methods",
      "Wireframing & Prototyping",
      "Figma Mastery",
      "Visual Design",
      "Interaction Design",
      "Usability Testing",
      "Portfolio Creation",
    ],
    whatYouLearn: [
      "Design user-centered interfaces",
      "Conduct user research",
      "Create prototypes in Figma",
      "Apply design principles",
      "Test and iterate designs",
      "Build a professional portfolio",
    ],
  },
  {
    id: 4,
    title: "Mobile App Development with React Native",
    description: "Build iOS and Android apps with one codebase",
    fullDescription:
      "Create cross-platform mobile applications using React Native. Learn navigation, state management, API integration, and deploy to both App Store and Google Play. Master mobile-specific features like push notifications, camera access, and offline storage.",
    price: 94.99,
    rating: 4.6,
    students: 5432,
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop",
    instructor: "David Kim",
    duration: "35 hours",
    level: "Intermediate",
    curriculum: [
      "React Native Fundamentals",
      "Navigation & Routing",
      "State Management",
      "API Integration",
      "Native Features",
      "Push Notifications",
      "App Store Deployment",
      "Performance Optimization",
    ],
    whatYouLearn: [
      "Build cross-platform mobile apps",
      "Implement navigation",
      "Manage app state",
      "Integrate APIs",
      "Access device features",
      "Deploy to app stores",
    ],
  },
  {
    id: 5,
    title: "Digital Marketing Fundamentals",
    description: "Master SEO, social media, and content marketing",
    fullDescription:
      "Learn how to grow your business online. Master SEO strategies, social media marketing, email campaigns, and analytics. Get practical skills to drive traffic and conversions. Learn paid advertising, content strategy, and how to measure marketing ROI.",
    price: 59.99,
    rating: 4.5,
    students: 9876,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
    instructor: "Alex Martinez",
    duration: "25 hours",
    level: "Beginner",
    curriculum: [
      "SEO Best Practices",
      "Social Media Marketing",
      "Content Marketing",
      "Email Campaigns",
      "Google Analytics",
      "Paid Advertising",
      "Conversion Optimization",
      "Marketing Strategy",
    ],
    whatYouLearn: [
      "Optimize for search engines",
      "Create social media campaigns",
      "Build email marketing funnels",
      "Analyze marketing data",
      "Run paid advertising",
      "Develop marketing strategies",
    ],
  },
  {
    id: 6,
    title: "Advanced JavaScript & TypeScript",
    description: "Deep dive into modern JavaScript and TypeScript",
    fullDescription:
      "Master advanced JavaScript concepts including closures, promises, async/await, and more. Learn TypeScript for type-safe applications and enterprise-level development. Understand design patterns, functional programming, and build scalable applications.",
    price: 84.99,
    rating: 4.9,
    students: 7654,
    image:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500&h=300&fit=crop",
    instructor: "Jessica Taylor",
    duration: "32 hours",
    level: "Advanced",
    curriculum: [
      "Advanced JavaScript Concepts",
      "TypeScript Fundamentals",
      "Async Programming",
      "Design Patterns",
      "Functional Programming",
      "Testing & Debugging",
      "Performance Optimization",
      "Enterprise Development",
    ],
    whatYouLearn: [
      "Master advanced JS concepts",
      "Write type-safe code with TypeScript",
      "Apply design patterns",
      "Use functional programming",
      "Optimize code performance",
      "Build enterprise applications",
    ],
  },
];



const Details = () => {
  
  const { id } = useParams();

  console.log(id)

  const axiosPub = useAxiosPublic()
   const {data : course  } = useQuery({
    queryKey : ["all-courses-single", id],
    queryFn : async()=>{
      const res = await axiosPub.get(`/single/${id}`)
      return res.data;
    }
  })

  console.log(course,"single")

  

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
         
        </div>
      </div>
    );
  }



  return (
    <div>
      <Nav></Nav>
      <div className="poppins min-h-screen bg-background  md:mt-20 lg:mt-0  md:max-w-7xl sm:p-0 md:mx-auto md:px-4  lg:px-8 pt-16 pb-20 lg:pt-20 lg:pb-32">
        {/* Hero Section */}
        <div className="relative h-96 bg-card border-b">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${course.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/70" />
          </div>

          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
            

            <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl">
              {course.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="font-semibold text-lg">{course.rating}</span>
                <span className="text-muted-foreground">rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {/* <span className="font-semibold text-lg">
                  {course.students.toLocaleString()}
                </span> */}
                <span className="text-muted-foreground">students</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">{course.level}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Course Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <section>
                <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {course.fullDescription}
                </p>
              </section>

              {/* What You'll Learn */}
              <section>
                <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.whatYouLearn.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-card p-4 rounded-lg border"
                    >
                      <span className="text-primary mt-1 text-xl">✓</span>
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Curriculum */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
                <div className="space-y-3">
                  {course.curriculum.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 bg-card p-4 rounded-lg border"
                    >
                      <span className="text-primary font-bold text-lg min-w-[32px]">
                        {index + 1}.
                      </span>
                      <span className="text-foreground font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Instructor */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Your Instructor</h2>
                <div className="bg-card p-6 rounded-lg border">
                  <p className="text-xl font-semibold">{course.instructor}</p>
                  <p className="text-muted-foreground mt-2">
                    Expert instructor with years of experience in the field
                  </p>
                </div>
              </section>
            </div>

            {/* Right Column - Purchase Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 bg-card border rounded-lg p-6 shadow-lg">
                <div className="aspect-video w-full bg-muted rounded-lg mb-4 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-4xl font-bold text-primary mb-6">
                  ${course.price}
                </p>

                <div className="space-y-3">
                  <Button className="w-full text-lg h-12">Buy Now</Button>
                  <Button variant="outline" className="w-full text-lg h-12">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t space-y-3">
                  <h3 className="font-semibold mb-3">This course includes:</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration} of content</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Award className="h-4 w-4" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Lifetime access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
