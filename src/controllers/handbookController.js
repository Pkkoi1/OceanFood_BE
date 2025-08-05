const HandbookArticle = require("../models/HandbookArticle");

// Get all handbook articles
exports.getAllArticles = async (req, res) => {
  console.log("getAllArticles called"); // Log kiểm tra
  try {
    const articles = await HandbookArticle.find().sort("-createdAt");

    res.status(200).json({
      success: true,
      data: articles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách bài viết",
      error: error.message,
    });
  }
};

// Get article by slug
exports.getArticleBySlug = async (req, res) => {
  console.log("getArticleBySlug called with slug:", req.params.slug); // Log kiểm tra
  try {
    const article = await HandbookArticle.findOne({
      slug: req.params.slug,
      isPublished: true,
    });

    if (!article) {
      return res.status(404).json({
        success: false,
        message: `Không tìm thấy bài viết với slug: ${req.params.slug}`,
      });
    }

    // Increment view count
    article.viewCount += 1;
    await article.save();

    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi lấy bài viết theo slug",
      error: error.message,
    });
  }
};

// Get featured articles
exports.getFeaturedArticles = async (req, res) => {
  console.log("getFeaturedArticles called with limit:", req.query.limit); // Log kiểm tra
  try {
    const { limit = 3 } = req.query;
    const articles = await HandbookArticle.find({ isPublished: true })
      .select("-sections")
      .sort("-viewCount")
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: articles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy bài viết nổi bật",
      error: error.message,
    });
  }
};

// Get articles by category
exports.getArticlesByCategory = async (req, res) => {
  console.log(
    "getArticlesByCategory called with category:",
    req.params.category
  ); // Log kiểm tra
  console.log(
    "Pagination params - page:",
    req.query.page,
    "limit:",
    req.query.limit
  ); // Log kiểm tra
  try {
    const { category } = req.params;
    const { page = 1, limit = 10, sort = "-createdAt" } = req.query;

    const skip = (page - 1) * limit;

    const articles = await HandbookArticle.find({
      category,
      isPublished: true,
    })
      .select("-sections")
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await HandbookArticle.countDocuments({
      category,
      isPublished: true,
    });

    res.status(200).json({
      success: true,
      data: articles,
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
      message: "Lỗi khi lấy bài viết theo danh mục",
      error: error.message,
    });
  }
};

// Create new article
exports.createArticle = async (req, res) => {
  console.log("createArticle called with body:", req.body); // Log kiểm tra
  try {
    const article = new HandbookArticle(req.body);
    await article.save();

    res.status(201).json({
      success: true,
      data: article,
      message: "Tạo bài viết thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Lỗi khi tạo bài viết",
      error: error.message,
    });
  }
};

// Update article
exports.updateArticle = async (req, res) => {
  console.log(
    "updateArticle called with id:",
    req.params.id,
    "body:",
    req.body
  ); // Log kiểm tra
  try {
    const article = await HandbookArticle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: `Không tìm thấy bài viết với ID: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: article,
      message: "Cập nhật bài viết thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Dữ liệu không hợp lệ khi cập nhật bài viết",
      error: error.message,
    });
  }
};

// Delete article
exports.deleteArticle = async (req, res) => {
  console.log("deleteArticle called with id:", req.params.id); // Log kiểm tra
  try {
    const article = await HandbookArticle.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: `Không tìm thấy bài viết để xóa với ID: ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Xóa bài viết thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi xóa bài viết",
      error: error.message,
    });
  }
};

const removeVietnameseTones = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

// filepath: d:\Study\ThucTap\Xtech789\source_code\OceanFood\OceanFood_BE\src\controllers\handbookController.js
exports.getArticlesByTitle = async (req, res) => {
  console.log("getArticlesByTitle called with title:", req.query.title); // Log kiểm tra
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp tiêu đề bài viết để tìm kiếm",
      });
    }

    const normalizedTitle = removeVietnameseTones(title);
    console.log("Normalized title:", normalizedTitle); // Log từ khóa tìm kiếm

    const articles = await HandbookArticle.find({
      title: { $regex: normalizedTitle, $options: "i" }, // Tìm kiếm không phân biệt chữ hoa/chữ thường
    });

    if (articles.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Không tìm thấy bài viết nào với tiêu đề: "${title}"`,
      });
    }

    res.status(200).json({
      success: true,
      data: articles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tìm bài viết theo tiêu đề",
      error: error.message,
    });
  }
};

// Get article by ID
exports.getArticleById = async (req, res) => {
  console.log("getArticleById called with id:", req.params.id); // Log kiểm tra
  try {
    const article = await HandbookArticle.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: `Không tìm thấy bài viết với ID: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi lấy bài viết theo ID",
      error: error.message,
    });
  }
};
