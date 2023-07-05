import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { patchDataAPI, postDataAPI } from "../utilis/fetchDataApi";
import { useNavigate } from "react-router-dom";

interface MyFormValues {
  phonenum: string;
  city: string;
  address: string;
  country: string;
  zipCode: string;
}

interface props {
  setOpen: (value: boolean) => void;
}

const Address = ({ setOpen }: props) => {
  const initialValues: MyFormValues = {
    address: "",
    city: "",
    country: "",
    phonenum: "",
    zipCode: "",
  };
const navigate = useNavigate()
  const [userData, setUserData] = useState(initialValues);
  const { address, city, country, phonenum, zipCode } = userData;
  const token: any = localStorage.getItem("token");

  const handleChangeInput = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };


  const handleSubmit = async (e: {
    phonenum: any;
    country: any; preventDefault: () => void; 
}) => {
    e.preventDefault()
    try {
      const res = await patchDataAPI("details", userData, token);
      navigate("/checkout")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit_profile fixed top-0 left-0 h-screen z-40 overflow-auto w-screen bg-[#0008] ">
      <button
        className="btn  absolute top-4 right-4"
        onClick={() => setOpen(false)}
      >
        Close
      </button>
      <Formik
        initialValues={initialValues}
        validate={(initialValues) => {
          const errors: Partial<MyFormValues> = {};

          if (!initialValues.address) {
            errors.address = "address is required";
          }

          if (!initialValues.city) {
            errors.city = "city is required";
          }

          if (!initialValues.country) {
            errors.country = "country is required";
          }
          if (!initialValues.phonenum) {
            errors.phonenum = "phonemun is required";
          }
          if (!initialValues.zipCode) {
            errors.zipCode = "zipCode is required";
          }

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({  }) => (
          <Form
            onSubmit={handleSubmit}
            className="    mt-36  h-[70%] text-white flex justify-center"
          >
            <div className="flex flex-col items-center  w-[50%] justify-center px-3 bg-black opacity-90 rounded-xl py-40">
              <h1 className="text-2xl font-bold mb-4">Your Shipping Details</h1>
              <div className="flex flex-col gap-1 w-full">
                <label>Your Address:</label>
                <input
                  name="address"
                  value={address}
                  onChange={handleChangeInput}
                  placeholder="Your address"
                  className="p-2 border-2 w-full text-black  rounded-lg mb-2"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label>Your City:</label>
                <input
                  name="city"
                  value={city}
                  onChange={handleChangeInput}
                  placeholder="Your city"
                  className="p-2 border-2 w-full  text-black rounded-lg mb-2"
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label>Your Country:</label>
                <input
                  name="country"
                  value={country}
                  onChange={handleChangeInput}
                  placeholder="Your country"
                  className="p-2 border-2 w-full  text-black rounded-lg mb-2"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label> Your Phone Number:</label>
                <input
                  name="phonenum"
                  value={phonenum}
                  onChange={handleChangeInput}
                  placeholder="phonenum"
                  className="p-2 border-2 w-full  text-black  rounded-lg mb-2"
                  type="tel"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label>Zipcode:</label>
                <input
                  name="zipCode"
                  value={zipCode}
                  onChange={handleChangeInput}
                  placeholder="Zipcode"
                  className="p-2 border-2 w-full  text-black  rounded-lg mb-2"
                  type="tel"
                />
              </div>
              <button
                type="submit"
                className="p-2 border-2 w-full border-gray-700  rounded-lg text-white"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Address;
