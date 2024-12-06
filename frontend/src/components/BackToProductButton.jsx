import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import React from "react";

const BackToProductButton = () => {
  return (
    <div>
      <Link to="/collection" href="/" passHref >
        <a
          aria-label="back-to-products"
          
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
