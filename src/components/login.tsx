import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import abc from "../assets/image/shoes.jpg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { authenticate, login } from "../redux/auth/authAction";
import { useMutation } from "react-query";
import { postDataAPI } from "../utilis/fetchDataApi";

interface MyFormValues {
  email: string;
  password: string;
}

interface props {
  setIsLogin: (value: boolean) => void;
  setOpen: (value: boolean) => void;
}
const Login = ({ setIsLogin, setOpen }: props) => {
  const dispatch = useDispatch();
  const initialValues: MyFormValues = { email: "", password: "" };
  const [userData, setUserData] = useState(initialValues);
  const { email, password } = userData;

  const handleChangeInput = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const registerMutation = useMutation((userData: MyFormValues) =>
    postDataAPI("login", userData, "").then((response) => {

      const token = response.login.token; // Assuming the token is returned in the response
      localStorage.setItem("token", token);
      console.log(token);
      const data = token + userData
      dispatch(login(data));
      setOpen(false);

      // Save the token in localStorage
    })
  );

  const handleSubmit = () => {
    registerMutation.mutate(userData);

    console.log(userData);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={(initialValues) => {
          const errors: Partial<MyFormValues> = {};

          if (!initialValues.email) {
            errors.email = "Email is required";
          }

          if (!initialValues.password) {
            errors.password = "Password is required";
          }

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ values, errors }) => (
          <Form
            onSubmit={handleSubmit}
            className="max-w-screen-lg  mx-auto #d4d4d8  mt-36  h-[70%] text-white flex "
          >
            <img src={abc} className="w-[50%] rounded-l-xl" />
            <div className="flex flex-col items-center  w-[50%] justify-center px-3 bg-black opacity-90 rounded-r-xl">
              <h1 className="text-2xl font-bold mb-4">Login Page</h1>

              <input
                name="email"
                value={email}
                onChange={handleChangeInput}
                placeholder="Your Email"
                className="p-2 border-2 w-full text-black rounded-lg mb-2"
                type="email"
              />
              <input
                name="password"
                value={password}
                onChange={handleChangeInput}
                placeholder="Your password"
                className="p-2 border-2 w-full text-black rounded-lg mb-2"
                type="password"
              />
              <button
                type="submit"
                className="p-2 border-2 w-full border-gray-700  rounded-lg text-white"
                disabled={registerMutation.isLoading}
              >
                Submit
              </button>
              <div className="top-0 flex font-font">
                <p>not register?</p>
                <a
                  className="text-gray-400 cursor-pointer font-font"
                  onClick={() => setIsLogin(true)}
                >
                  Register here
                </a>
              </div>
              <div className="top-0 ">
               
                <a
                  className="text-gray-400 cursor-pointer font-font"
                  href="/fpassword"
                >
                 Forget Password?
                </a>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
