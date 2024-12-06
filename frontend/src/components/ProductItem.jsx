import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

const ProductItem = ({ id, image, price, name, }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer ">
      <div className="  md:bg-white shadow-md rounded-xl duration-500 hover:scale-110 transition ease-in-out hover:shadow-xl"  >
        <img
          onClick={window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          })}
          className="h-[220px] w-[180px] object-cover object-cover mx-auto  "
          src={image[0]}
          alt=""
        />
        <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">Color</span>
                <p className="text-lg font-bold text-black truncate block capitalize">{name}</p>
                <div className="flex items-center">
                    <p className="text-lg font-semibold text-secondary cursor-auto my-3"> {currency}
                    {price}</p>
                    {/* <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2">{origin_price}</p>
                    </del> */}
                    
                </div>
            </div>
      </div>

      {/* <h3 className="pt-3 pb-1 text-sm font-semibold">{name}</h3>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p> */}

      
    </Link>
  );
};

export default ProductItem;
