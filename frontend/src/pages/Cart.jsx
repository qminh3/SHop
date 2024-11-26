import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
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
    getTotalCartAmount,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            // const item = products.find(p => p._id === product)
            // item.quantity = cartItems[products][product]
            // tempData.push(item)
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }


  }, [cartItems, products]);
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title
          text1={"Giỏ hàng"}
          text2={"của bạn"}
          className="text-2xl text-black"
        />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => {
            return product._id === item._id;
          });
          return (
            <div
              key={index}
              className="flex items-center py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] gap-4"
            >
              <div className="flex items-start gap-4">
                <img
                  src={productData.image[0]}
                  alt={productData.name}
                  className="h-16 w-16 object-cover sm:w-20"
                />
                <div className="ml-4">
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-6 mt-3">
                    <p
                      className="text-black
                     text-xs sm:text-sm border-3"
                    >
                      {productData.price}
                      {currency}
                    </p>
                    <p className="text-white text-xs sm:text-sm border px-2 bg-black text">
                      {item.size}
                    </p>
                    {/* <p className="text-gray-500 text-xs sm:text-sm">
                      x {item.quantity}
                    </p> */}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => {
                    updateQuanity(item._id, item.size, item.quantity - 1);
                  }}
                  type="button"
                  id="decrement-button"
                  data-input-counter-decrement="counter-input"
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                  <svg
                    class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  // id="counter-input"
                  data-input-counter
                  className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-gray"
                  placeholder=""
                  defaultValue={item.quantity}
                  value={item.quantity}
                  required
                  min={1}
                />
                {/* <input
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              /> */}
                <button
                  onClick={() => {
                    updateQuanity(item._id, item.size, item.quantity + 1);
                  }}
                  type="button"
                  id="increment-button"
                  data-input-counter-increment="counter-input"
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                  <svg
                    class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>

              <img
                onClick={() => {
                  updateQuanity(item._id, item.size, 0);
                }}
                className="w-4 mr-4 sm:mr-5 cursor-pointer"
                src={assets.bin_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20 ">
        <div className="w-full sm:w-[450px]">
          <div className="text-2xl">
          <Title text1={"CART"} text2={"TOTALS"}></Title>
          </div>
          <div className="flex justify-between">
              <p>Total</p>
              <p>{currency}{getTotalCartAmount()}.00</p>
          </div>
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-[#fd5335] text-white mt-10 px-4 py-3 rounded-lg bg-gray-900"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
          <div className=" mt-5 flex items-center justify-end gap-2">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {" "}
              or{" "}
            </span>
            <a
              onClick={() => navigate("/collection")}
              href="#"
              title=""
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-600"
            >
              Continue Shopping
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
