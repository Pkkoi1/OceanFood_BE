const Favorite = require("../models/Favorite");
const Product = require("../models/Product");

// Get favorite products by user ID
exports.getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    let favorite = await Favorite.findOne({ userId }).populate("productIds");

    if (!favorite) {
      favorite = new Favorite({ userId, productIds: [] });
      await favorite.save();
    }

    res.status(200).json({
      success: true,
      data: favorite.productIds,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách yêu thích",
      error: error.message,
    });
  }
};

// Add product to favorites
exports.addToFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    let favorite = await Favorite.findOne({ userId });
    if (!favorite) {
      favorite = new Favorite({ userId, productIds: [] });
    }

    // Check if product is already in favorites
    if (!favorite.productIds.includes(productId)) {
      favorite.productIds.push(productId);
      await favorite.save();
    }

    await favorite.populate("productIds");

    res.status(200).json({
      success: true,
      data: favorite.productIds,
      message: "Đã thêm sản phẩm vào danh sách yêu thích",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi thêm sản phẩm vào danh sách yêu thích",
      error: error.message,
    });
  }
};

// Remove product from favorites
exports.removeFromFavorites = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const favorite = await Favorite.findOne({ userId });
    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh sách yêu thích",
      });
    }

    favorite.productIds = favorite.productIds.filter(
      (id) => id.toString() !== productId
    );

    await favorite.save();
    await favorite.populate("productIds");

    res.status(200).json({
      success: true,
      data: favorite.productIds,
      message: "Đã xóa sản phẩm khỏi danh sách yêu thích",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa sản phẩm khỏi danh sách yêu thích",
      error: error.message,
    });
  }
};

// Check if product is in favorites
exports.checkFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const favorite = await Favorite.findOne({ userId });
    const isFavorite = favorite
      ? favorite.productIds.includes(productId)
      : false;

    res.status(200).json({
      success: true,
      data: { isFavorite },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi kiểm tra sản phẩm yêu thích",
      error: error.message,
    });
  }
};

// Clear all favorites
exports.clearFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    const favorite = await Favorite.findOne({ userId });
    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh sách yêu thích",
      });
    }

    favorite.productIds = [];
    await favorite.save();

    res.status(200).json({
      success: true,
      data: [],
      message: "Đã xóa tất cả sản phẩm yêu thích",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa danh sách yêu thích",
      error: error.message,
    });
  }
};

// Count the number of favorites for each user
exports.countFavoritesByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the favorite list for the user
    const favorite = await Favorite.findOne({ userId });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh sách yêu thích của người dùng",
      });
    }

    const count = favorite.productIds.length;

    res.status(200).json({
      success: true,
      data: { userId, count },
      message: "Đếm số lượng sản phẩm yêu thích thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi đếm số lượng sản phẩm yêu thích",
      error: error.message,
    });
  }
};
