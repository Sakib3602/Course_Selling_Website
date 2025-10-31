"use client";

import { Menu, X, House } from "lucide-react";

interface NavbarProps {
  onMenuToggle: () => void;
  sidebarOpen: boolean;
}

export default function NavDash({ onMenuToggle, sidebarOpen }: NavbarProps) {
  return (
    <nav className="poppins bg-white border-b border-gray-200 px-4 md:px-6 py-[22px] flex items-center justify-between">
      <button
        onClick={onMenuToggle}
        className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? (
          <X className="w-6 h-6 text-black" />
        ) : (
          <Menu className="w-6 h-6 text-black" />
        )}
      </button>

      <div className="flex-1 md:flex-none">
        <div className="font-[600] text-xl md:text-2xl  text-black ">
          Dashboard
        </div>
       
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 hidden md:block">
          Welcome back!
        </span>
      </div>
    </nav>
  );
}
