import React from "react";
import { assets } from "../assets/assets";
const Footer = () => {
  return (
    <div className="">
      <div className="mx-auto w-full max-w-screen-xl  ">
        <div className="grid grid-cols-2 gap-8 px-1 pt-8  lg:py-5 md:grid-cols-4 justify-center pb-7 border-b-2 border-gray-600 border-t-2">
          <div className="col-xl-3 col-lg-6 col-md-6 col-12  flex justify-center items-center">
            <div className="flex flex-row items-center">
              <div className="icon">
                <img
                  className=" lazyloaded"
                  data-src="//theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_1.png?v=614"
                  src="//theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_1.png?v=614"
                  alt="Miễn phí vận chuyển"
                />
              </div>
              <div className="info ml-3 ">
                <h3 class="info-title text-sm lg:text-base">Miễn phí vận chuyển</h3>
                <div class="infor-des text-xs lg:text-sm">Áp dụng cho mọi đơn hàng từ 500k</div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-6 col-md-6 col-12  flex justify-center items-center">
            <div className="flex flex-row items-center">
              <div className="icon">
              <img class=" lazyloaded" data-src="//theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_2.png?v=614" src="//theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_2.png?v=614" alt="Đổi hàng dễ dàng"/>
              </div>
              <div className="info ml-3">
                <h3 class="info-title text-sm lg:text-base">Đổi hàng dễ dàng</h3>
                <div class="infor-des text-xs lg:text-sm">7 ngày đổi hàng vì bất kì lí do gì</div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-6 col-md-6 col-12  flex justify-center items-center">
            <div className="flex flex-row items-center">
              <div className="icon">
              <img class=" lazyloaded" data-src="//theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_3.png?v=614" src="//theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_3.png?v=614" alt="Hỗ trợ nhanh chóng"/>
              </div>
              <div className="info ml-3">
                <h3 class="info-title text-sm lg:text-base">Hỗ trợ nhanh chóng</h3>
                <div class="infor-des text-xs lg:text-sm">HOTLINE 24/7 : 0964942121</div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-6 col-md-6 col-12  flex justify-center items-center">
            <div className="flex flex-row items-center">
              <div className="icon">
              <img class=" lazyloaded" data-src="//theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_4.png?v=614" src="//theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_4.png?v=614" alt="Thanh toán đa dạng"/>
              </div>
              <div className="info ml-3">
                <h3 class="info-title text-sm lg:text-base">Thanh toán đa dạng</h3>
                <div class="infor-des text-xs lg:text-sm">Thanh toán khi nhận hàng, Napas, Visa, Chuyển Khoản</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-10 mt-8   text-sm">
        <div>
          <img src={assets.logo} alt="" className="mb-5 w-20" />
          
          <p className="w-full md:w-2/3 text-gray-600">
          Hệ thống thời trang cho hàng đầu Việt Nam, hướng tới phong cách nam tính, lịch lãm và trẻ trung
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GIỚI THIỆU   </p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Giới thiệu</li>
            <li>Nhận diện</li>
            <li>Giá trị cốt lõi</li>
            <li>Liên hệ</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Thông tin liên hệ</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>VP Hà Nội: Tầng 6 - Tòa nhà MAC PLAZA - Số 10 - Trần Phú, Hà Đông, Hà Nội</li>
            <li>VP HCM: 122 Ton Dan Street Ward 10 District 4 HCM city</li>
            <li>
            Hotline: 0888.566.599
            </li>
            <li>Email:savanivietnam@savani.com.vn</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
