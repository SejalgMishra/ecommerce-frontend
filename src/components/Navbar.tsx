import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import Logo from "./Logo";
import DropDown from "../assets/svg/dropDown.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import Button from "./toggleButton";
import ToggleButton from "./toggleButton";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getDataAPI } from "../utilis/fetchDataApi";
import { logOut, user, userData } from "../redux/auth/authAction";
import { getCart } from "../redux/cart/cartAction";

const Menu = [
  {
    href: "/",
    name: "Home",
  },
  {
    href: "/productpage",
    name: "Product",
  },
  {
    href: "/cartpage",
    name: "Cart",
  },
];
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  const token: any = localStorage.getItem("token");
  const dispatch = useDispatch();


  const user = useSelector(state => state.auth)
  
  
  
  const cartItem = useSelector((state) => state.cart.cart);

 const { error } = useQuery(["get_all_products"], () => {
   getDataAPI("myProfile", token).then((res) => {
    
     dispatch(userData(res));
   });
  
 });
  
  // console.log(cartItem);

  // const { error, isLoading  } = useQuery(["cart"], () => {
  //   getDataAPI("cartItem", token).then((res) => {
  //     dispatch(getCart(res));
  //     // console.log(res);
  //   });
  // });
  // if (error) {
  //   console.log(error);
  // }
  

  const toggleOpen = () => {
    setOpen(!open);
  };
  const toggleNavbar = () => {
    setMenu(!menu);
  };

  const logOutUser = (e: { preventDefault: () => void; } | undefined) => {
    e.preventDefault()
    localStorage.removeItem("token")
    console.log("heello");
    
    dispatch(logOut())
  }
  return (
    <div
      className="navbar md:flex justify-between items-center md:max-w-screen-xl md:mx-auto pt-2 pb-3 
    "
    >
      <div className="hidden md:block ">
        <div className=" flex items-baseline pr-28">
          {Menu.map((x) => (
            <a href={x.href} className="rounded-md text-lg font-serif ml-4" key={x.name}>
              {x.name}
            </a>
          ))}
          <p className="font-text text-white rounded-full bg-black ml-1 px-2 ">{cartItem?.length}</p>
        </div>
      </div>
      <Logo />
      <div className="flex flex-col ">
        <button
          className="items-start px-3 py-2  text-black border-black hover:text-black hover:border-white md:hidden"
          onClick={toggleNavbar}
        >
          {menu ? (
            <GrClose className="h-6 w-6 " />
          ) : (
            <GiHamburgerMenu className="h-6 w-6 " />
          )}
        </button>

        {menu && (
          <div
            className={` md:hidden h-screen  items-center justify-center py-40 text-center ${
              menu ? "block" : "hidden"
            }`}
          >
            {Menu.map((x) => (
              <div className="flex flex-col ">
                <a href={x.href} className="rounded-md text-lg font-serif mb-4">
                  {x.name}
                </a>
              </div>
            ))}
            <a
              href="/"
              className="block px-4 py-2 text-lg font-serif text-black "
            >
              Profile
            </a>
            <a
              href="/"
              className="block px-4 py-2 text-lg font-serif text-black hover:bg-gray-100 "
            >
              Settings
            </a>
            <a
              onClick={()=> logOutUser(e)}
              className="block px-4 py-2 text-lg font-serif text-black hover:bg-gray-100 "
            >
              Sign out
            </a>
            <button className="btn mt-6">Login</button>
          </div>
        )}
      </div>

      <div className="gap-3 hidden md:flex">
        {token ? <p className="font-logo text-2xl">{(user?.data?.length > 0) ? (user.data[0].username) : <h1>User</h1>}</p> : <ToggleButton />}

        <div onClick={toggleOpen}>
          <DropDown className="dropdown h-9 w-9 border rounded-full border-black" />
          {open && (
            <div className="origin-top-left absolute z-10 mt-2 w-36 rounded-md shadow-lg py-1 bg-black  ring-1 ring-black ring-opacity-5 focus:outline-none">
              <a href="/" className="block px-4 py-2 text-sm text-white ">
                Profile
              </a>
              <a href="/" className="block px-4 py-2 text-sm text-white">
                Settings
              </a>
              <a href="/" className="block px-4 py-2 text-sm text-white">
                Sign out
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
