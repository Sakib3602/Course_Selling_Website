import { Globe, Star, Heart, ThumbsUp } from "lucide-react";

const cards = [
  { icon: Globe, text: "Global Outreach" },
  { icon: Star, text: "Top Rated Service" },
  { icon: Heart, text: "Customer Love" },
  { icon: ThumbsUp, text: "Trusted by Many" },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  flex flex-col lg:flex-row items-center justify-center py-12 gap-8">
      {/* Left Side - About Text */}

    

      {/*  */}
      <div className="lg:w-1/2 text-justify lg:text-left space-y-12 lg:space-y-20">
        <h2 className="text-sm font-bold uppercase mb-4 poppins">About us</h2>
        <h2 className="text-2xl font-bold uppercase mb-4 poppins">
          Develop a passion for learning
        </h2>
        <hr className="w-[62px] h-[4px] bg-gray-500" />
        <p className="text-gray-800 text-lg text-justify">
          Education is the most powerful weapon which you can use to change the
          world. Leadership is not about a title or a designation. It’s about
          impact, influence inspiration. Impact involves getting results,
          influence is about spreading the passion you have for your work, and
          you have to inspire team-mates and customers.
        </p>
        <button className="bg-[#F5B417] text-white px-6 py-3 rounded-lg hover:rounded-2xl transition-all duration-300 ease-in-out">
          Contact Now
        </button>
      </div>
        {/* Right Side - Cards */}
      <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-[#41246D] shadow-lg p-6 flex flex-col items-center gap-4  hover:shadow-2xl transition-all w-full"
            >
              <Icon className="w-16 min-h-34 text-yellow-400" />
              <p className="text-center text-white font-semibold">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.{" "}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutUs;
