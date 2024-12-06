import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

const ProductItem = ({ id, image, price, name }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer ">
      <div className="overflow-hidden"  >
        <img
          onClick={window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          })}
          className="hover:scale-110 transition ease-in-out h-[220px] w-[180px] object-cover rounded-md"
          src={image[0]}
          alt=""
        />
      </div>

      <h3 className="pt-3 pb-1 text-sm font-semibold">{name}</h3>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>

      
    </Link>
  );
};

export default ProductItem;
