import React from "react";
import { assets } from "../assets/assets";
const Footer = () => {
  return (
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40  text-sm">
      <div>
        <img src={assets.logo} alt="" className="mb-5 w-32" />
        <p className="w-full md:w-2/3 text-gray-600">
          G4 Shop is a premium clothes shop offering
          high-quality, customizable pieces. We strive to create a space where
          customers can express themselves and enjoy our products.
        </p>
      </div>
      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Policy</li>
        </ul>
      </div>

      <div>
        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>(+84)911420863</li>
          <li>minh.changquang30@hcmut.edu.vn</li>
          <li>122 Ton Dan Street Ward 10 District 4 HCM city</li>
        </ul>
      </div>

      
    </div>
  );
};

export default Footer;
