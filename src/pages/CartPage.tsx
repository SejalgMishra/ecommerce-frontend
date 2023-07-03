import React, { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
} from "../utilis/fetchDataApi";
import { deleteCart, getCart, updateCart } from "../redux/cart/cartAction";
import Address from "../components/Address";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cartItem = useSelector((state) => state.cart.cart);
  const userAddress = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);


  const token: any = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { error } = useQuery(["cart"], () => {
    getDataAPI("cartItem", token).then((res) => {
      dispatch(getCart(res));
    });
  });
  if (error) {
    console.log(error);
  }

  const removeCart = async (id: any) => {
    if (!token) {
      alert("First login");
    } else {
      await deleteDataAPI(`cartItem/${id}`, token)
        .then((response) => {
          console.log(response);
          dispatch(deleteCart());
          getDataAPI("cartItem", token).then((res) => {
            dispatch(getCart(res));
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const handleClick = async (productId: any, quantity: any, type: string) => {
    let newQuantity = quantity;
    if (type === "increment") {
      newQuantity++;
    } else if (type === "decrement" && newQuantity > 1) {
      newQuantity--;
    } else if (type === "decrement" && newQuantity == 1) {
      await deleteDataAPI(`cartItem/${productId}`, token).then((response) => {
        console.log(response);
        dispatch(deleteCart());
        getDataAPI("cartItem", token).then((res) => {
          dispatch(getCart(res));
        });
      });
    }
    try {
      const response = await patchDataAPI(
        `cartItem/${productId}`,
        { quantity: newQuantity },
        token
      );
      console.log("Quantity updated successfully!", response.data);
      console.log("New quantity:", newQuantity);
      dispatch(updateCart(quantity));
      getDataAPI("cartItem", token).then((res) => {
        dispatch(getCart(res));
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const subtotal = cartItem.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleOpen = () => {
    if(!(userAddress.data[0].address && userAddress.data[0].city && userAddress.data[0].country && userAddress.data[0].zipCode)){
        setOpen(!open);
        }else{
            navigate("/checkout")
        }
  }

  return (
    <div className="flex-wrap ">
      {cartItem.length > 0 ? (
        <div>
          <h1 className="font-font text-center py-4 text-3xl">Your Cart</h1>
          <button className="btn w-full my-3 rounded-lg hover:bg-black" onClick={handleOpen}>
            <p className=" font-semibold text-lg">
              Total :{" "}
              {new Intl.NumberFormat("en-IN", {
                currency: "INR",
                style: "currency",
              }).format(subtotal.toFixed(2))}
            </p>
            <p>
                Checkout For further 
            </p>
          </button>
          <div className="flex flex-col justify-between flex-wrap md:h-auto ">
            {cartItem.map((product) => (
              <div
                key={product.productId}
                className="flex gap-4 border p-2 drop-shadow-lg mb-2"
              >
                <img
                  src={product.productimage}
                  alt={product.name}
                  className="aspect-auto h-[150px] w-[300px] object-cover"
                />
                <div className="flex justify-between w-full">
                  <div>
                    <h2 className="font-sans text-xl mb-1">{product.name}</h2>
                    <h3 className="font-font mb-1">productCategory</h3>
                    <div className="flex gap-2">
                      <p className="font-base">
                      {new Intl.NumberFormat("en-IN", {
                            currency: "INR",
                            style: "currency",
                          }).format(product.price  )}
                      </p>
                    </div>
                    <div className="flex mt-2 gap-2 items-center">
                      <button
                        className="bg-black px-3 py-1 text-white font-bold "
                        onClick={() => {
                          handleClick(
                            product.productId,
                            product.quantity,
                            "decrement"
                          );
                        }}
                      >
                        -
                      </button>
                      <p className="font-base"> {product.quantity} </p>
                      <button
                        className="bg-black px-3 py-1 text-white font-bold"
                        onClick={() => {
                          handleClick(
                            product.productId,
                            product.quantity,
                            "increment"
                          );
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn-white"
                      onClick={() => removeCart(product.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {open && <Address setOpen={setOpen} />}
        </div>
      ) : (
        <div className="flex flex-col justify-center text-center items-center h-36">
          <p className="font-font text-center py-4 text-3xl">
            Your Cart is empty
          </p>
          <a className="btn w-32" href="/">
            Continue Shopping
          </a>
        </div>
      )}
    </div>
  );
};

export default CartPage;
