import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod"); // Default payment method is COD
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartItemsCount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    street: '',
    ward: '',
    district: '',
    city: '',
    phone: '',
    // Additional Visa fields
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      // Prepare products data from cart
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quanity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartItemsCount() + delivery_fee,
      };

      // Handle payment methods
      switch (method) {
        case 'cod': {
          const responseCod = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });

          if (responseCod.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(responseCod.data.message);
          }
          break;
        }
        case 'visa': {
          const visaPaymentData = {
            cardNumber: formData.cardNumber,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv,
            ...orderData,
          };
          const responseVisa = await axios.post(backendUrl + '/api/order/visa', visaPaymentData, { headers: { token } });

          if (responseVisa.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(responseVisa.data.message);
          }
          break;
        }
        default:
          toast.error("Invalid payment method");
          break;
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing the order.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left side - Billing and Address */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3 ">
          <Title text1={"Shipping"} text2={"Details"} />
        </div>

        {/* Form fields */}
        <div className="flex gap-3 ">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray">First Name*</label>
            <input
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              type="text"
              placeholder="Enter your first name"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray">Last Name*</label>
            <input
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              type="text"
              placeholder="Enter your last name"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>
        </div>

        {/* Other Address Fields */}
        <label className="block text-sm font-medium text-gray-900 dark:text-gray">Email*</label>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="Enter your email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <label className="block text-sm font-medium text-gray-900 dark:text-gray">Address*</label>
        <input
          onChange={onChangeHandler}
          name="address"
          value={formData.address}
          type="text"
          placeholder="Enter your address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* Right side - Cart and Payment Methods */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          <div className="flex gap-3 flex-col lg:flex-row">
            {/* COD */}
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md"
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-blue-600" : ""}`}></p>
              <p className="text-black text-sm font-medium mx-4">COD</p>
            </div>

            {/* Visa */}
            <div
              onClick={() => setMethod("visa")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md"
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "visa" ? "bg-blue-600" : ""}`}></p>
              <p className="text-black text-sm font-medium mx-4">Visa</p>
            </div>
          </div>

          {/* Visa Payment Fields */}
          {method === "visa" && (
            <div className="mt-4">
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray">
                  Card Number*
                </label>
                <input
                  onChange={onChangeHandler}
                  name="cardNumber"
                  value={formData.cardNumber}
                  type="text"
                  placeholder="Enter your Visa card number"
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray">
                  Expiry Date*
                </label>
                <input
                  onChange={onChangeHandler}
                  name="expiryDate"
                  value={formData.expiryDate}
                  type="text"
                  placeholder="MM/YY"
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray">
                  CVV*
                </label>
                <input
                  onChange={onChangeHandler}
                  name="cvv"
                  value={formData.cvv}
                  type="text"
                  placeholder="CVV"
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                />
              </div>
            </div>
          )}

          <div className="w-full text-end mt-8">
            <button type="submit" className="w-full py-2 text-white rounded-md bg-gray-900 dark:text-white">
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
