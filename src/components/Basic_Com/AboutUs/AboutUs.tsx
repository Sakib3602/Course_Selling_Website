import { ArrowRight, CheckCircle2, Trophy, Users, Zap } from "lucide-react";
import g from "../../../assets/home_bg.jpg"; // Keep your import

const AboutUs = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* --- Background with Parallax & Overlay --- */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${g})` }}
      ></div>
      {/* Heavy overlay to ensure text readability and premium dark look */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-900/90"></div>
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* --- Left Content: Typography --- */}
          <div className="space-y-8">
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase">
                Our Story
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Develop a passion for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                Limitless Learning.
              </span>
            </h2>

            <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></div>

            <div className="space-y-6 text-lg text-slate-300 font-light leading-relaxed">
              <p>
                Education is the most powerful weapon which you can use to change
                the world. Leadership is not about a title or a designation. It’s
                about impact, influence, and inspiration.
              </p>
              <p>
                Impact involves getting results, influence is about spreading the 
                passion you have for your work, and inspiring teammates and customers.
              </p>
            </div>

            {/* Checklist Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
               {['Global Certification', 'Expert Mentors', 'Lifetime Access', 'Career Support'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                     <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                     <span className="text-slate-200 text-sm font-medium">{item}</span>
                  </div>
               ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="group bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-sm font-semibold hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 flex items-center gap-2">
                Contact Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-sm font-medium text-slate-300 border border-slate-700 hover:border-amber-500/50 hover:text-white hover:bg-amber-500/10 transition-all duration-300">
                Read More
              </button>
            </div>
          </div>

          {/* --- Right Visual: Glassmorphic Feature Grid --- */}
          {/* Instead of just one image, we make a premium grid layout */}
          <div className="relative">
             {/* Decorative Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-500/10 rounded-full blur-[100px]"></div>
             
             <div className="grid grid-cols-2 gap-4 relative z-10">
                {/* Card 1 */}
                <div className="col-span-2 bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-2xl hover:border-amber-500/30 transition-colors group">
                   <div className="bg-slate-800/50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors duration-500">
                      <Trophy className="w-6 h-6 text-amber-500 group-hover:text-white" />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">Award Winning</h3>
                   <p className="text-slate-400 text-sm">Recognized globally for excellence in education and leadership training.</p>
                </div>

                {/* Card 2 */}
                <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-2xl hover:border-amber-500/30 transition-colors group">
                    <div className="bg-slate-800/50 w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors duration-500">
                      <Users className="w-5 h-5 text-amber-500 group-hover:text-white" />
                   </div>
                   <h3 className="text-lg font-bold text-white mb-1">Community</h3>
                   <p className="text-slate-400 text-xs">Join 50k+ learners.</p>
                </div>

                {/* Card 3 */}
                <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-2xl hover:border-amber-500/30 transition-colors group">
                    <div className="bg-slate-800/50 w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors duration-500">
                      <Zap className="w-5 h-5 text-amber-500 group-hover:text-white" />
                   </div>
                   <h3 className="text-lg font-bold text-white mb-1">Fast Track</h3>
                   <p className="text-slate-400 text-xs">Accelerated learning.</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;