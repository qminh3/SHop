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
  }, [products]);
  console.log(latestProduct)
  return (
    <div className="my-10">
      
       <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-3xl text-primary-50">
          LATEST COLLECTION
          </p>
          {/* <h1
            data-aos="fade-up"
            className="text-xl font-bold text-primary-500 "
          >
             Our best latest product is here.
          </h1> */}
        </div>
      {/* trend */}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProduct.map((item,index) => (
          <ProductItem 
          key={index} 
          id={item._id}  
          image={item.image}
          price={item.price}
          name={item.name}/>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
