import React, { useContext, useState } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  LogOut,
  Bell,
  Menu,
  X,
  Book,
  FileText,
  Loader2
} from "lucide-react";
import { Outlet, Link, Navigate, useLocation } from "react-router";
import { AuthContext } from "@/components/Authentication_Work/AuthProvider/AuthProvider";
import useAxiosPublic from "@/url/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";



const InsHome: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const auth = useContext(AuthContext)
  if(!auth){
    throw new Error("AuthContext is undefined. Make sure you are using AuthProvider.")
  }
  const {person } = auth
  const axiosPub = useAxiosPublic()
  const {data, isLoading} = useQuery({
    queryKey: ['useremail', person?.email],
    queryFn : async ()=>{
      const res = await axiosPub.get(`/users/${person?.email}`);
      return res.data;
    },
    enabled: !!person?.email
  })

  if(isLoading){
    return (
      <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-200 rounded-full blur-xl opacity-40 animate-pulse"></div>
          <div className="relative bg-white p-4 rounded-2xl shadow-sm border border-indigo-50">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
          </div>
        </div>
        <div className="text-center space-y-2 mt-2">
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">
            Loading Content
          </h3>
          <p className="text-sm text-gray-500 font-medium animate-pulse">
            Please wait while we fetch your data...
          </p>
        </div>
      </div>
    </div>
    );
  }

  if(data?.role !== "instructor"){
    return <Navigate to="/" />;
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-16 px-6 bg-slate-950">
            <Link to={"/"}>
            <span className="text-xl font-bold tracking-wider text-white">
              Edu<span className="text-indigo-400">Pro</span>
            </span>
            </Link>
            <button onClick={toggleSidebar} className="lg:hidden text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {[
              { name: "Dashboard", icon: LayoutDashboard, path: "/ins/dashboard" },
              { name: "My Students", icon: Users, path: "/ins/dashboard/students" },
              { name: "Add Task", icon: Book, path:"/ins/dashboard/task" },
              { name: "Submitted Tasks", icon: FileText, path:"/ins/dashboard/submitted" },
              { name: "Add Courses", icon: BookOpen, path: "/ins/dashboard/add" },
            ].map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        ></div>
      )}

      <div className="flex-1 flex flex-col">
        <header className="h-20 py-4 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
            <div className="">
            <h1 className="text-2xl font-bold text-gray-900">Instructor Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Here is what's happening with your courses today.</p>
          </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-gray-900">Dr. Emily</p>
                    <p className="text-xs text-gray-500">Instructor</p>
                </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                DE
              </div>
            </div>
          </div>
        </header>

        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default InsHome;