"use client"
import { Facebook } from "lucide-react"
import { useContext } from "react";
import { AuthContext } from "../Authentication_Work/AuthProvider/AuthProvider";

const Up_Nav = () => {
    const auth = useContext(AuthContext)
    if (!auth) {
    throw new Error(
      "AuthContext is not available. Wrap your app with <AuthProvider>."
    );
  }
    const {person} = auth

    return (
        <div className="poppins-light h-[55px] px-5 bg-[#41246D] text-white poppins-semibold text-[12px] flex justify-between items-center">
            <div className="flex gap-4 pr-4">
                <p className="hidden md:flex">HotLine: +123 456 7890</p>
                {
                    person ? <p>Welcome, {person.email}</p> : <p>No User Logged In</p>
                }
                {/* <p>Email: example@x.com</p> */}
            </div>

            <div className="flex gap-4">
                <Facebook />
                <Facebook />
            </div>
            
        </div>
    );
};

export default Up_Nav;
