"use client"

import { Facebook, Mail, MapPin, Phone, Instagram, X, ArrowUp,  ArrowRight } from "lucide-react"
import { Link } from "react-router" // Ensure this matches your router package
import b from "../../../../public/footer_bg.png" // Keep your image import

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-[#050505] text-slate-300 pt-20 pb-10 overflow-hidden font-sans border-t border-white/5">
      
      {/* --- Premium Background Layers --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         {/* Base Background Image with heavy overlay */}
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${b})` }}
         ></div>
         
         {/* Gradient Overlay for "Fade to Black" */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-[#050505]/80"></div>
         
         {/* Noise Texture */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
         
         {/* Gold Ambient Glows */}
         <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-800/5 rounded-full blur-[120px]"></div>
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Top Section: Logo & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 pb-12 border-b border-white/5">
          {/* EduPro Logo */}
          <div className="flex items-center gap-4 group">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-yellow-700 shadow-lg shadow-amber-900/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-2xl font-extrabold text-black font-serif">B</span>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">EduPro</h3>
              <p className="text-[10px] font-bold text-amber-500 tracking-[0.3em] uppercase">Education</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {[Facebook, X, Instagram, Mail].map((Icon, i) => (
              <Link 
                key={i} 
                to="/" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-slate-400 hover:text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/10 hover:-translate-y-1 transition-all duration-300"
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>

        {/* Middle Section: Grid Columns */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          
          {/* Column 1: About */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-8 h-[2px] bg-amber-500"></span>
              About Us
            </h4>
            <p className="text-sm leading-7 text-slate-400 max-w-md font-light">
              We are defining the future of leadership education. Our curriculum is designed by industry experts to forge the next generation of global innovators. Excellence is not just our standard; it is our starting point.
            </p>
            
            {/* Mini Newsletter (Optional replacement for the commented out one) */}
            <div className="mt-8 relative max-w-xs">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                />
                <button className="absolute right-1 top-1 bg-amber-500 hover:bg-amber-400 text-black p-2 rounded-full transition-colors">
                  <ArrowRight size={16} />
                </button>
            </div>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4 className="mb-6 text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-amber-500"></span>
               Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-amber-600 group-hover:text-amber-400 transition-colors" />
                <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                    205 West 25th Street,<br/>Miami, FL, USA
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone size={18} className="flex-shrink-0 text-amber-600 group-hover:text-amber-400 transition-colors" />
                <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                    (800) 123-4567
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail size={18} className="flex-shrink-0 text-amber-600 group-hover:text-amber-400 transition-colors" />
                <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                    concierge@brand.com
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours */}
          <div>
            <h4 className="mb-6 text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Office Hours
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">Mon - Fri</span>
                <span className="text-slate-300">08:00 - 16:00</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">Saturday</span>
                <span className="text-slate-300">10:00 - 14:00</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">Sunday</span>
                <span className="text-amber-500/80">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-center text-xs text-slate-500 sm:text-left">
            © 2026 <span className="text-amber-500 font-bold">EduPro</span>. All rights reserved. 
            <span className="hidden sm:inline mx-2 text-slate-700">|</span> 
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </p>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-bold text-slate-400 transition hover:text-amber-400 uppercase tracking-wider"
          >
            Back to Top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all group-hover:-translate-y-1 group-hover:border-amber-500/50 group-hover:bg-amber-500/10">
                <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}