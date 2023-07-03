import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

const MainLayout = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const token = window.localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/")
  //   }
  // }, []);
  return (
    <div className="md:max-w-screen-xl md:mx-auto  m-2">
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
