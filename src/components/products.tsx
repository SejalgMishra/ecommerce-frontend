import React from "react";
import Glasses from "../assets/image/glasses.jpg";
import Footware from "../assets/image/girlShoes.jpg";
import Shoe from "../assets/image/shoes.jpg";
import Bag from "../assets/image/purse.jpg";
import { useQuery } from "react-query";
import { getDataAPI, postDataAPI } from "../utilis/fetchDataApi";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/product/productAction";
import Card from "./sideBar";
import { addToCart } from "../redux/cart/cartAction";

const Products = () => {
  const dispatch = useDispatch();

  const products = useSelector((state: any) => state.product.products);
  const token: any = localStorage.getItem("token");
  const { error } = useQuery(["get_products"], () => {
    getDataAPI("user/product", token).then((res) => {
      const recentlyAddedProducts = res.slice(0, 4);
      dispatch(getProduct(recentlyAddedProducts));
    });
  });

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
          console.log(response.data);
          dispatch(addToCart(data));
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div className="flex-wrap">
      <h1 className="text-3xl   font-bold py-6 font-logo">New Arrivals</h1>
      <div className="flex flex-row justify-between flex-wrap h-[399px] md:h-auto overflow-hidden">
        {products.map(
          (product: {
            id: React.Key | null | undefined;
            productimage: string | undefined;
            name:
              | string
            price: number | bigint;
          }) => (
            <div key={product.id} className="flex flex-col ">
              <img
                src={product.productimage}
                alt={product.name}
                className="aspect-auto   h-[315px] w-[315px] object-cover "
              />
              <h2 className="font-sans text-xl mb-1">{product.name}</h2>
              <h3 className="font-font mb-1">productCategory</h3>
              <div className="flex gap-2">
                <p className="font-base">
                  {new Intl.NumberFormat("en-IN", {
                    currency: "INR",
                    style: "currency",
                  }).format(product.price)}
                </p>
                <p className="line-through opacity-70">
                  {new Intl.NumberFormat("en-IN", {
                    currency: "INR",
                    style: "currency",
                  }).format(product.price)}
                </p>
              </div>
              <button className="btn-white" onClick={() => addCart(product.id)}>
                Add to cart
              </button>
            </div>
          )
        )}
      </div>
      <div className="flex justify-center py-14">
        <a className="btn" href="/productpage">
          Shop All
        </a>
      </div>
    </div>
  );
};

export default Products;
