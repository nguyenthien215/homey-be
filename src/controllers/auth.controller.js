import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../database/models/index.js";
import AppConfig from "../config/index.js";

export default class AuthController {
  //  Đăng ký
  async signup(req, res) {
    try {
      const { userName, email, password, phone, roleName } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!userName || !email || !password || !phone) {
        return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
      }

      // Kiểm tra email đã tồn tại
      const exist = await db.User.findOne({ where: { email } });
      if (exist) return res.status(400).json({ message: "Email đã tồn tại" });

      // Hash mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Xác định role (nếu người dùng không truyền thì mặc định là customer)
      const role = await db.Role.findOne({
        where: { name: roleName || "customer" },
      });
      if (!role) return res.status(400).json({ message: "Không tìm thấy role hợp lệ" });

      // Tạo user mới
      const user = await db.User.create({
        userName,
        email,
        password: hashedPassword,
        phone,
        role_id: role.id,
      });

      return res.status(201).json({
        message: "Đăng ký thành công",
        user: {
          id: user.id,
          userName: user.userName,
          email: user.email,
          phone: user.phone,
          role: role.name,
        },
      });
    } catch (err) {
      console.error("Signup error:", err);
      return res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  }

  //  Đăng nhập
  async signin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu" });

      // Tìm user và lấy role
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
        { expiresIn: "2h" }
      );

      // Lưu token vào cookie (nếu cần)
      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: false,
        maxAge: 2 * 60 * 60 * 1000,
      });

      // Trả về thông tin user cho frontend
      return res.json({
        message: "Đăng nhập thành công",
        user: {
          id: user.id,
          userName: user.userName,
          email: user.email,
          phone: user.phone,
          role: user.role?.name,
        },
        accessToken: token,
      });
    } catch (err) {
      console.error("Signin error:", err);
      return res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  }

  //  Lấy thông tin người dùng
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
        phone: user.phone,
        role: user.role?.name,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  //  Đăng xuất
  async signout(req, res) {
    try {
      res.clearCookie("accessToken");
      return res.json({ message: "Đăng xuất thành công" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
