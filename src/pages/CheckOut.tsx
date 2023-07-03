import Razorpay from "react-razorpay";
import React from "react";
import { useSelector } from "react-redux";
import { postData, postDataAPI } from "../utilis/fetchDataApi";

const CheckOut = () => {
  const userAddress = useSelector((state) => state.auth);

  const cartItem = useSelector((state) => state.cart.cart);

  const subtotal = cartItem.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handlePlaceOrder = async () => {
    const orderData = {
      amount: subtotal * 100, // Amount in paise (multiply by 100)
      currency: "INR",
      paymentMethod: "ONLINE",
    };
    const token: any = localStorage.getItem("token");
    console.log(token);

    try {
      const response = await postDataAPI("order", orderData, token);

      console.log(response);

      const options = {
        key: "rzp_test_Ls1Ugr8RHpdrw2",
        amount: response.totalPrice * 100,
        order_id: response.id,
        name: "Xyla.com",
        description: "Payment for Order",
        prefill: {
          name: "Sejal mishra",
          email: "sejal@example.com",
          contact: "8153045860",
        },
        theme: {
          color: "#000000",
        },
      };

      const razorpayCallback = function (response: any) {
        console.log(response);
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-font">Check Out</h1>
      <div className="border justify-center items-center  flex flex-col py-5 my-4 max-w-screen-md mx-auto">
        <h2 className="text-2xl font-[cursive]">Address for Delivary</h2>
        <div className="flex text-lg font-[cursive]">
          <p>{userAddress.data[0].address} ,</p>
          <p>{userAddress.data[0].city} ,</p>
          <p>{userAddress.data[0].country} , </p>
          <p>{userAddress.data[0].zipCode} </p>
        </div>
      </div>
      <div className="flex flex-col py-5 my-4 max-w-screen-md mx-auto">
        {cartItem.map(
          (product: {
            productId: React.Key | null | undefined;
            productimage: string | undefined;
            name:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | null
              | undefined;
            price: number | bigint;
          }) => (
            <div
              key={product.productId}
              className="flex gap-4 border p-2 drop-shadow-lg mb-2"
            >
              <img
                src={product.productimage}
                alt={product.name}
                className="aspect-auto h-[150px] w-[450px] object-cover"
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
                      }).format(product.price)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <button
        className="btn w-full my-3 rounded-lg hover:bg-black "
        onClick={handlePlaceOrder}
      >
        <p className=" font-semibold text-lg">
          Total :{" "}
          {new Intl.NumberFormat("en-IN", {
            currency: "INR",
            style: "currency",
          }).format(subtotal.toFixed(2))}
        </p>
        <p>Place Order</p>
      </button>
    </div>
  );
};

export default CheckOut;
