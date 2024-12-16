import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"Thông tin"} text2={" về G4"} />
      </div>
      {/* // Add more content about us here... */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-500">
          <b className="text-gray-600">Chào mừng đến với G4 Shop</b>
          <p>
          Tại G4 Shop, chúng tôi không chỉ là một nhà bán lẻ trực tuyến – chúng tôi là điểm đến toàn cầu cho những cá nhân trẻ, sành điệu, những người theo đuổi phong cách độc đáo của riêng mình. Sứ mệnh của chúng tôi là trao quyền cho khách hàng để họ tự tin thể hiện con người của mình, thông qua cả lựa chọn thời trang và phong cách sống.
          </p>
          <p>
          Mọi nội dung chúng tôi tạo ra, từ các bộ sưu tập độc quyền đến các câu chuyện truyền thông xã hội hấp dẫn, đều được thiết kế để khơi dậy cảm hứng và tôn vinh cá tính. Đằng sau hậu trường, đội ngũ đầy nhiệt huyết của chúng tôi làm việc không biết mệt mỏi để hiện thực hóa tầm nhìn về sự thể hiện bản thân của bạn.
          </p>
        </div>
      </div>
      
      
    </div>
    
  );
};

export default About;
