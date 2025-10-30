
import g from "../../../assets/home_bg.jpg";


const AboutUs = () => {
  return (
    <div>
      <div
        className="min-h-screen   mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center py-12 gap-8 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${g})`,
        }}
      >
        {/* Optional overlay for better text contrast */}
        {/* <div className="absolute inset-0 bg-black/30"></div> */}

        {/* Content wrapper to ensure text sits above overlay */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center j  gap-8 w-full">
          {/* Left Side - About Text */}
          <div className="text-justify lg:text-left space-y-12 lg:space-y-20 text-white lg:w-[40%]">
            <h2 className="text-sm font-bold uppercase mb-4 poppins text-white">
              About us
            </h2>
            <h2 className="text-6xl sm:text-4xl font-bold uppercase mb-4 poppins">
              Develop a passion for learning
            </h2>
            <hr className="w-[62px] h-[4px] bg-white border-none" />
            <p className="text-lg text-justify leading-relaxed">
              Education is the most powerful weapon which you can use to change
              the world. Leadership is not about a title or a designation. It’s
              about impact, influence, and inspiration. Impact involves getting
              results, influence is about spreading the passion you have for
              your work, and you have to inspire teammates and customers.
            </p>
            <div className="flex gap-6">
              <button className="border border-[#ffbb00] hover:bg-white hover:text-black text-white hove:bg-transparent px-6 py-3 rounded-lg hover:rounded-2xl transition-all duration-300 ease-in-out">
                Contact Now
              </button>
              <button className="bg-[#ffbb00] hover:bg-white  hover:text-black text-white px-6 py-3 hove:bg-transparent rounded-lg hover:rounded-2xl transition-all duration-300 ease-in-out">
                Contact Now
              </button>
            </div>
          </div>

          {/* <div>
          <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio facere debitis est exercitationem non dolores maxime nulla aut illum voluptate incidunt eligendi, odio omnis dolor temporibus? Ex eveniet recusandae atque!</h1>
        </div> */}

          {/* Right Side - Image (optional) */}
          {/* <div className="lg:w-1/2 flex justify-center">
      <img
        src={goal}
        alt="Our Goal"
        className="w-full max-w-sm rounded-2xl shadow-lg object-cover"
      />
    </div> */}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
