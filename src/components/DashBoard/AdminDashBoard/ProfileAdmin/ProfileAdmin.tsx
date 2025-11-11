"use client"

import { useState } from "react"
import { Menu, X,MessageCircleQuestionMark,Megaphone,ShieldUser,FolderPlus, User, Users,UserCog, ShoppingCart, Settings, LogOut, ChevronDown } from "lucide-react"
import { Link, Outlet } from "react-router"

export default function ProfileAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState("dashboard")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊",
      path: "/admin/dashboard",
    },
    {
      id: "instructors",
      label: "Instructors",
      icon: <Users size={20} />,
      path: "/admin/dashboard/instructors",
    },
    {
      id: "support requests",
      label: "Support Requests",
      icon: <MessageCircleQuestionMark size={20} />,
      path: "/admin/dashboard/supportreq",
    },
    {
      id: "orders",
      label: "Pending Orders",
      icon: <ShoppingCart size={20} />,
      path: "/orders",
    },
    {
      id: "addcourses",
      label: "Add Courses",
      icon: <FolderPlus size={20} />,
      path: "/orders",
    },
    {
      id: "annaouncements",
      label: "Announcements",
      icon: <Megaphone size={20} />,
      path: "/orders",
    },
    {
      id: "premium users",
      label: "Premium Users",
      icon: <ShieldUser size={20} />,
      path: "/orders",
    },
    {
      id: "all users",
      label: "All Users",
      icon: <UserCog size={20} />,
      path: "/orders",
    },

    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ]

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
            className="hidden lg:flex text-gray-400 hover:text-white transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link to={item.path}>
            <button
              key={item.id}
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
                <p className="text-sm font-semibold text-black">John Doe</p>
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
                  JD
                </div>
                <ChevronDown size={16} className="text-gray-600 hidden sm:block" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 transition flex items-center gap-2">
                    <User size={16} /> Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 transition flex items-center gap-2">
                    <Settings size={16} /> Settings
                  </button>
                  <hr className="my-1" />
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition flex items-center gap-2">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <Outlet></Outlet>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed left-0 top-0 w-64 h-full bg-black text-white z-40 shadow-lg flex flex-col">
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
              <button
                key={item.id}
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
              </button>
            ))}
          </nav>

          <div className="border-t border-gray-800 px-4 py-6">
            <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition">
              <LogOut size={20} className="flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
