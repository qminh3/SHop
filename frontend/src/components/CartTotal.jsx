import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { product, getTotalCartAmount, cartItems, currency, delivery_fee } =
    useContext(ShopContext);
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"ORDER"} text2={"TOTALS"}></Title>
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
            <p>Giá sản phẩm</p>
            <p>{currency}{getTotalCartAmount()}.00</p>
        </div>
        <hr/>
        <div className="flex justify-between ">
            <p>Phí vận chuyển</p>
            <p>{currency}{delivery_fee}.00</p>
        </div>
        <hr/>
        <div className="flex justify-between">
            <p>Tổng</p>
            <p>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()+ delivery_fee}.00</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
