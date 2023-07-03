import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  Close from "../assets/svg/Close.svg";
import { loadCart } from "../actions/cartAction";
import { postDataAPI } from "../utilis/fetchDataApi";
import { addToCart } from "../redux/cart/cartAction";
import { useDispatch } from "react-redux";

const Card = ({ image, categoryName, caption, price, btn }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const dispatch = useDispatch();

  const token: any = localStorage.getItem("token");

  const addCart = async (id: any) => {
    const data = {
      products: [
        {
          productId: id,
          quantity: 1,
        },
      ],
    };
    if (!token) {
      alert("First login");
    } else {
      await postDataAPI("cartItem", data, token)
        .then((response) => {
          console.log(response);
          dispatch(addToCart(data));
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  // const addToCart = async () => {
  //   try {
  //     const localStorageData = JSON.parse(localStorage.getItem("token"));
  //     const { email } = localStorageData.user;
  //     const data = {
  //       image,
  //       categoryName,
  //       caption,
  //       price,
  //       quantity: 1,
  //       email
  //     };

  //     const checkCart = await axiosInstance.get(`cart?email=${email}`);
  //     const cartItems = checkCart.data;

  //     const itemExists = cartItems.some((item) => {
  //       return (
  //         item.image === image &&
  //         item.categoryName === categoryName &&
  //         item.caption === caption &&
  //         item.price === price
  //       );
  //     });

  //     if (itemExists) {
  //       toast("Item Already in cart");
  //     } else {
  //       const response = await axiosInstance.post("cart", data);
  //       console.log("Item added to cart:", response.data);
  //       setIsPopupOpen(false);
  //       toast.success("Item Added To Cart");
  //     }
  //   } catch (error) {
  //     console.error("Error adding item to cart:", error);
  //   }
  // };

  return (
    <div className="md:flex    p-3 md:p-0    mx-auto relative">
      <div className="flex-shrink-0">
        <div
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handlePopupOpen}
        >
          <img
            src={image}
            alt="image"
            className="aspect-[3/4] md:w-72 w-36 mx-auto transition-transform duration-300 hover:scale-110"
          />
          {isHovered && (
            <button className="absolute bottom-0 left-0 w-full py-2 bg-black text-white text-center">
              Quick Preview
            </button>
          )}
        </div>
        <div className="flex flex-col justify-center gap-1 md:gap-1 px-1 md:px-0 ">
          <h1 className="font-bold text-sm md:text-base line-clamp-1">{categoryName}</h1>
          {caption && <p className="text-xs md:text-sm line-clamp-1">{caption}</p>}
          {price && (
            <p className="text-sm md:text-base  font-bold">
              {new Intl.NumberFormat("en-IN", {
                currency: "INR",
                style: "currency",
              }).format(price)}
            </p>
          )}
        </div>
        {!!btn && (
          <button
            className="bg-black text-white w-full px-4 py-2 rounded-md"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        )}
      </div>

      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg relative">
            <div className="flex">
              <div className="mr-6">
                <img src={image} alt="image" className="aspect-[3/4] md:w-72 w-32" />
              </div>
              <div className="pt-4 space-y-2">
                <h1 className=" md:text-xl text-md   font-bold mb-1">{categoryName}</h1>
                <p className="text-gray-500 text-xs md:text-base mb-1 md:mb-4">{caption}</p>
                <p className="text-gray-700 text-md  md:text-lg md:mb-4">
                  
                  <span className="font-bold">
                    {" "}
                    {new Intl.NumberFormat("en-IN", {
                      currency: "INR",
                      style: "currency",
                    }).format(price)}
                  </span>
                </p>
                <p className="text-gray-700 text-sm  mb-4 hidden md:block">
                  Description: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit.
                </p>

                <button
                  className="bg-black text-white px-4 py-2 mt-2 text-xs md:text-base rounded-md"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <button
              className="absolute top-0 right-0 mt-2 mr-2"
              onClick={handlePopupClose}
            >
              <Close className="h-7" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
