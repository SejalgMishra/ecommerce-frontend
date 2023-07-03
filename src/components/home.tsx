import React from "react";
import Img1 from "../assets/img1.jpg";
import Img2 from "../assets/img2.png";
import Img3 from "../assets/img3.jpg";
import Img4 from "../assets/img4.jpg";
import Img5 from "../assets/img5.jpg";
import Carousel from "./carousel";
import Slick from "./slick";
import CarousalLayout from "./carousel";
import Products from "./products";
import Button from "./toggleButton";
import { Foot, Footer } from "./Footer";
import Insta from "./Insta";
import ProductPage from "../pages/ProductPage";

const Home = () => {
  return (
    <div >
      <CarousalLayout />
      <Products />
      <Insta />
    </div>
  );
};

export default Home;
