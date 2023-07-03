import { Form, Formik } from "formik";
import React, { useState } from "react";
import abc from "../assets/image/login.jpg";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/auth/authAction";
import { useQuery, useMutation } from "react-query";
import { postDataAPI } from "../utilis/fetchDataApi";

interface MyFormValues {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface props {
  setIsLogin: (value: boolean) => void;
  setOpen: (value: boolean) => void;
}

const Register = ({ setIsLogin, setOpen }: props) => {
  const initialValues: MyFormValues = {
    email: "",
    password: "",
    confirm_password: "",
    username: "",
  };

  const dispatch = useDispatch();
  const token: any = localStorage.getItem("token");


  const [userData, setUserData] = useState(initialValues);
  const { username, email, password, confirm_password } = userData;

  const handleChangeInput = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const registerMutation = useMutation((userData: MyFormValues) =>
    postDataAPI("register", userData, token)
      .then((res) => {
        console.log(res);

        alert("Registration successful");
      })
      .catch((error) => {
        console.log(error);
      })
  );

  const handleSubmit = () => {
    registerMutation.mutate(userData);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={(initialValues) => {
          const errors: Partial<MyFormValues> = {};

          if (!initialValues.username) {
            errors.username = "username is required";
          }

          if (!initialValues.email) {
            errors.email = "Email is required";
          }

          if (!initialValues.password) {
            errors.password = "Password is required";
          }
          if (!initialValues.confirm_password) {
            errors.confirm_password = "confirm password is required";
          }

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ values, errors }) => (
          <Form
            onSubmit={handleSubmit}
            className="max-w-screen-lg  mx-auto   mt-36  h-[70%] text-white flex "
          >
            <img src={abc} className="w-[50%] rounded-l-xl object-cover" />
            <div className="flex flex-col items-center  w-[50%] justify-center px-3 bg-black opacity-90 rounded-r-xl py-40">
              <h1 className="text-2xl font-bold mb-4">Register Page</h1>
              <div className="flex flex-col gap-1 w-full">
                <label>Username:</label>
                <input
                  name="username"
                  value={username}
                  onChange={handleChangeInput}
                  placeholder="Your username"
                  className="p-2 border-2 w-full text-black  rounded-lg mb-2"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label>Email:</label>
                <input
                  name="email"
                  value={email}
                  onChange={handleChangeInput}
                  placeholder="Your Email"
                  className="p-2 border-2 w-full  text-black rounded-lg mb-2"
                  type="email"
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label>Password:</label>
                <input
                  name="password"
                  value={password}
                  onChange={handleChangeInput}
                  placeholder="Your password"
                  className="p-2 border-2 w-full  text-black rounded-lg mb-2"
                  type="password"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label>Confirm Password:</label>
                <input
                  name="confirm_password"
                  value={confirm_password}
                  onChange={handleChangeInput}
                  placeholder="Confirm Your Password"
                  className="p-2 border-2 w-full  text-black  rounded-lg mb-2"
                  type="password"
                />
              </div>
              <button
                type="submit"
                className="p-2 border-2 w-full border-gray-700  rounded-lg text-white"
                disabled={registerMutation.isLoading}
              >
                {registerMutation.isLoading ? "Submitting..." : "Submit"}
              </button>
              <div className="top-0 flex">
                <p>Already register?</p>
                <a
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  Login here
                </a>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
