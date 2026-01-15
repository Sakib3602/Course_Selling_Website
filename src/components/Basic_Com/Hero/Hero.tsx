import { Button } from "@/components/ui/button";
import CountUp from "@/components/ui/CountUp";
import { Play, Star, ArrowRight, ShieldCheck, Crown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 min-h-screen flex items-center selection:bg-amber-100 selection:text-amber-900">
      
      {/* --- Custom CSS for Smooth Animations --- */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      {/* --- Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Warm Ambient Light */}
        <div className="absolute top-0 right-0 w-[500px] lg:w-[800px] h-[500px] lg:h-[800px] bg-gradient-to-bl from-amber-100/40 to-transparent rounded-full blur-[80px] lg:blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-gradient-to-tr from-slate-200/40 to-transparent rounded-full blur-[80px] lg:blur-[100px]" />
        
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] lg:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
        {/* Changed gap-16 to gap-12 for mobile compactness */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* --- Left Content --- */}
          <div className="text-center lg:text-left z-10 opacity-0 animate-fade-up">
            
            {/* Tag */}
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-1.5 rounded-full border border-amber-200 bg-white shadow-sm mb-6 lg:mb-8 hover:scale-105 transition-transform cursor-default">
              <Crown className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-amber-600" />
              <span className=" text-amber-700 text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase">
                Premium Membership
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-[1.15] lg:leading-[1.1] tracking-tight text-balance opacity-0 animate-fade-up delay-100">
              The Standard for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700">
                Modern Excellence.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 mb-8 lg:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal opacity-0 animate-fade-up delay-200">
              Join an elite curriculum curated by Fortune 500 leaders. 
              Refine your skills and build a portfolio that commands attention.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center opacity-0 animate-fade-up delay-300">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold hover:shadow-amber-500/30 hover:shadow-lg hover:-translate-y-0.5 rounded-sm text-base px-8 py-6 lg:py-7 transition-all duration-300"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-sm text-base px-8 py-6 lg:py-7 border-slate-300 text-slate-700 hover:text-amber-700 hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm"
              >
                <Play className="w-4 h-4 mr-2" />
                View Curriculum
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-8 mt-12 lg:mt-16 border-t border-slate-200 pt-8 opacity-0 animate-fade-up delay-300">
              <StatItem number={98} suffix="%" label="Success Rate" />
              <StatItem number={500} suffix="+" label="Elite Mentors" />
              <StatItem number={4} suffix=".9" label="Global Rating" />
            </div>
          </div>

          {/* --- Right Visual (The Card) --- */}
          {/* Added 'animate-float' for the gentle bobbing motion */}
          <div className="relative z-10 group perspective-1000 mt-8 lg:mt-0 animate-float">
            {/* Glow Blob */}
            <div className="absolute -inset-4 bg-amber-500/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
            
            <div className="relative bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 transform transition-transform duration-500 hover:scale-[1.01]">
              
              {/* Image Header */}
              <div className="relative h-56 sm:h-64 lg:h-72 w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop" 
                  alt="Premium Office" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white hover:scale-110 transition-all duration-300 border border-white/50 shadow-lg group/play">
                    <Play className="w-5 h-5 lg:w-6 lg:h-6 ml-1 text-white group-hover/play:text-amber-600 fill-current transition-colors" />
                  </div>
                </div>

                <div className="absolute top-4 left-4 z-20">
                   <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-amber-800 text-[10px] uppercase tracking-widest font-bold rounded-sm shadow-sm">
                      Masterclass
                   </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 lg:p-8 bg-white">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2">Executive Leadership</h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 lg:w-4 lg:h-4 fill-current" />
                      ))}
                      <span className="ml-2 text-slate-400 text-xs lg:text-sm font-medium">(2.1k Reviews)</span>
                    </div>
                  </div>
                  <ShieldCheck className="w-6 h-6 lg:w-8 lg:h-8 text-slate-200" />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between text-sm font-medium text-slate-600">
                        <span>Course Progress</span>
                        <span>32%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[32%] bg-gradient-to-r from-amber-500 to-yellow-400 relative">
                             {/* Shimmer effect on bar */}
                             <div className="absolute inset-0 bg-white/30 w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 lg:mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-[10px] lg:text-xs text-slate-400 uppercase tracking-widest font-bold">Investment</span>
                      <span className="text-xl lg:text-2xl font-bold text-slate-900">$2,499</span>
                   </div>
                   <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800 font-medium px-4 lg:px-6 py-4 lg:py-5 rounded-sm shadow-lg shadow-slate-200">
                      Access Now
                   </Button>
                </div>
              </div>
            </div>
            {/* REMOVED: Floating Bottom Right Badge */}
          </div>

        </div>
      </div>
    </section>
  );
}

// Optimized Stats Component (Responsive Text Sizes)
interface StatItemProps {
  number: number;
  suffix: string;
  label: string;
}

function StatItem({ number, suffix, label }: StatItemProps) {
  return (
    <div className="text-center lg:text-left">
      <div className="text-3xl sm:text-4xl font-light text-slate-900 mb-1 tabular-nums tracking-tight">
        <CountUp
          from={0}
          to={number}
          separator=","
          direction="up"
          duration={1.5}
        />
        <span className="text-amber-600 font-normal">{suffix}</span>
      </div>
      <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-semibold">
        {label}
      </div>
    </div>
  );
}