const FlashSaleProduct = require("../models/FlashSaleProduct");

// Get all flash sale products
exports.getFlashSales = async (req, res) => {
  try {
    const flashSales = await FlashSaleProduct.find({ isActive: true }) // Lọc theo isActive
      .populate({
        path: "product",
        select: "name price originalPrice discount image categories origin", // Đảm bảo trường origin được chọn
      });


    if (flashSales.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "Không có chương trình giảm giá nào đang hoạt động",
      });
    }

    res.status(200).json({
      success: true,
      data: flashSales,
      message: "Lấy danh sách sản phẩm giảm giá thành công",
    });
  } catch (error) {
    console.error("Error in getFlashSales:", error); // Log lỗi chi tiết
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách sản phẩm giảm giá",
      error: error.message,
    });
  }
};

// Add a product to flash sale
exports.addFlashSale = async (req, res) => {
  try {
    const { product, startDate, endDate, discountPercentage } = req.body;

    const flashSale = new FlashSaleProduct({
      product,
      startDate,
      endDate,
      discountPercentage,
    });

    await flashSale.save();

    res.status(201).json({
      success: true,
      data: flashSale,
      message: "Đã thêm sản phẩm vào chương trình giảm giá",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi thêm sản phẩm vào chương trình giảm giá",
      error: error.message,
    });
  }
};

// Update flash sale product
exports.updateFlashSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, discountPercentage } = req.body;

    const flashSale = await FlashSaleProduct.findByIdAndUpdate(
      id,
      { startDate, endDate, discountPercentage },
      { new: true, runValidators: true }
    );

    if (!flashSale) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm trong chương trình giảm giá",
      });
    }

    res.status(200).json({
      success: true,
      data: flashSale,
      message: "Đã cập nhật thông tin giảm giá",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi cập nhật thông tin giảm giá",
      error: error.message,
    });
  }
};

// Delete flash sale product
exports.deleteFlashSale = async (req, res) => {
  try {
    const { id } = req.params;

    const flashSale = await FlashSaleProduct.findByIdAndDelete(id);

    if (!flashSale) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm trong chương trình giảm giá",
      });
    }
    res.status(200).json({
      success: true,
      message: "Đã xóa sản phẩm khỏi chương trình giảm giá",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa sản phẩm khỏi chương trình giảm giá",
      error: error.message,
    });
  }
};
