import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { token, setToken, userInfo, setUserInfo } = useContext(ShopContext); // Lấy thông tin từ context
  const navigate = useNavigate();
  const [error, setError] = useState(null); // Thêm state để lưu lỗi nếu có

  // Fetch thông tin người dùng khi đã login
  useEffect(() => {
    if (!token) {
      navigate("/login"); // Nếu chưa đăng nhập, chuyển hướng đến trang login
    } else {
      // Nếu đã đăng nhập, lấy thông tin người dùng từ API
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/user/getMyNameEmailPassword", {
            headers: { token }, // Gửi token trong header
          });

          if (response.data.success) {
            setUserInfo(response.data.data); // Lưu thông tin người dùng vào context
          } else {
            setError("Failed to fetch user info");
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
          if (error.response) {
            // Lỗi từ API
            setError(`Failed to fetch user info. Error: ${error.response.data.message || error.response.statusText}`);
          } else if (error.request) {
            // Không nhận được phản hồi từ server
            setError("No response from the server. Please check your server status.");
          } else {
            // Lỗi khi gửi yêu cầu
            setError(`Error: ${error.message}`);
          }
        }
      };

      fetchUserInfo();
    }
  }, [token, navigate, setUserInfo]);

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null); // Xóa token trong context
    setUserInfo(null); // Xóa thông tin người dùng trong context
    navigate("/login"); // Chuyển hướng về trang login
  };

  if (error) {
    return <div>{error}</div>; // Hiển thị lỗi nếu có
  }

  if (!userInfo) {
    return <div>Loading...</div>; // Hiển thị loading khi chưa có thông tin người dùng
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Profile</h2>

        {/* Hiển thị thông tin người dùng */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <p className="w-full p-2 border border-gray-300 rounded-lg mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {userInfo.name}
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <p className="w-full p-2 border border-gray-300 rounded-lg mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {userInfo.email}
          </p>
        </div>

        {/* Đăng xuất */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
