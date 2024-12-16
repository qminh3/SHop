import React from "react";
import Image1 from "../../assets/hero/sale.png";
import Image2 from "../../assets/hero/shopping.png";
import Image3 from "../../assets/hero/women.png";
import Slider from "react-slick";

const ImageList = [
  {
    id: 1,
    image: Image1,
    title: "Giảm giá đến 70%",
    description: "Khám phá các xu hướng thời trang và phong cách mới nhất với mức giảm giá hấp dẫn.",
  },
  {
    id: 2,
    image: Image2,
    title: "Giảm đến 30% cho thời trang nam",
    description: "Trải nghiệm mua sắm đồ nam với mức giảm giá lên tới 30% ngay hôm nay.",
  },
  {
    id: 3,
    image: Image3,
    title: "Giảm đến 70% cho thời trang nữ",
    description: "Sẵn sàng cho bộ sưu tập thời trang nữ mới với ưu đãi giảm giá lên tới 70%.",
  },
];

const Hero1 = ({ handleOrderPopup }) => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };
  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200 pl-[-15px] ">
      {/* background pattern */}
      <div className="h-[700px] w-[700px] bg-primary-50/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z[8]"></div>
      {/* hero section */}
      <div className="container pb-8 sm:pb-0">
        <Slider {...settings}>
          {ImageList.map((data) => (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    {data.title}
                  </h1>
                  <p className="text-sm">
                    {data.description}
                  </p>
                  <div>
                    <button className="bg-gradient-to-r from-primary-50 to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full">
                      Order Now
                    </button>
                  </div>
                </div>

                <div className="order-1 sm:order-2">
                  <div className="relative z-10">
                    <img
                      src={data.image}
                      alt=""
                      className="w-[300px] h-[300px] sm:h-[450px] 
                sm:w-[450px] sm:scale-125 object-contain mx-auto lg:scale-120"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero1;
