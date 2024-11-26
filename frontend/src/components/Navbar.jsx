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
  const {setShowSearch,showSearch,getCartItemsCount,navigate,token,setToken,setCartItems} =useContext(ShopContext)

  const logout = ()=>{
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({})
  }
  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      
      <Link to='/'>
      <img src={assets.logo} className="w-36" alt="" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700 hidden">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-5">
        <FontAwesomeIcon
        
        onClick={() => handleToggleSearch()}
          className="w-5 cursor-pointer"
          icon={faMagnifyingGlass}
        />
        <div className="group relative">
         
          <FontAwesomeIcon onClick={()=>token ? null : navigate('/login')} className="w-5 cursor-pointer" icon={faUser} />
          {token && 
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
          <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 rounded">
            <p className="cursor-pointer hover:text-black">My Profile</p>
            <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Order</p>
            <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
          </div>
        </div>}
          
        </div>
        <Link to="/cart" className="relative">
          <FontAwesomeIcon icon={faBagShopping} className="w-7 min-w-5" />
          <p 
          className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-700 text-white aspect-square rounded-full text-[8px]">
            {getCartItemsCount()}
          </p>
        </Link>
        <FontAwesomeIcon
          onClick={() => setVisible(true)}
          icon={faBars}
          className="w-5 cursor-pointer sm:hidden"
        />
        {/* {dành cho mobie} */}
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full" : "w-0"
          }`}
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
            <NavLink onClick={()=>setVisible(false)} to="/" className=" py-2 pl-6 boder cursor-pointer">
              Home
            </NavLink>
            <NavLink onClick={()=>setVisible(false)} to="/collection" className="py-2 pl-6 boder cursor-pointer">
            COLLECTION
            </NavLink>
            <NavLink onClick={()=>setVisible(false)} to="/about" className=" py-2 pl-6 boder cursor-pointer">
            ABOUT
            </NavLink>
            <NavLink onClick={()=>setVisible(false)} to="/contact" className=" py-2 pl-6 boder cursor-pointer">
           CONTACT
            </NavLink>
              
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
