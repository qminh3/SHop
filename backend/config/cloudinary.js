import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAM,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });

  console.log("Cloudinary connected successfully");
  // try {
  //     await cloudinary.config({
  //         cloud_name: "your_cloud_name",
  //         api_key: "your_api_key",
  //         api_secret: "your_api_secret"
  //     });
  //     console.log("Cloudinary connected successfully");
  // } catch (error) {
  //     console.error("Error connecting to Cloudinary:", error.message);
  // }
};
export default connectCloudinary;
