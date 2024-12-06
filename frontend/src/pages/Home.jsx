import React, { useEffect, useState } from "react";

import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";

import Hero from "../components/HERO/Hero";
import AOS from "aos";
import "aos/dist/aos.css";
import TopProducts from "../components/TopProducts";
import Banner from "../components/Banner";
import Testimonials from "../components/Testimonials";


const Home = () => {
  const [orderPopup, setOrderPopup] = useState(false);
  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200" >
      <Hero handleOrderPopup={handleOrderPopup} />
      <BestSeller handleOrderPopup={handleOrderPopup} />
      <LatestCollection />
      <TopProducts handleOrderPopup={handleOrderPopup} />
      <Banner/>
      <Testimonials/>
     
     
    </div>
  );
};

export default Home;
