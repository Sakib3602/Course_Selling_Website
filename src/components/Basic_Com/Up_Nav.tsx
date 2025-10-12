"use client"
import { Facebook } from "lucide-react"

const Up_Nav = () => {
    return (
        <div className="poppins-light h-[55px] px-5 bg-[#41246D] text-white poppins-semibold text-[12px] flex justify-between items-center">
            <div className="flex gap-4 pr-4">
                <p className="hidden md:flex">HotLine: +123 456 7890</p>
                <p>Email: example@x.com</p>
            </div>

            <div className="flex gap-4">
                <Facebook />
                <Facebook />
            </div>
        </div>
    );
};

export default Up_Nav;
