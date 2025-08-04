const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get cart by user ID
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    let cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy giỏ hàng",
      error: error.message,
    });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity = 1 } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.currentPrice || product.price,
      });
    }

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      data: cart,
      message: "Đã thêm sản phẩm vào giỏ hàng",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi thêm sản phẩm vào giỏ hàng",
      error: error.message,
    });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy giỏ hàng",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm trong giỏ hàng để cập nhật",
      });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      data: cart,
      message: "Đã cập nhật giỏ hàng",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi cập nhật giỏ hàng",
      error: error.message,
    });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy giỏ hàng",
      });
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      data: cart,
      message: "Đã xóa sản phẩm khỏi giỏ hàng",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa sản phẩm khỏi giỏ hàng",
      error: error.message,
    });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy giỏ hàng",
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
      message: "Đã xóa tất cả sản phẩm khỏi giỏ hàng",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa giỏ hàng",
      error: error.message,
    });
  }
};

// Change item quantity
exports.changeItemQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.params; // Sử dụng productId để tìm sản phẩm
    const { quantity } = req.body; // Số lượng mới

    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Số lượng không thể nhỏ hơn 0",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy giỏ hàng",
      });
    }

    // Tìm sản phẩm trong giỏ hàng bằng productId
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm trong giỏ hàng",
      });
    }

    if (quantity === 0) {
      // Xóa sản phẩm nếu số lượng là 0
      cart.items.splice(itemIndex, 1);
    } else {
      // Cập nhật số lượng sản phẩm
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      data: cart,
      message: "Đã cập nhật số lượng sản phẩm",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi thay đổi số lượng sản phẩm",
      error: error.message,
    });
  }
};
  