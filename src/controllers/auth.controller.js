import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../database/models/index.js";
import AppConfig from "../config/index.js";

export default class AuthController {
  // Đăng ký
  async signup(req, res) {
    try {
      const { userName, email, password, phone } = req.body;

      // Kiểm tra email tồn tại
      const exist = await db.User.findOne({ where: { email } });
      if (exist) return res.status(400).json({ message: "Email đã tồn tại" });

      // Hash mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Lấy role mặc định là customer
      const role = await db.Role.findOne({ where: { name: "customer" } });
      if (!role) return res.status(400).json({ message: "Không tìm thấy role customer" });

      // Tạo user mới
      const user = await db.User.create({
        userName,
        email,
        password: hashedPassword,
        phone,
        role_id: role.id,
      });

      return res.status(201).json({ message: "Đăng ký thành công", user });
    } catch (err) {
      console.error("Signup error:", err);
      return res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  }

  // Đăng nhập
  async signin(req, res) {
    try {
      const { email, password } = req.body;

      // Tìm user theo email, include role
      const user = await db.User.findOne({
        where: { email },
        include: [{ model: db.Role, as: "role" }],
      });

      if (!user) return res.status(400).json({ message: "Sai email hoặc mật khẩu" });

      // So sánh mật khẩu
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) return res.status(400).json({ message: "Sai email hoặc mật khẩu" });

      // Tạo JWT token
      const token = jwt.sign(
        { sub: user.id, role: user.role?.name },
        AppConfig.jwt.JWT_SECRET || "secret_key",
        { expiresIn: "1h" }
      );

      // Lưu token vào cookie
      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 1000,
      });

      // ✅ Nếu bạn dùng backend render: chuyển hướng về trang chủ
      // return res.redirect("/home");

      // ✅ Nếu bạn dùng frontend React/Vue: trả JSON để frontend xử lý
      return res.json({
        message: "Đăng nhập thành công",
        user: {
          id: user.id,
          userName: user.userName,
          email: user.email,
          role: user.role?.name,
        },
        accessToken: token,
      });
    } catch (err) {
      console.error("Signin error:", err);
      return res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  }

  // Lấy thông tin profile
  async getProfile(req, res) {
    try {
      const user = await db.User.findByPk(req.user.id, {
        include: [{ model: db.Role, as: "role" }],
      });
      if (!user) return res.status(404).json({ message: "Không tìm thấy user" });

      return res.json({
        id: user.id,
        userName: user.userName,
        email: user.email,
        role: user.role?.name,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async signout(req, res) {
    try {
      res.clearCookie("accessToken");
      return res.json({ message: "Đăng xuất thành công" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
