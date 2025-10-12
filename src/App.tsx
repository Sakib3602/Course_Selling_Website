import AboutUs from "./components/Basic_Com/AboutUs/AboutUs";
import AllProduct from "./components/Basic_Com/ALLPRODUCT/AllProduct";
// import Details from "./components/Basic_Com/Details/Details";
import Hero from "./components/Basic_Com/Hero/Hero";
import Nav from "./components/Basic_Com/Navbar/Nav";

function App() {
  return (
    <>
      <div className="min-h-screen w-full bg-[#f8fafc] relative">
        {/* Bottom Fade Grid Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
      `,
            backgroundSize: "20px 30px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
          }}
        />
        {/* Your Content/Components */}
        <div className="relative z-10">
          <Nav></Nav>
          <Hero></Hero>
          <AboutUs></AboutUs>
          <AllProduct></AllProduct>
         
        </div>
      </div>
    </>
  );
}

export default App;
