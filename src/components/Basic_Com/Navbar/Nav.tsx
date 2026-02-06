"use client";

import { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Slide, toast, ToastContainer } from "react-toastify";
import { AuthContext } from "@/components/Authentication_Work/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/url/useAxiosPublic";
import imglogo from "../././.././../assets/Untitled-3.png"
export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error(
      "AuthContext is not available. Wrap your app with <AuthProvider>."
    );
  }
  const { out, person } = auth;

  // Glass effect trigger on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const signO = async () => {
    await out();
    toast.error("Logged out!", {
      position: "top-center",
      autoClose: 3000,
      theme: "light",
      transition: Slide,
    });
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Carts", href: "/carts" },
  ];

  const axiosPub = useAxiosPublic();
  const { data } = useQuery({
    queryKey: ["useremail", person?.email],
    enabled: !!person?.email,
    queryFn: async () => {
      const res = await axiosPub.get(`/users/${person?.email}`);
      return res.data;
    },
  });

  if (data?.role === "admin") {
    navItems.push({ name: "Admin Dashboard", href: "/admin/dashboard" });
  }
  if (data?.role === "instructor") {
    navItems.push({ name: "Instructor Dashboard", href: "/ins/dashboard" });
  }
  if (data?.role !== "admin" && data?.role !== "instructor") {
    navItems.push({ name: "Dashboard", href: "/dashboard" });
  }

  // Elegant Gold Styling (Classy, not flashy)
  const goldBtnClass = "bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white shadow-md shadow-amber-500/20";

  return (
    <>
      <ToastContainer />
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out font-sans ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Bengal Rice Logo Section */}
            <div className="flex-shrink-0 group cursor-pointer">
              <Link to={"/"} className="flex items-center gap-2.5">
               
                
                {/* 2. Bengal Rice Logo */}
                <img 
                  src={imglogo} 
                  alt="Bengal Rice Logo" 
                  className="h-[220px] w-auto"
                />

                {/* 3. Shield Icon (Now on the RIGHT side) */}
                
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center space-x-2">
              {navItems.map((item) => (
                <Link key={item.name} to={item.href}>
                  <span className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 transition-all duration-200">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {person ? (
                <Button
                  onClick={signO}
                  variant="ghost"
                  className="rounded-full px-6  text-red-600 bg-red-50"
                >
                  Log Out
                </Button>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="rounded-full text-gray-600 hover:text-black">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register">
                    {/* The Single Gold Button */}
                    <Button className={`rounded-full px-6 py-5 font-semibold tracking-wide border-0 transition-all duration-200 ${goldBtnClass}`}>
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-screen opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
          }`}
        >
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 group transition-colors">
                  <span className="text-base font-medium text-gray-700 group-hover:text-black">
                    {item.name}
                  </span>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-amber-500" />
                </div>
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
              {person ? (
                <Button
                  onClick={signO}
                  className="w-full rounded-xl bg-red-50 text-red-600 hover:bg-red-100 h-12"
                >
                  Log Out
                </Button>
              ) : (
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button className={`w-full rounded-xl h-12 font-semibold ${goldBtnClass}`}>
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer */}
      <div className="h-20" />
    </>
  );
}