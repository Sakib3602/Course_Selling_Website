"use client"

import type React from "react"

import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Chrome } from "lucide-react"
import { Slide, ToastContainer, toast } from "react-toastify"
import { Link, useNavigate } from "react-router"
import Nav from "@/components/Basic_Com/Navbar/Nav"
import Footer from "@/components/Basic_Com/Footer/Footer"
import { AuthContext } from "../AuthProvider"
import { useMutation } from "@tanstack/react-query"
import useAxiosPublic from "@/url/useAxiosPublic"

type I = {
  email: string;
  name: string;
  role: string;
};
export function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const auth = useContext(AuthContext)

  if (!auth) {
    throw new Error("AuthContext is not available")
  }

  const {SignNow , GoogleS} = auth

  const navigate = useNavigate()





  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      toast.error("Please fill in all fields!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Slide,
      })
      return
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Slide,
      })
      return
    }

    try {
      // Add your login logic here
      await SignNow(email, password)
      const res = await axiosPub.post("/jwt", { email },{ withCredentials: true })

      console.log(res.data)  

      toast.success("Log in successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      
      setTimeout(()=>{
        navigate("/")
      },1000)
    } catch (error) {
      toast.error("Login failed. Please check your credentials.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Slide,
      });
      console.error(error)
    }
  }


  const axiosPub = useAxiosPublic()
  const { mutateAsync } = useMutation({
    mutationFn: async (newUser: I) => {
      const response = await axiosPub.post("/users", newUser);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Welcome To Our World!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      
      setTimeout(() => {
        navigate("/");
      }, 1500);
    },
    onError: (error: any) => {
      // Check if user already exists - if so, just navigate to home
      if (error?.response?.status === 400 || error?.response?.data?.message?.includes("already exists")) {
        toast.success("Welcome Back!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Slide,
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
        return;
      }

      // For other errors, show error message
      const errorMsg = error?.response?.data?.message || "Failed to save user data. Please try again.";
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Slide,
      });
      console.error("User registration error:", error?.response?.data || error);
    },
  });

  const GO = async () => {
    try {
      const result = await GoogleS()
      const user = result.user;

      const name = user.displayName;
      const email = user.email;

      const u: I = {
        name: name || "Unknown",
        email: email || "",
        role: "user",
      };

      await mutateAsync(u);
    } catch (error) {
     
      console.error("Google login error:", error);
    }
  };

  return (
    <div>
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
      <Nav></Nav>

      <div className="flex min-h-screen bg-background ">

        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Sign In</h2>
              <p className="text-muted-foreground">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 border-input bg-background"
                />
              </div>

              {/* Password with toggle */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-11 border-input bg-background pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <Button type="submit" className="w-full h-11 bg-[#41246D] hover:bg-[#281347] text-white font-medium">
                Sign In
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
              onClick={GO}
                type="button"
                variant="outline"
                className="w-full h-11 border-input hover:bg-accent bg-transparent"
              >
                <Chrome className="w-5 h-5 mr-2" />
                Sign in with Google
              </Button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>


        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
          <img
            src="https://images.unsplash.com/photo-1608324777753-5d2f6e547b1b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=940"
            alt="Login"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex flex-col justify-center items-start p-12 text-white">
            <h1 className="text-5xl font-bold mb-6 text-balance">Welcome Back</h1>
            <p className="text-lg text-gray-200 mb-8 max-w-md leading-relaxed">
              Sign in to your account and access all the features you love. Your secure login keeps your data protected.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span className="text-gray-100">Secure authentication</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span className="text-gray-100">One-click social login</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span className="text-gray-100">Privacy-first approach</span>
              </div>
            </div>
          </div>
        </div>

        
      </div>
      <Footer></Footer>
    </div>
  )
}
