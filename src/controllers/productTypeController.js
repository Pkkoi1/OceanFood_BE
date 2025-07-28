const ProductType = require("../models/ProductType");

// Get all product types
exports.getAllProductTypes = async (req, res) => {
  try {
    const productTypes = await ProductType.find();
    res.status(200).json({
      success: true,
      data: productTypes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách loại sản phẩm",
      error: error.message,
    });
  }
};

// Get product type by key
exports.getProductTypeByKey = async (req, res) => {
  try {
    const productType = await ProductType.findOne({ key: req.params.key });
    if (!productType) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy loại sản phẩm",
      });
    }
    res.status(200).json({
      success: true,
      data: productType,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông tin loại sản phẩm",
      error: error.message,
    });
  }
};

// Create new product type
exports.createProductType = async (req, res) => {
  try {
    const productType = new ProductType(req.body);
    await productType.save();
    res.status(201).json({
      success: true,
      data: productType,
      message: "Tạo loại sản phẩm thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi tạo loại sản phẩm",
      error: error.message,
    });
  }
};

// Update product type
exports.updateProductType = async (req, res) => {
  try {
    const productType = await ProductType.findOneAndUpdate(
      { key: req.params.key },
      req.body,
      { new: true, runValidators: true }
    );
    if (!productType) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy loại sản phẩm",
      });
    }
    res.status(200).json({
      success: true,
      data: productType,
      message: "Cập nhật loại sản phẩm thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi cập nhật loại sản phẩm",
      error: error.message,
    });
  }
};

// Delete product type
exports.deleteProductType = async (req, res) => {
  try {
    const productType = await ProductType.findOneAndDelete({
      key: req.params.key,
    });
    if (!productType) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy loại sản phẩm",
      });
    }
    res.status(200).json({
      success: true,
      message: "Xóa loại sản phẩm thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa loại sản phẩm",
      error: error.message,
    });
  }
};
