import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="relative">
        {/* Background Decorative Element */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="relative text-center">
          {/* Large 404 Text with Gradient */}
          <h1 className="text-[150px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 tracking-tighter">
            404
          </h1>
          
          {/* Animated SVG Icon */}
          <div className="flex justify-center -mt-8 mb-6">
             <div className="p-4 bg-white rounded-2xl shadow-2xl transform -rotate-12 animate-bounce">
                <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
             </div>
          </div>

          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Lost in Space?
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
            The page you are looking for has floated away into the void. Let's get you back to solid ground.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Take Me Home
            </Link>
            
            
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <p className="absolute bottom-8 text-gray-400 text-sm font-medium">
        Error Code: <span className="text-red-400 font-mono">NS_UR_404_VOID</span>
      </p>
    </div>
  );
};

export default NotFound;