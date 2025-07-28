const Product = require("../models/Product");
const mongoose = require("mongoose");

// Get all products with filters
exports.getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      type,
      brand,
      minPrice,
      maxPrice,
      inStock,
      isNew,
      isFeatured,
      search,
      sort = "-createdAt",
    } = req.query;

    // Build filter object
    const filter = {};

    if (category) filter.category = category;
    if (type) filter.type = type;
    if (brand) filter.brand = brand;
    if (inStock !== undefined) filter.inStock = inStock === "true";
    if (isNew !== undefined) filter.isNew = isNew === "true";
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === "true";

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .populate("brand")
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: Number(limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách sản phẩm",
      error: error.message,
    });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra nếu id không phải là ObjectId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "ID không hợp lệ",
      });
    }

    const product = await Product.findById(id).populate("brand");
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông tin sản phẩm",
      error: error.message,
    });
  }
};

// Get featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const { limit = 8 } = req.query;
    const products = await Product.find({ isFeatured: true })
      .populate("brand")
      .limit(Number(limit))
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy sản phẩm nổi bật",
      error: error.message,
    });
  }
};

// Get new products
exports.getNewProducts = async (req, res) => {
  try {
    const { limit = 8 } = req.query;
    const products = await Product.find({ isNew: true })
      .populate("brand")
      .limit(Number(limit))
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy sản phẩm mới",
      error: error.message,
    });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ categories: category });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy sản phẩm theo danh mục",
      error: error.message,
    });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    await product.populate("brand");

    res.status(201).json({
      success: true,
      data: product,
      message: "Tạo sản phẩm thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi tạo sản phẩm",
      error: error.message,
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("brand");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
      message: "Cập nhật sản phẩm thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi cập nhật sản phẩm",
      error: error.message,
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });
    }
    res.status(200).json({
      success: true,
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa sản phẩm",
      error: error.message,
    });
  }
};

/**
 * Get all products without any filters
 */
exports.getAllProductsNoFilter = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

/**
 * Filter products by multiple criteria
 */
exports.filterProducts = async (req, res) => {
  try {
    const { category, priceRange, types, origins } = req.query;

    const filter = {};

    // Filter by category
    if (category) {
      filter.categories = category;
    }

    // Filter by price range
    if (priceRange) {
      const [minPrice, maxPrice] = (() => {
        switch (priceRange) {
          case "under-500k":
            return [0, 500000];
          case "500k-1m":
            return [500000, 1000000];
          case "1m-3m":
            return [1000000, 3000000];
          case "3m-5m":
            return [3000000, 5000000];
          case "5m-7m":
            return [5000000, 7000000];
          case "over-7m":
            return [7000000, Infinity];
          default:
            return [0, Infinity];
        }
      })();
      filter.currentPrice = { $gte: minPrice, $lte: maxPrice };
    }

    // Filter by types
    if (types) {
      const typesArray = Array.isArray(types) ? types : [types];
      filter.type = { $in: typesArray };
    }

    // Filter by origins
    if (origins) {
      const originsArray = Array.isArray(origins) ? origins : [origins];
      filter.origin = {
        $in: originsArray.map((origin) =>
          origin.toLowerCase().replace(/\s+/g, "-")
        ),
      };
    }

    const products = await Product.find(filter);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lọc danh sách sản phẩm",
      error: error.message,
    });
  }
};
