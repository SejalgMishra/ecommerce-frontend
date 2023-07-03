import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAPI, postDataAPI } from "../utilis/fetchDataApi";
import { getAllProduct, getOneProduct, getProduct } from "../redux/product/productAction";
import { useQuery } from "react-query";
import { addToCart } from "../redux/cart/cartAction";
import SingleProduct from "./SingleProduct";
import { useNavigate } from "react-router-dom";

const AllProduct = () => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState(null);



  const products = useSelector((state) => state.product.products);
   console.log(products);
  //  console.log(useSelector((state) => state));

  const navigate = useNavigate()

  const token: any = localStorage.getItem("token");
  // const { error, refetch } = useQuery(["get_all_products"], () => {
  //   getDataAPI("user/product", token).then((res) => {
  //     console.log(res);
  //     dispatch(getAllProduct(res));  
  //   });
  // });

  const handleMouseEnter = (id :any) => {
    setHoveredProductId(id);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const handlePopupOpen = async(id:any) => {
   const res=  await getDataAPI(`user/product/${id}` , token)
   console.log(res);
   dispatch(getOneProduct(res))
   
    navigate("/product")
  };

  

  useEffect(() => {
    getDataAPI("user/product", token).then((res) => {
      console.log(res);
      dispatch(getAllProduct(res));
    });

  }, []);

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
    <div className="flex-wrap">
      <h1 className="font-font text-center py-4 text-3xl">All Products</h1>
      <div className="flex flex-row justify-between flex-wrap h-[399px] md:h-auto overflow-hidden">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col " >
            <div className="flex flex-col relative"  onMouseEnter={() => handleMouseEnter(product.id)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handlePopupOpen(product.id)}>
            <img
              src={product.productimage}
              alt={product.name}
              className="aspect-auto h-[315px] w-[315px] object-cover "
            />
            {hoveredProductId === product.id && (
            <button className=" absolute bottom-0 left-0 w-[315px] py-2 bg-black text-white text-center rounded-t-xl font-font opacity-90">
             Details
            </button>
          )}
          </div>
            <h2 className="font-sans text-xl mb-1">{product.name}</h2>
            <h3 className="font-font mb-1">productCategory</h3>
            <div className="flex gap-2">
              <p className="font-base">$ {product.price} USD</p>
              <p className="line-through opacity-70">
                {new Intl.NumberFormat("en-IN", {
                  currency: "INR",
                  style: "currency",
                }).format(product.price)}
              </p>
            </div>
            <button
              className="btn-white mb-2 z-10"
              onClick={() => addCart(product.id)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
