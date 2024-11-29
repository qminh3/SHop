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
          <Title text1={"Thông tin"} text2={"Giao hàng"} />
        </div>

        {/* template */}
        <div className="sm:col-span-2">
          {/* <div className="mb-2 flex items-center gap-1">
            <label
              for="saved-address-modal"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              {" "}
              Saved Address{" "}
            </label>
            <svg
              data-tooltip-target="saved-address-modal-desc-2"
              data-tooltip-trigger="hover"
              class="h-4 w-4 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <select
            id="saved-address-modal"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          >
            <option selected>Choose one of your saved address</option>
            <option value="address-1">
              San Francisco, California, United States, 3454, Scott Street
            </option>
            <option value="address-2">
              New York, United States, Broadway 10012
            </option>
          </select>
          <div
            id="saved-address-modal-desc-2"
            role="tooltip"
            class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
          >
            Choose one of your saved addresses
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div> */}
        </div>

        <div className="flex gap-3 ">
          <div>
            <label
              for="first_name_billing_modal"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray"
            >
              {" "}
              First Name*{" "}
            </label>
            <input
              onChange = {onChangeHandler} 
              name = 'firstName' 
              value = {formData.firstName}
              type="text"
              placeholder=" Enter your first name"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>
          <div>
            <label
              for="last_name_billing_modal"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray"
            >
              {" "}
              Last Name*{" "}
            </label>
            <input
              onChange = {onChangeHandler} 
              name = 'lastName' 
              value = {formData.lastName}
              type="text"
              placeholder="Enter your last name"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>
        </div>
        <label
          for="first_name_billing_modal"
          class=" block text-sm font-medium text-gray-900 dark:text-gray"
        >
          {" "}
          Email*{" "}
        </label>
        <input
          onChange = {onChangeHandler} 
          name = 'email' 
          value = {formData.email}
          type="email"
          placeholder="Enter your emaill address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <label
          for="first_name_billing_modal"
          class=" block text-sm font-medium text-gray-900 dark:text-gray"
        >
          {" "}
          Address*{" "}
        </label>
        <input
          onChange = {onChangeHandler} 
          name = 'address' 
          value = {formData.address}
          type="text"
          placeholder="Address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            onChange = {onChangeHandler} 
            name = 'street' 
            value = {formData.street}
            type="text"
            placeholder="Street"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            onChange = {onChangeHandler} 
            name = 'ward' 
            value = {formData.ward}
            type="text"
            placeholder="Ward"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange = {onChangeHandler} 
            name = 'district' 
            value = {formData.district}
            type="text"
            placeholder="District"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            onChange = {onChangeHandler} 
            name = 'city' 
            value = {formData.city}
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <label
          for="first_name_billing_modal"
          class=" block text-sm font-medium text-gray-900 dark:text-gray"
        >
          {" "}
          Phone number*{" "}
        </label>
        <input
          onChange = {onChangeHandler} 
          name = 'phone' 
          value = {formData.phone}
          type="number"
          placeholder="Phone"
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
