import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(401)
        .json({ sucess: false, message: "Token is not required" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ sucess: false, message: "Invalid token" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", success: false });
  }
};
export default adminAuth;
