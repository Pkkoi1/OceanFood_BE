const HandbookArticle = require("../models/HandbookArticle");

// Get all handbook articles
exports.getAllArticles = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tag,
      search,
      sort = "-createdAt",
    } = req.query;

    const filter = { isPublished: true };

    if (category) filter.category = category;
    if (tag) filter.tags = { $in: [tag] };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const skip = (page - 1) * limit;

    const articles = await HandbookArticle.find(filter)
      .select("-sections") // Exclude sections for list view
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await HandbookArticle.countDocuments(filter);

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
      message: "Lỗi khi lấy danh sách bài viết",
      error: error.message,
    });
  }
};

// Get article by slug
exports.getArticleBySlug = async (req, res) => {
  try {
    const article = await HandbookArticle.findOne({
      slug: req.params.slug,
      isPublished: true,
    });

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bài viết",
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
      message: "Lỗi khi lấy thông tin bài viết",
      error: error.message,
    });
  }
};

// Get featured articles
exports.getFeaturedArticles = async (req, res) => {
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
  try {
    const article = await HandbookArticle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bài viết",
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
      message: "Lỗi khi cập nhật bài viết",
      error: error.message,
    });
  }
};

// Delete article
exports.deleteArticle = async (req, res) => {
  try {
    const article = await HandbookArticle.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bài viết",
      });
    }
    res.status(200).json({
      success: true,
      message: "Xóa bài viết thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa bài viết",
      error: error.message,
    });
  }
};
