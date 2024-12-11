import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod"); // Default payment method is COD
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartItemsCount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    street: "",
    ward: "",
    district: "",
    city: "",
    phone: "",
    // Additional Visa fields
    cardNumber: "",
    expiryDate: "",
    cvv: "",
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
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
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
        case "cod": {
          const responseCod = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );

          if (responseCod.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(responseCod.data.message);
          }
          break;
        }
        case "visa": {
          const visaPaymentData = {
            cardNumber: formData.cardNumber,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv,
            ...orderData,
          };
          const responseVisa = await axios.post(
            backendUrl + "/api/order/visa",
            visaPaymentData,
            { headers: { token } }
          );

          if (responseVisa.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(responseVisa.data.message);
          }
          break;
        }
        case "stripe": {
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          // Placeholder for PayPal payment integration
          toast.success("PayPal payment integration is not implemented yet.");
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
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left side - Billing and Address */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3 ">
          <Title text1={"Thông tin"} text2={"Giao hàng"} />
        </div>

        {/* Địa chỉ đã lưu */}
        <div className="sm:col-span-2">
          <div className="mb-2 flex items-center gap-1">
            <label
              for="saved-address-modal"
              className="block text-sm font-medium text-gray-900 dark:text-gray"
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
            <option selected>Chọn địa chỉ đã lưu</option>
            <option value="address-1">
              561 Sư Vạn Hạnh, Phường 13, Quận 10
            </option>
            <option value="address-2">
              160 Nguyễn Cư Trinh, Phường Nguyễn Cư Trinh , Quận 1
            </option>
            <option value="address-3">
              Quận 9 - Tầng 2 TTTM Vincom Mega Mall Vinhomes Grand Park, TP. Thủ
              Đức
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

        {/* Thông tin giao hàng  */}
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
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
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
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
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
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
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
          required
          onChange={onChangeHandler}
          name="address"
          value={formData.address}
          type="text"
          placeholder="Address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            type="text"
            placeholder="Street"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="ward"
            value={formData.ward}
            type="text"
            placeholder="Ward"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="district"
            value={formData.district}
            type="text"
            placeholder="District"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
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
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
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
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-blue-600" : ""
                }`}
              ></p>
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/plasticine/100/banknotes.png"
                alt="banknotes"
              />
              <p className="text-black text-sm font-medium mx-2">COD</p>
            </div>
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-blue-600" : ""
                }`}
              ></p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 100 100"
              >
                <path
                  fill="#09ace3"
                  d="M89,27v46c0,2.209-1.791,4-4,4H15c-2.209,0-4-1.791-4-4V27c0-2.209,1.791-4,4-4h70 C87.209,23,89,24.791,89,27z"
                ></path>
                <path
                  fill="#fff"
                  d="M72.5,49.5c0-1.5,0.708-2.5,1.798-2.5C75.37,47,76,48,76,49.5H72.5z M79.5,50.887 c0-1.995-0.451-3.572-1.333-4.682c-0.9-1.127-2.251-1.705-3.967-1.705c-3.517,0-5.7,2.51-5.7,6.533 c0,2.253,0.583,3.942,1.734,5.019c1.034,0.965,2.516,1.448,4.433,1.448c3.333,0,4.433-1.061,4.433-1.061l-0.451-2.735 C77.633,54.235,76.5,54.5,75.5,54.5c-2.5,0-2.916-1.68-3-2.5h6.95C79.466,51.806,79.5,51.176,79.5,50.887z"
                ></path>
                <path
                  fill="#fff"
                  d="M61.959,53.564C61.64,54.176,61.145,54.5,60.57,54.5c-0.399,0-0.751-0.081-1.07-0.241V48.29 c0.671-0.71,1.276-0.79,1.5-0.79c1.005,0,1.5,1.097,1.5,3.242C62.502,51.967,62.327,52.919,61.959,53.564z M65.289,45.876 c-0.71-0.922-1.691-1.376-2.949-1.376c-1.159,0-2.175,0.486-3.126,1.505L59,44.5h-3.5v18l4-0.664v-4.61 c0.612,0.194,1.23,0.274,1.795,0.274c0.999,0,2.449-0.183,3.577-1.413c1.08-1.182,1.628-3.011,1.628-5.421 C66.498,48.53,66.095,46.912,65.289,45.876z"
                ></path>
                <rect
                  width="4"
                  height="13"
                  x="49.5"
                  y="44.5"
                  fill="#fff"
                ></rect>
                <path
                  fill="#fff"
                  d="M51.507,42.5c1.103,0,1.993-0.901,1.993-2c0-1.115-0.89-2-1.993-2c-1.119,0-2.007,0.886-2.007,2 C49.5,41.599,50.388,42.5,51.507,42.5z"
                ></path>
                <path
                  fill="#fff"
                  d="M46.838,44.5c-0.984,0-1.771,0.411-2.079,1.5L44.5,44.5h-3v13H45v-8.196 c0.436-0.626,1.157-0.804,2-0.804c0.183,0,0.5,0,0.5,0v-3.903C47.26,44.533,47.048,44.5,46.838,44.5z"
                ></path>
                <path
                  fill="#fff"
                  d="M39,47.5l0.5-3H37V41l-3.384,0.569l-0.487,3.058l-1.186,0.198L31.5,47.5h2v5.861 c0,1.526,0.5,4.139,3.68,4.139C39,57.5,39.5,57,39.5,57v-3c-0.237,0.064-1.036,0.221-1.4,0.221c-0.776,0-1.109-0.406-1.109-1.331 L37,47.5H39z"
                ></path>
                <path
                  fill="#fff"
                  d="M27.032,49.517c-1.144-0.43-1.766-0.774-1.766-1.307c0-0.452,0.359-0.71,1.001-0.71 c1.173,0,2.376,0.419,3.203,0.839l0.469-2.983c-0.657-0.322-2-0.855-3.859-0.855c-1.313,0-2.406,0.355-3.188,1.016 c-0.812,0.693-1.235,1.693-1.235,2.904c0,2.193,1.296,3.13,3.407,3.92c1.36,0.5,1.813,0.774,1.813,1.323 c0,0.533-0.438,0.838-1.235,0.838c-0.984,0-2.61-0.452-3.672-1.097L21.5,56.419c0.907,0.533,2.594,1.081,4.344,1.081 c1.39,0,2.548-0.305,3.328-0.952c0.875-0.71,1.328-1.759,1.328-3.113C30.5,51.196,29.167,50.32,27.032,49.517z"
                ></path>
                <g>
                  <path
                    fill="#1f212b"
                    d="M85,78H15c-2.757,0-5-2.243-5-5V27c0-2.757,2.243-5,5-5h70c2.757,0,5,2.243,5,5v46 C90,75.757,87.757,78,85,78z M15,24c-1.654,0-3,1.346-3,3v46c0,1.654,1.346,3,3,3h70c1.654,0,3-1.346,3-3V27c0-1.654-1.346-3-3-3 H15z"
                  ></path>
                  <path
                    fill="#1f212b"
                    d="M76,50h-3.5c-0.276,0-0.5-0.224-0.5-0.5c0-1.794,0.924-3,2.298-3c1.338,0,2.202,1.178,2.202,3 C76.5,49.776,76.276,50,76,50z M73.034,49h2.437c-0.097-0.792-0.439-1.5-1.173-1.5C73.511,47.5,73.141,48.228,73.034,49z"
                  ></path>
                  <path
                    fill="#1f212b"
                    d="M74.667,58c-2.043,0-3.649-0.533-4.774-1.583C68.637,55.242,68,53.431,68,51.033 C68,46.761,70.434,44,74.2,44c1.862,0,3.369,0.654,4.357,1.893C79.515,47.097,80,48.777,80,50.887c0,0.299-0.035,0.952-0.052,1.153 c-0.021,0.26-0.237,0.46-0.498,0.46h-6.348C73.396,53.496,74.2,54,75.5,54c0.97,0,2.006-0.263,2.919-0.74 c0.142-0.074,0.312-0.076,0.455-0.004s0.244,0.208,0.27,0.366l0.45,2.735c0.027,0.162-0.027,0.327-0.146,0.441 C79.32,56.921,78.103,58,74.667,58z M74.2,45c-3.256,0-5.2,2.255-5.2,6.033c0,2.11,0.53,3.676,1.575,4.654 C71.509,56.558,72.886,57,74.667,57c2.3,0,3.459-0.528,3.89-0.787l-0.293-1.778C77.373,54.802,76.412,55,75.5,55 c-2.031,0-3.306-1.075-3.497-2.949c-0.015-0.141,0.031-0.281,0.126-0.386S72.358,51.5,72.5,51.5h6.479 C78.99,51.278,79,51.036,79,50.887c0-1.878-0.412-3.349-1.225-4.371C76.973,45.51,75.77,45,74.2,45z"
                  ></path>
                  <path
                    fill="#1f212b"
                    d="M60.57,55c-0.477,0-0.9-0.097-1.295-0.295C59.106,54.62,59,54.447,59,54.258V48.29 c0-0.127,0.049-0.25,0.137-0.343C59.943,47.092,60.709,47,61,47c1.327,0,2,1.259,2,3.742c0.002,1.341-0.194,2.342-0.602,3.061 C61.998,54.564,61.332,55,60.57,55z M60,53.921C60.176,53.974,60.364,54,60.57,54c0.493,0,0.786-0.363,0.945-0.668 c0.003-0.005,0.006-0.011,0.009-0.017c0.317-0.556,0.478-1.421,0.476-2.572C62,49.491,61.826,48,61,48 c-0.083,0-0.492,0.026-1,0.498V53.921z"
                  ></path>
                  <path
                    fill="#1f212b"
                    d="M55.5,63c-0.117,0-0.232-0.042-0.323-0.119C55.064,62.787,55,62.647,55,62.5v-18 c0-0.276,0.224-0.5,0.5-0.5H59c0.249,0,0.46,0.183,0.495,0.429l0.08,0.562C60.42,44.326,61.331,44,62.341,44 c1.418,0,2.543,0.528,3.344,1.57c0.871,1.12,1.313,2.834,1.315,5.095c0,2.544-0.592,4.482-1.759,5.759 C64.269,57.484,62.979,58,61.295,58c-0.433,0-0.871-0.044-1.295-0.13v3.965c0,0.245-0.177,0.453-0.418,0.493l-4,0.665 C55.555,62.998,55.527,63,55.5,63z M56,45v16.91l3-0.499v-4.186c0-0.16,0.076-0.309,0.205-0.403 c0.127-0.095,0.294-0.122,0.446-0.073C60.169,56.913,60.737,57,61.295,57c1.387,0,2.437-0.409,3.209-1.251 C65.496,54.663,66,52.952,66,50.666c-0.002-2.034-0.374-3.542-1.105-4.483c-0.001-0.001-0.001-0.001-0.002-0.002 c-0.61-0.794-1.445-1.18-2.552-1.18c-1.026,0-1.903,0.428-2.761,1.346c-0.131,0.141-0.334,0.193-0.515,0.136 c-0.185-0.058-0.318-0.216-0.346-0.406L58.566,45H56z"
                  ></path>
                  <path
                    fill="#1f212b"
                    d="M53.5,58h-4c-0.276,0-0.5-0.224-0.5-0.5v-13c0-0.276,0.224-0.5,0.5-0.5h4c0.276,0,0.5,0.224,0.5,0.5 v13C54,57.776,53.776,58,53.5,58z M50,57h3V45h-3V57z"
                  ></path>
                  <path
                    fill="#1f212b"
                    d="M51.508,43C50.125,43,49,41.878,49,40.5c0-1.402,1.102-2.5,2.508-2.5C52.882,38,54,39.122,54,40.5 S52.882,43,51.508,43z M51.508,39C50.662,39,50,39.659,50,40.5c0,0.827,0.677,1.5,1.508,1.5C52.331,42,53,41.327,53,40.5 C53,39.659,52.345,39,51.508,39z"
                  ></path>
                  <path
                    fill="#1f212b"
                    d="M45,58h-3.5c-0.276,0-0.5-0.224-0.5-0.5v-13c0-0.276,0.224-0.5,0.5-0.5h3 c0.243,0,0.451,0.175,0.493,0.415l0.034,0.2C45.481,44.212,46.096,44,46.838,44c0.247,0,0.499,0.036,0.791,0.114 C47.848,44.172,48,44.371,48,44.597V48.5c0,0.276-0.224,0.5-0.5,0.5H47c-0.735,0-1.206,0.148-1.5,0.476V57.5 C45.5,57.776,45.276,58,45,58z M42,57h2.5v-7.696c0-0.102,0.031-0.202,0.09-0.286C45.225,48.105,46.27,48,47,48v-2.991 c-0.974-0.102-1.526,0.305-1.76,1.127c-0.063,0.225-0.28,0.376-0.508,0.363c-0.233-0.013-0.427-0.185-0.467-0.415L44.079,45H42V57z"
                  ></path>
                  <path
                    fill="#1f212b"
                    d="M37.181,58C34.563,58,33,56.266,33,53.361V48h-1.5c-0.146,0-0.286-0.064-0.382-0.177 c-0.095-0.112-0.136-0.26-0.111-0.405l0.443-2.676c0.035-0.211,0.2-0.376,0.411-0.412l0.831-0.138l0.43-2.702 c0.034-0.212,0.199-0.379,0.411-0.415l3.384-0.569c0.145-0.022,0.295,0.017,0.406,0.111C37.436,40.713,37.5,40.853,37.5,41v3h2 c0.147,0,0.286,0.064,0.382,0.177c0.095,0.112,0.136,0.26,0.111,0.405l-0.5,3C39.453,47.823,39.244,48,39,48h-1.501l-0.009,4.891 c0,0.83,0.282,0.83,0.609,0.83c0.3,0,1.046-0.143,1.27-0.204c0.149-0.039,0.312-0.009,0.435,0.085C39.928,53.697,40,53.844,40,54v3 c0,0.133-0.053,0.26-0.146,0.354C39.745,57.461,39.109,58,37.181,58z M32.09,47h1.41c0.276,0,0.5,0.224,0.5,0.5v5.861 C34,55.021,34.552,57,37.181,57c1.03,0,1.575-0.17,1.819-0.28v-2.104c-0.315,0.056-0.668,0.105-0.9,0.105 c-0.734,0-1.609-0.318-1.609-1.831l0.01-5.391C36.501,47.223,36.725,47,37,47h1.576l0.334-2H37c-0.276,0-0.5-0.224-0.5-0.5v-2.909 l-2.446,0.412l-0.43,2.703c-0.034,0.212-0.2,0.379-0.412,0.415l-0.834,0.139L32.09,47z"
                  ></path>
                  <path
                    fill="#1f212b"
                    d="M25.844,58c-1.947,0-3.693-0.62-4.597-1.15c-0.177-0.104-0.272-0.305-0.241-0.508l0.47-3.016 c0.025-0.165,0.132-0.306,0.283-0.376c0.151-0.07,0.326-0.062,0.471,0.026C23.271,53.608,24.813,54,25.642,54 c0.335,0,0.734-0.059,0.734-0.338c0-0.2-0.236-0.395-1.485-0.854c-2.242-0.839-3.733-1.906-3.733-4.389 c0-1.361,0.487-2.497,1.41-3.284C23.447,44.392,24.661,44,26.079,44c1.849,0,3.239,0.493,4.08,0.907 c0.196,0.097,0.308,0.31,0.273,0.526l-0.47,2.983c-0.025,0.158-0.124,0.294-0.267,0.368c-0.143,0.072-0.313,0.072-0.453,0.001 C28.777,48.548,27.555,48,26.267,48c-0.229,0-0.501,0.037-0.501,0.21c0,0.197,0.485,0.479,1.441,0.839l0,0 C29.126,49.771,31,50.703,31,53.436c0,1.508-0.509,2.686-1.513,3.501C28.637,57.641,27.409,58,25.844,58z M22.049,56.146 C22.948,56.593,24.381,57,25.844,57c1.308,0,2.349-0.29,3.009-0.837C29.615,55.544,30,54.627,30,53.436 c0-1.918-1.059-2.667-3.145-3.45l0,0c-1.102-0.414-2.09-0.861-2.09-1.775c0-0.559,0.394-1.21,1.501-1.21 c1.09,0,2.123,0.328,2.811,0.611l0.309-1.959C28.627,45.326,27.51,45,26.079,45c-1.179,0-2.17,0.311-2.865,0.897 c-0.7,0.598-1.057,1.447-1.057,2.522c0,1.922,1.13,2.721,3.081,3.451c1.29,0.474,2.138,0.855,2.138,1.792 c0,0.647-0.456,1.338-1.734,1.338c-0.92,0-2.243-0.344-3.285-0.829L22.049,56.146z"
                  ></path>
                  <path
                    fill="#1f212b"
                    d="M30.5,28h-1c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1c0.276,0,0.5,0.224,0.5,0.5 S30.776,28,30.5,28z"
                  ></path>
                  <path
                    fill="#1f212b"
                    d="M37.5,28h-4c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h4c0.276,0,0.5,0.224,0.5,0.5 S37.776,28,37.5,28z"
                  ></path>
                  <path
                    fill="#1f212b"
                    d="M59.5,73h-40c-2.481,0-4.5-2.019-4.5-4.5v-11c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v11 c0,1.93,1.57,3.5,3.5,3.5h40c0.276,0,0.5,0.224,0.5,0.5S59.776,73,59.5,73z"
                  ></path>
                  <path
                    fill="#1f212b"
                    d="M84.5,43c-0.276,0-0.5-0.224-0.5-0.5v-11c0-1.93-1.57-3.5-3.5-3.5h-40c-0.276,0-0.5-0.224-0.5-0.5 s0.224-0.5,0.5-0.5h40c2.481,0,4.5,2.019,4.5,4.5v11C85,42.776,84.776,43,84.5,43z"
                  ></path>
                  <path
                    fill="#1f212b"
                    d="M73.5,73h-1c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1c0.276,0,0.5,0.224,0.5,0.5 S73.776,73,73.5,73z"
                  ></path>
                  <path
                    fill="#1f212b"
                    d="M69.5,73h-5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h5c0.276,0,0.5,0.224,0.5,0.5 S69.776,73,69.5,73z"
                  ></path>
                </g>
              </svg>
              <p className="text-black text-sm font-medium mx-2">Stripe</p>
            </div>

            {/* Visa */}
            <div
              onClick={() => setMethod("visa")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "visa" ? "bg-blue-600" : ""
                }`}
              ></p>
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/plasticine/100/bank-card-back-side.png"
                alt="bank-card-back-side"
              />
              <p className="text-black text-sm font-medium mx-2">Visa</p>
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
            <button
              type="submit"
              className="w-full py-2 text-white rounded-md bg-gray-900 dark:text-white"
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
