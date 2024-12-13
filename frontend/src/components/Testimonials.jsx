import React from "react";
import Slider from "react-slick";

const TestimonialData = [
  {
    id: 1,
    name: "Quang Minh",
    text: "Đây là một trang web mua sắm thuận tiện",
    img: "https://upanh123.com/wp-content/uploads/2020/09/f676521b471839e8428f79b94441d641.jpg",
  },
  {
    id: 2,
    name: "Quốc Huy",
    text: "Đây là một trang web mua sắm thuận tiện",
    img: "https://i.pinimg.com/736x/1b/b9/17/1bb9177e50050e5f1176c9dbaa71889a.jpg",
  },
  {
    id: 3,
    name: "Gia Thuận",
    text: "Đây là một trang web mua sắm thuận tiện",
    img: "https://kenh14cdn.com/203336854389633024/2024/7/14/44984383310338079616403644625710630882423235n-1720950836328608650516.jpeg",
  },
  {
    id: 5,
    name: "Đức Huy",
    text: "Đây là một trang web mua sắm thuận tiện",
    img: "https://nguoinoitieng.tv/images/nnt/102/0/bgmk.jpg",
  },
];

const Testimonials = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 mb-10">
      <div className="container">
        {/* header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-xl text-primary-50">
            Khách hàng nói gì sau khi mua
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
          Feedback
          </h1>
          
        </div>

        {/* Testimonial cards */}
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div className="my-6">
                <div
                  key={data.id}
                  className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative"
                >
                  <div className="mb-4">
                    <img
                      src={data.img}
                      alt=""
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <p className="text-xs text-gray-500">{data.text}</p>
                      <h1 className="text-xl font-bold text-black/80 dark:text-light">
                        {data.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                    ,,
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;