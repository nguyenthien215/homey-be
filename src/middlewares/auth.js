import jwtLib from "jsonwebtoken";
import AppConfig from "../config/index.js";

export const jwt = () => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || req.cookies?.accessToken;

      if (!authHeader) {
        return res.status(401).json({ error: "Không có token, vui lòng đăng nhập" });
      }

      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

      jwtLib.verify(token, AppConfig.jwt.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.error("JWT Verify error:", err.message);
          return res
            .status(403)
            .json({ error: "Token không hợp lệ hoặc đã hết hạn" });
        }

        req.user = decoded;
        next();
      });
    } catch (error) {
      console.error("JWT Middleware error:", error);
      return res.status(500).json({ error: "Lỗi xác thực người dùng" });
    }
  };
};
