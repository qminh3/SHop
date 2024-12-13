import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faCartPlus,
  faBagShopping,
  faBars,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    showSearch,
    getCartItemsCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-20" alt="" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-900">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p className="font-bold text-gray-600">HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-secondary hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p className="font-bold text-gray-600">COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px]  bg-secondary hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p className="font-bold text-gray-600">ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px]  bg-secondary hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p className="font-bold text-gray-600">CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px]  bg-secondary hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-5">
        <FontAwesomeIcon
          onClick={() => handleToggleSearch()}
          className="w-5 cursor-pointer"
          icon={faMagnifyingGlass}
        />
        <div className="group relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => (token ? null : navigate("/login"))}
            className=" cursor-pointer size-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 rounded">
                <p
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer hover:text-black"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>

          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-700 text-white aspect-square rounded-full text-[8px]">
            {getCartItemsCount()}
          </p>
        </Link>

        <FontAwesomeIcon
          onClick={() => setVisible(true)}
          icon={faBars}
          className="w-5 cursor-pointer sm:hidden"
        />

        {/* Menu di động */}
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => {
                setVisible(false);
              }}
              className="flex items-center gap-4 p-4 cursor-pointer"
            >
              <FontAwesomeIcon
                className="h-4 rotate-90"
                icon={faCircleChevronDown}
              />
              <p>Back</p>
            </div>
            <NavLink
              onClick={() => setVisible(false)}
              to="/"
              className="py-2 pl-6 boder cursor-pointer"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/collection"
              className="py-2 pl-6 boder cursor-pointer"
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/about"
              className="py-2 pl-6 boder cursor-pointer"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/contact"
              className="py-2 pl-6 boder cursor-pointer"
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
