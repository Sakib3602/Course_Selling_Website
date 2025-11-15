import { useContext, useState } from "react"
import { Menu, X, LogOut } from "lucide-react"
import { Link, Navigate, Outlet } from "react-router"
import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "@/url/useAxiosPublic"
import { AuthContext } from "@/components/Authentication_Work/AuthProvider/AuthProvider"

export default function ProfileAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState("dashboard")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const menuItems = [
    {
      id: "Home",
      label: "Home",
      icon: "🏠",
      path: "/",
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊",
      path: "/admin/dashboard",
    },
    {
      id: "instructors",
      label: "Instructors",
      icon: "👥",
      path: "/admin/dashboard/ins",
    },
    {
      id: "support requests",
      label: "Support Requests",
      icon: "❓",
      path: "/admin/dashboard/supportreq",
    },
    {
      id: "Student",
      label: "Students",
      icon: "🎓",
      path: "/admin/dashboard/students",
    },
    {
      id: "addcourses",
      label: "Add Courses",
      icon: "📁",
      path: "/admin/dashboard/addcourse",
    },
    {
      id: "annaouncements",
      label: "Announcements",
      icon: "📢",
      path: "/admin/dashboard/anc",
    },
    {
      id: "premium users",
      label: "Premium Users",
      icon: "🛡️",
      path: "/admin/dashboard/pusers",
    },
    {
      id: "all users",
      label: "All Users",
      icon: "👤",
      path: "/admin/dashboard/allusers",
    },
  ]

  const auth = useContext(AuthContext)
  if(!auth){
    throw new Error("AuthContext is undefined. Make sure you are using AuthProvider.")
  }
  const {person } = auth
  const axiosPub = useAxiosPublic()
  const {data} = useQuery({
    queryKey: ['useremail', person?.email],
    queryFn : async ()=>{
      const res = await axiosPub.get(`/users/${person?.email}`);
      return res.data;
    }
  })

  if(data?.role !== "admin"){
    return <Navigate to="/" />;
  }

  

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-40 h-full bg-black text-white transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-0 lg:w-20"
        } overflow-hidden`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-800">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-black">A</div>
              <span className="font-bold text-lg">Admin</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex text-gray-400 hover:text-white transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.id} to={item.path}>
            <button
              onClick={() => {
                setActiveMenu(item.id)
                setMobileMenuOpen(false)
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeMenu === item.id
                  ? "bg-white text-black font-semibold"
                  : "text-gray-400 hover:text-white hover:bg-gray-900"
              }`}
            >
              <span className="flex-shrink-0 text-xl">{item.icon}</span>
              {sidebarOpen && <span className="text-left">{item.label}</span>}
            </button>
            
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-800 px-4 py-6">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition">
            <LogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
          {/* Left: Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-black hover:text-gray-600 transition"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-black hidden sm:block">Admin Dashboard</h1>
          </div>

          {/* Right: User Profile */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-black">{data?.name}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-black">
                  {data?.name.slice(0,2).toUpperCase()}
                </div>
               
              </button>

              
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <Outlet></Outlet>
      </div>

      {/* Mobile Sidebar Overlay (animated) */}
      <div
        className={`fixed inset-0 z-30 lg:hidden bg-black/50 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu (animated slide-in) */}
      <div
        className={`fixed left-0 top-0 w-64 h-full bg-black text-white z-40 shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-black">A</div>
            <span className="font-bold text-lg">Admin</span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white transition">
            <X size={20} />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => {
                setActiveMenu(item.id)
                setMobileMenuOpen(false)
              }}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all w-full ${
                activeMenu === item.id
                  ? "bg-white text-black font-semibold"
                  : "text-gray-400 hover:text-white hover:bg-gray-900"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-gray-800 px-4 py-6">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition">
            <LogOut size={20} className="flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}
