import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { useState } from "react";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, []);
  console.log(latestProduct)
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo quasi
          eos autem minima repellat laboriosam facilis maiores commodi vitae
          illo unde accusamus facere, quam nostrum sit repudiandae eum
          cupiditate fugit.
        </p>
      </div>
      {/* trend */}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProduct.map((item,index) => (
          <ProductItem 
          key={index} 
          id={item._id}  
          image={item.image}
          price={item.price}/>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
