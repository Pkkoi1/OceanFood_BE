const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { email, password, fullName, phoneNumber } = req.body;

    // Check if email or phone number already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email hoặc số điện thoại đã tồn tại",
      });
    }

    const user = new User({ email, password, fullName, phoneNumber });
    await user.save();

    res.status(201).json({
      success: true,
      data: user,
      message: "Đăng ký người dùng thành công",
    });
  } catch (error) {
    let errorMessage = "Lỗi khi đăng ký người dùng";
    if (error.name === "ValidationError") {
      errorMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");
    }
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: error.message,
    });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Người dùng không tồn tại",
      });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Thông tin đăng nhập không hợp lệ",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET, // Đảm bảo biến này đã được định nghĩa
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      data: { token, user },
      message: "Đăng nhập thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi đăng nhập",
      error: error.message,
    });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông tin người dùng",
      error: error.message,
    });
  }
};

// Logout user
exports.logoutUser = async (req, res) => {
  try {
    // Invalidate the token on the client side by removing it
    res.status(200).json({
      success: true,
      message: "Đăng xuất thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi đăng xuất",
      error: error.message,
    });
  }
};
