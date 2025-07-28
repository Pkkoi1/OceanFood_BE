const Brand = require("../models/Brand");

// Get all brands
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({
      success: true,
      data: brands,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách thương hiệu",
      error: error.message,
    });
  }
};

// Get brand by ID
exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thương hiệu",
      });
    }
    res.status(200).json({
      success: true,
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông tin thương hiệu",
      error: error.message,
    });
  }
};

// Create new brand
exports.createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json({
      success: true,
      data: brand,
      message: "Tạo thương hiệu thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi tạo thương hiệu",
      error: error.message,
    });
  }
};

// Update brand
exports.updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thương hiệu",
      });
    }
    res.status(200).json({
      success: true,
      data: brand,
      message: "Cập nhật thương hiệu thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi cập nhật thương hiệu",
      error: error.message,
    });
  }
};

// Delete brand
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thương hiệu",
      });
    }
    res.status(200).json({
      success: true,
      message: "Xóa thương hiệu thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa thương hiệu",
      error: error.message,
    });
  }
};
