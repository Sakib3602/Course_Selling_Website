"use client";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
// import Up_Nav from "../Up_Nav";
import { Link} from "react-router";

import { Slide, toast, ToastContainer } from "react-toastify";
import { AuthContext } from "@/components/Authentication_Work/AuthProvider/AuthProvider";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error(
      "AuthContext is not available. Wrap your app with <AuthProvider>."
    );
  }
  const { out, person } = auth;
  const signO = async () => {
    await out();
    toast.error("Loged out!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  };
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/" },
    { name: "Services", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Carts", href: "/carts" },
    
  ];

  return (
    <div>
      <nav className="poppins-semibold fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-2xl border-b border-black/10 ">
        {/* <Up_Nav></Up_Nav> */}
        <ToastContainer></ToastContainer>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Name - Left */}
            <div className="flex-shrink-0">
              <a href="#" className="text-2xl font-bold text-[#4D2E7D]">
                Brand
              </a>
            </div>

            {/* Navigation Items - Center (Desktop) */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center gap-8">
                {navItems.map((item) => (
                  <Link to={item.href}>
                    <p
                      className="text-black hover:text-black/70 transition-colors duration-200 font-medium text-[14px]"
                    >
                      {item.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Get Started Button - Right (Desktop) */}
            <div className="hidden md:flex items-center">
              {person ? (
                <Button
                  onClick={signO}
                  className="bg-red-800 text-white hover:!bg-[#43266d] transition-colors duration-200"
                >
                  Log Out
                </Button>
              ) : (
                <Link to={"/register"}>
                  <Button className="bg-[#4D2E7D] text-white hover:!bg-[#43266d] transition-colors duration-200">
                    Get Started
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-black hover:text-black/70 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-3 bg-white/30 backdrop-blur-2xl border-t border-black/10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-black hover:text-black/70 transition-colors duration-200 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}

            {person ? (
              <Button onClick={signO} className="w-full !bg-red-800 !text-white hover:!bg-red-900 transition-colors duration-200 mt-4">
                Log Out
              </Button>
            ) : (
              <Link to={"/register"}>
                {" "}
                <Button className="w-full !bg-[#4D2E7D] !text-white hover:!bg-[#43266d] transition-colors duration-200 mt-4">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
