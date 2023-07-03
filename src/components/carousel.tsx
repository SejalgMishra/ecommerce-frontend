import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Laptop from "../assets/image/makeup.jpg";
import MensWear3 from "../assets/image/clothes.jpg";
import Shoes from "../assets/image/faishongirl.jpg";

const CarousalLayout = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Slider {...settings} className="overflow-hidden rounded-lg">
      <div >
      <div className="relative">
          <img src={Shoes} alt="Image 2" className="md:w-full h-[550px] object-cover opacity-50"/>
          <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ">
          <span className="text-lg font-bold mb-9 ">Buy More & Save More</span>
          <p className="text-5xl font-logo mb-8">Best Fashion Under One Roof.</p>
          <a className="btn" href="/productpage">Shop Now</a>
          </div>
        </div>
      </div>

      <div>
        <div className="relative">
          <img src={MensWear3} alt="Image 2" className="md:w-full h-[550px] object-cover opacity-50"/>
          <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-5xl font-logo mb-8">explore our xyla and exiting offers</h1>
            <a className="btn" href="/productpage">Shop Now</a>          </div>
        </div>
      </div>
      <div>
        <div className="relative">
          <img src={Laptop} alt="Image 2" className="md:w-full h-[550px] object-cover opacity-50"/>
          <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-5xl font-logo mb-8">Every day with new Fashion</h1>
            <a className="btn" href="/productpage">Shop Now</a>          </div>
        </div>
      </div>
    </Slider>
  );
};

export default CarousalLayout;
