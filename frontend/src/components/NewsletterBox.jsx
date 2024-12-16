import React from "react";

const NewsletterBox = () => {
    const onSubmitHandler = (e)=>{
        e.prevenDefault();

    }

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Đăng ký và nhận khuyến mãi 20%
      </p>
      {/* <p className="text-gray-400 mt-3">
        Lorem i
      </p> */}
      <form action="" 
      className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-5 border pl-3"
      onSubmit={onSubmitHandler}>
        <input
          className="w-full sm:flex-1 outline-none mt-10 items-center"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button type="submit" className="bg-black text-white text-xs px-10 py-4 rounded-sm">SUBSCRIBE</button>
      </form>
    </div>
  );
};

export default NewsletterBox;
