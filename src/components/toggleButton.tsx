import { ErrorMessage, Field, Formik , Form } from "formik";
import { FormikHelpers, FormikValues } from "formik/dist/types";
import React, { useState } from "react";
import Register from "./register";
import Login from "./login";



const ToggleButton = () => {
  const [open, setOpen] = useState(false);
  const [isLogin , setIsLogin] = useState(false)

  const token = localStorage.getItem("token")

  if (!token) {
    setTimeout(() => {
     setOpen(true)
    }, 7000);
  }

  const toggleOpen = () => {
    setOpen(true);
  };


  return (
    <div>
      <button className="btn btn-primary" onClick={toggleOpen}>
        Login
      </button>
      {open && (
        <div className="edit_profile fixed top-0 left-0 h-screen z-40 overflow-auto w-full bg-[#0008] ">
          <button
            className="btn  absolute top-4 right-4"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
           
           {
            isLogin ? <Register setIsLogin={setIsLogin} setOpen={setOpen} /> : <Login setIsLogin={setIsLogin} setOpen={setOpen} /> 
           }
         
        </div>
      )}
    </div>
  );
};

export default ToggleButton;
