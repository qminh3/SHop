import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import React from "react";

const BackToProductButton = () => {
  return (
    <div>
      <Link href="/" passHref>
        <a
          aria-label="back-to-products"
          className="border border-palette-primary text-palette-primary text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex 
      justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-lighter rounded-sm"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="w-4 mr-2 inline-flex"
          />
          Back To All Products
        </a>
      </Link>
    </div>
  );
};

export default BackToProductButton;
