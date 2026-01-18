"use client"

import type React from "react"
import { User, BookOpen, Bell, HelpCircle, LogOut ,Logs,Home} from "lucide-react"
import { useNavigate } from "react-router"
import { useContext } from "react"
import { AuthContext } from "@/components/Authentication_Work/AuthProvider/AuthProvider"


interface SidebarProps { 
  isOpen: boolean
  onClose: () => void
}

interface NavItem {
  id: string
  path: string
  icon: React.ReactNode
  label: string
}

const navItems: NavItem[] = [
  { id: "home", path: "/", icon: <Home className="w-5 h-5" />, label: "Home" },
  { id: "profile", path: "/dashboard", icon: <User className="w-5 h-5" />, label: "Profile" },
  { id: "courses", path: "/dashboard/courses", icon: <BookOpen className="w-5 h-5" />, label: "Enrolled Courses" },
  { id: "premium", path: "/dashboard/premium", icon: <BookOpen className="w-5 h-5" />, label: "MemberShip Facility" },
  { id: "announcements", path: "/dashboard/announcements", icon: <Bell className="w-5 h-5" />, label: "Announcements" },
  { id: "tasks", path: "/dashboard/tasks", icon: <Logs className="w-5 h-5" />, label: "Tasks" },
  { id: "Task Review", path: "/dashboard/task-review", icon: <Logs className="w-5 h-5" />, label: "Tasks Review" },
  { id: "helpdesk", path: "/dashboard/helpdesk", icon: <HelpCircle className="w-5 h-5" />, label: "Support" },
]

export default function SideDash({ isOpen, onClose }: SidebarProps) {
  const auth = useContext(AuthContext)
  if(!auth){
    throw new Error("AuthContext is undefined. Make sure you are using AuthProvider.")
  }
  const {out} = auth
  const navigate = useNavigate()

  const handleNavClick = (path: string) => {
    navigate(path)
    if (window.innerWidth < 768) {
      onClose()
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative
          left-0 top-0 h-full
          w-64 bg-white text-black
          transform transition-transform duration-300 ease-in-out
          md:transform-none md:translate-x-0
          z-40
          overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="poppins font-extrabold text-2xl text-black">EduPro</h2>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
                transition-colors duration-200
                text-black hover:bg-gray-100 active:bg-gray-200"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-4 border-t border-gray-200 my-4" />

        {/* Logout Button */}
        <div className="p-4">
          <button
            onClick={() => {
              out()
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
              bg-red-50 text-red-600 hover:bg-red-100
              transition-colors duration-200 font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
