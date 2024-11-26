import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      {/* // Add more content about us here... */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-500">
          <b className="text-gray-600">Welcome to G4 Shop</b>
          <p>
            At G4 Shop, we’re more than just an online retailer – we’re a global destination for young, trend-savvy individuals who embrace their unique style. Our mission is to empower our customers to confidently express who they are, both through fashion and lifestyle choices.
          </p>
          <p>
            Every piece of content we create, from exclusive collections to engaging social media stories, is designed to spark inspiration and celebrate individuality. Behind the scenes, our passionate team works tirelessly to bring your vision of self-expression to life.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
        <div className="container mx-auto max-w-5xl flex gap-12 flex-wrap items-start justify-center md:justify-between my-10">
          <div className="grid gap-4 justify-items-center text-center md:flex-1">
            <div className=" rounded-full border-8 border-amber-400 p-4 border-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-14 h-14"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                ></path>
              </svg>
            </div>
            <h3 className="text-3xl font-bold">Safe</h3>
            <p>Our products are secure and private out-of-the-box</p>
          </div>
          <div className="grid gap-4 justify-items-center text-center md:flex-1">
            <div className=" rounded-full border-8 border-amber-400 p-4 border-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-14 h-14"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                ></path>
              </svg>
            </div>
            <h3 className="text-3xl font-bold">Efficient</h3>
            <p>Not only save your wallet but also the environment</p>
          </div>
          <div className="grid gap-4 justify-items-center text-center md:flex-1">
            <div className=" rounded-full border-8 border-amber-400 p-4 border-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-14 h-14"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                ></path>
              </svg>
            </div>
            <h3 className="text-3xl font-bold">Proven</h3>
            <p>Leading the Smart Home world for the next 10 years</p>
          </div>
        </div>
      </div>
      
    </div>
    // Add more content about us here...
  );
};

export default About;
