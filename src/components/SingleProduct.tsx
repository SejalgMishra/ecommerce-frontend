import React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { postDataAPI } from "../utilis/fetchDataApi";
import { addToCart } from "../redux/cart/cartAction";
import Rating from "./Rating";

interface props {
  setOpen: (value: boolean) => void;
}
const token: any = localStorage.getItem("token");






const SingleProduct = () => {
  const product = useSelector((state:any) => state.product.product);
  console.log(product);

  const dispatch = useDispatch();

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
          console.log(error);
        });
    }
  };

  return (
    <div className=" flex  gap-8 py-36">
      <img
        src={product.productimage}
        alt={product.name}
        className="w-[50%] rounded-xl"
      />
      <div className=" flex-col flex gap-2">
        <h1 className="text-7xl font-logo">{product.name}</h1>
        <p className="text-2xl font-font">{product.description}</p>
        <h2 className="text-2xl font-font">
          {new Intl.NumberFormat("en-IN", {
            currency: "INR",
            style: "currency",
          }).format(product.price)}
        </h2>

        <Rating rate={product.rating} />
        <h4 className="text-2xl font-font">
          {product.stock > 0 ? "Available" : "Out Of Stock"}
        </h4>
        <button className="btn mt-2 w-36 " onClick={() => addCart(product.id)}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
