import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3 ">
          <Title text1={"Thông tin"} text2={"Giao hàng"} />
        </div>

        {/* template */}
        <div className="sm:col-span-2">
          <div className="mb-2 flex items-center gap-1">
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
          </div>
        </div>

        <div className="flex gap-3 ">
          <div>
            <label
              for="first_name_billing_modal"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              {" "}
              First Name*{" "}
            </label>
            <input
              type="text"
              placeholder=" Enter your first name"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>
          <div>
            <label
              for="last_name_billing_modal"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              {" "}
              Last Name*{" "}
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>
        </div>
        <label
          for="first_name_billing_modal"
          class=" block text-sm font-medium text-gray-900 dark:text-white"
        >
          {" "}
          Email*{" "}
        </label>
        <input
          type="email"
          placeholder="Enter your emaill address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <label
          for="first_name_billing_modal"
          class=" block text-sm font-medium text-gray-900 dark:text-white"
        >
          {" "}
          Address*{" "}
        </label>
        <input
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zipcoder"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <label
          for="first_name_billing_modal"
          class=" block text-sm font-medium text-gray-900 dark:text-white"
        >
          {" "}
          Phone number*{" "}
        </label>
        <input
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>
      {/* right */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-2"></div>
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-blue-600" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-blue-600" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-blue-600" : ""
                }`}
              ></p>
              <p className="text-black text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8 ">
            <Link to="/orders">
            <button className="w-full py-2 text-white bg-primary-500 rounded-md hover:bg-primary-600 dark:bg-primary-400 dark:text-white">
              {" "}
              Continue to Payment{" "}
            </button>
          </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
