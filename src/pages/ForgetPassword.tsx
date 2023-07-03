import { Formik } from "formik";
import React, { useState } from "react";
import { postDataAPI } from "../utilis/fetchDataApi";
interface MyFormValues {
  email: string;
}

const ForgetPassword = () => {
  const initialValues: MyFormValues = { email: "" };
  const [userData, setUserData] = useState(initialValues);
  const { email } = userData;

  const handleChangeInput = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const token: any = localStorage.getItem("token");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    try {
      const res = await postDataAPI("fpassword", userData, token);
      console.log(res);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Formik initialValues={initialValues} >
        <form className='  "max-w-screen-sm  mx-auto #d4d4d8  mt-36  h-[70%] text-white ' onSubmit={handleSubmit}>
          <div className="flex flex-col items-center  justify-center px-3 bg-black opacity-90 rounded-xl py-36  max-w-screen-lg mx-auto">
          <h1 className="mb-4 text-xl font-font">Kindly enter your email where we will send link :</h1>
            <input
              name="email"
              value={email}
              onChange={handleChangeInput}
              placeholder="Your Email"
              className="p-2 border-2 w-full text-black rounded-lg mb-2"
              type="email"
            />
            
            <button
              type="submit"
              className="p-2 border-2 w-full border-gray-700  rounded-lg text-white font-font"
            >
              Submit
            </button>
          <h1 className="mb-4 text-base font-font mt-2 text-gray-400 ">You will get your link to change password in one hour</h1>
          </div>
        </form>
      </Formik>
    </div>
  );
};

export default ForgetPassword;
