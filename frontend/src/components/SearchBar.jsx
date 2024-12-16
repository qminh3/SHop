import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { 
    search,
    showSearch, 
    setSearch, 
    setShowSearch 
  } = useContext(ShopContext);
  
  const location = useLocation();

  const isVisible = location.pathname.includes('collection') && showSearch;

  if (!isVisible) return null;

  return (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 ">
        <input 
          type="text" 
          placeholder="Search" 
          value={search} 
          onChange={(e)=>setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm" 
        />
        <img src={assets.search_icon} alt="Search" className="w-4" />
      </div>
      <img 
        src={assets.cross_icon} 
        alt="Close"
        className="inline w-3 cursor-pointer"
        onClick={() => setShowSearch(false)} 
      />
    </div>
  );
};

export default SearchBar;
