import ScrollVelocity from "@/components/ScrollVelocity";

const ScrollValo = () => {
  return (
    <div className=" py-10 min h-[400px]">
      <ScrollVelocity
        texts={["Our Hard Work", "Our Try"]}
        velocity={100}
        className="custom-scroll-text"
      />
    </div>
  );
};

export default ScrollValo;
