import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const {
    navigate,
    products,
    currency,
    delivery_fee,
    showSearch,
    setSearch,
    setShowSearch,
    cartItems,
    updateQuanity,
  } = useContext(ShopContext);

  // Render orders here
  return (
    <div className="border-t pt-16">
      <div className="text-2xl ">
        <Title text1={"Đơn hàng"} text2={"của tôi"} />
      </div>

      <div>
        {products.slice(1, 4).map((item, index) => {
          return (
            <div
              key={index}
              className="border-b border-t text-black flex flex-col md:flex-row md:justify-between gap-4 py-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20 " src={item.image[0]} alt="" />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base">
                    <p className="">
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: 1</p>
                    <p>Size: M</p>
                  </div>
                  <p className="mt-4">
                    Date: <span className="text-gray-400">25, Jul, 2024</span>
                  </p>
                </div>
              </div>
              <div className="flex  text-sm md:w-1/2 justify-between">
               
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">Ready to ship</p>
                </div>
                <button className=" px-4 py-2 border text-sm font-medium rounded-sm ">
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;

// div>
//   <img src={item.image} alt={item.name} className='w-20 h-20 object-cover' />
//   <div className='ml-4'>
//     <h3>{item.name}</h3>
//     <p>Số lượng: {cartItems[item.id]}</p>
//     <p>Giá: {currency}{item.price}</p>
//   </div>
// </div>
