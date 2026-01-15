import AboutUs from "./components/Basic_Com/AboutUs/AboutUs";
import AllProduct from "./components/Basic_Com/ALLPRODUCT/AllProduct";
import Faq from "./components/Basic_Com/FAQ/Faq";
import Footer from "./components/Basic_Com/Footer/Footer";
// import Details from "./components/Basic_Com/Details/Details";
import Hero from "./components/Basic_Com/Hero/Hero";
import Nav from "./components/Basic_Com/Navbar/Nav";
import Premium from "./components/Basic_Com/Premium/Premium";
// import { Review } from "./components/Basic_Com/Review/Review";
// import ScrollValo from "./components/Basic_Com/ScrollValo/ScrollValo";

function App() {
  return (
    <>
    
      <div className="min-h-screen w-full relative">
        {/* Dashed Grid */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
            WebkitMaskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        {/* Your Content/Components */}
        <div className="relative z-10">
          <Nav></Nav>
          <Hero></Hero>
          <AboutUs></AboutUs>
          {/* <ScrollValo></ScrollValo> */}
          <AllProduct></AllProduct>
          <Premium></Premium>
          <Faq></Faq>
          {/* <Review></Review> */}

          <Footer></Footer>
        </div>
      </div>
    </>
  );
}

export default App;
