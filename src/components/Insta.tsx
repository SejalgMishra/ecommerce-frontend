import React from "react";
import Glasses from "../assets/image/glasses.jpg";
import Footware from "../assets/image/girlShoes.jpg";
import Shoe from "../assets/image/shoes.jpg";
import Bag from "../assets/image/purse.jpg";
import Laptop from "../assets/image/makeup.jpg";
import MensWear3 from "../assets/image/clothes.jpg";
import Shoes from "../assets/image/faishongirl.jpg";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      marquee: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const Images = [
  {
    image: Footware,
  },
  {
    image: Laptop,
  },
  {
    image: Shoe,
  },
  {
    image: Shoes,
  },
  //   {
  //     "image": Bag,
  //   },
  //   {
  //     "image": MensWear3,
  //   },
  //   {
  //     "image": Glasses,
  //   },
];

const Insta = () => {
  return (
    <>
      {" "}
      <div className="md:hidden flex ">
      {Images.map((x, index) => (
          <div dir="left" key={index}>
            <img
              src={x.image}
              className="aspect-auto h-[315px] w-[315px] object-cover relative hover:opacity-25  overflow-hidden"
            />
          </div>
        ))}
      </div>
      <div className="md:flex hidden">
        {Images.map((x, index) => (
          <marquee dir="left" key={index}>
            <img
              src={x.image}
              className="aspect-auto h-[315px] w-[315px] object-cover relative hover:opacity-25 "
            />
          </marquee>
        ))}
        
      </div>
      <div className="flex justify-center py-14">
          <button className="btn">Follow Us on Instagram</button>
        </div>
    </>
  );
};

export default Insta;
