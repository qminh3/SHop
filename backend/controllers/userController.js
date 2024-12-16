import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
// sử lý đăng nhập ->>
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      console.log(token);
      res.status(200).json({ message: "Mật khẩu đúng", success: true, token });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Mật khẩu không đúng" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "đăng nhập sai" });
  }
};

// dang ky
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin" });
    }
    // kiem tra ton tai
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User đã tồn tại" });
    }
    //kiem tra email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email không hợp lệ" });
    }
    //kiểm tra password
    if (!validator.isLength(password, { min: 8 })) {
      return res.status(400).json({ message: "Password phải ít nhất 8 ký tự" });
    }
    // mã hoá password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    // tạo token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", success: false });
  }
};

const getMyInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng", success: false });
    }

    res.status(200).json({
      success: true,
      message: "Lấy thông tin người dùng thành công",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", success: false });
  }
};

const getMyNameEmailPassword = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId).select("name email");

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng", success: false });
    }

    res.status(200).json({
      success: true,
      message: "Lấy thông tin người dùng thành công",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", success: false });
  }
};






// kiểm tra đăng nhập->admin
const adminLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) 
    {
        const token =jwt.sign(email+password,process.env.JWT_SECRET)
        res.json({success: true, token})
    }else{
      res.status(401).json({success: false, message: 'Sai email hoặc mật khẩu'})
    }
  } catch (Email) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", success: false });
  }
};

export { loginUser, registerUser, adminLogin,getMyInfo,getMyNameEmailPassword };
