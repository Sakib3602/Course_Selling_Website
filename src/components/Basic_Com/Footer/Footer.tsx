"use client"

import { Facebook, Mail, MapPin, Phone, Instagram, X, ArrowUp } from "lucide-react"
import { Link } from "react-router"
import b from "../../../../public/footer_bg.png"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer
    style={{
    backgroundImage: `url(${b})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
    
    className="bg-[#222222] text-gray-100 mb-0">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section with Logo and Social Icons */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 border-b border-slate-700 pb-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[41246D] border">
              <span className="text-xl font-bold text-white">B</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">BRAND</h3>
              <p className="text-xs text-gray-400">EDUCATION</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <Link to="/" className="text-gray-400 transition hover:text-[#FFB900]">
              <Facebook size={20} />
            </Link>
            <Link to="/" className="text-gray-400 transition hover:text-[#FFB900]">
              <X size={20} />
            </Link>
            <Link to="/" className="text-gray-400 transition hover:text-[#FFB900]">
              <Instagram size={20} />
            </Link>
            <Link to="/" className="text-gray-400 transition hover:text-[#FFB900]">
              <Mail size={20} />
            </Link>
          </div>
        </div>

        {/* Three Column Section */}
        <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* About Course */}
          <div>
            <h4 className="mb-4 text-lg font-bold text-white">About Us</h4>
            <p className="text-sm leading-relaxed text-gray-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore odio fugiat natus omnis eveniet repellat molestias veniam voluptatum doloribus adipisci? Soluta officiis placeat maxime minus consequatur doloribus quidem ullam voluptate.
            </p>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="mb-4 text-lg font-bold text-white">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-[#FFB900]" />
                <p className="text-sm text-gray-400">205 West 2lth Street, MIAMI FL, USA</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0 text-[#FFB900]" />
                <p className="text-sm text-gray-400">(800) 123-4567-232</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0 text-[#FFB900]" />
                <p className="text-sm text-gray-400">info@brand.com</p>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="mb-4 text-lg font-bold text-white">Working Hours</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Monday - Friday</span>
                <span className="text-gray-300">8:00 am - 16:00 pm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Saturday</span>
                <span className="text-gray-300">10:00 am - 14:00 pm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sunday</span>
                <span className="text-gray-300">9:00 am - 12:00 pm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        {/* <div className="mb-12 border-y border-slate-700 py-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl text-red-500">✦</div>
              <h4 className="text-lg font-bold text-white">OUR NEWSLETTER</h4>
            </div>
            <div className="w-full sm:w-auto sm:flex-1 sm:max-w-md">
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="E-mail Address"
                  className="flex-1 rounded-full border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white placeholder-gray-500 transition focus:border-red-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-full bg-red-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-600"
                >
                  SUBSCRIBE NOW
                </button>
              </form>
            </div>
          </div>
        </div> */}

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-sm text-gray-400 sm:text-left">
            © 2025 <span className="text-[#FFB900]">BRAND DEMO ONE COURSE</span>. ALL RIGHTS RESERVED.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#FFB900]"
          >
            SCROLL TO TOP
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
