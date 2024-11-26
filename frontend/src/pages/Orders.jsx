import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const {
    token,
    currency,
    backendUrl,
  } = useContext(ShopContext);

  const [orderData,setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if(!token) {
        return null
      }

      const response = await axios.post(backendUrl+'/api/order/userorder',{},{headers:{token}})
      console.log(response.data)
      if(response.data.success) {
        let allOrderItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrderItem.push(item)
          })
        })
        setOrderData(allOrderItem.reverse());
      }
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  // Render orders here
  return (
    <div className="border-t pt-16">
      <div className="text-2xl ">
        <Title text1={"Đơn hàng"} text2={"của tôi"} />
      </div>

      <div>
        {orderData.map((item, index) => {
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
                    <p>Quantity: {item.quanity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-4">
                    Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                  </p>
                  <p className="mt-4">
                    Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className="flex  text-sm md:w-1/2 justify-between">
               
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                {/* <button onClick={loadOrderData} className=" px-4 py-2 border text-sm font-medium rounded-sm ">
                  Track Order
                </button> */}
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
