import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { token, currency, backendUrl } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorder",
        {},
        { headers: { token } }
      );
      
      if (response.data.success) {
        let allOrderItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrderItem.push(item);
          });
        });
        setOrderData(allOrderItem.reverse());
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  // Render orders here
  return (
    <div className="border-t pt-14">
      <div className="text-2xl ">
        <Title text1={"Đơn hàng"} text2={"của tôi"} />
      </div>

      <div>
        {orderData.map((item, index) => {
          return (
            <div
              key={index}
              className="border-b border-t text-black flex flex-col md:flex-row md:justify-between gap-4 py-3"
            >
              <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20 " src={item.image[0]} alt="" />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base">
                    <p className="">
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quanity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="mt-1">
                    Payment:{" "}
                    <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className="flex  text-sm md:w-2/7 justify-between">
              
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
