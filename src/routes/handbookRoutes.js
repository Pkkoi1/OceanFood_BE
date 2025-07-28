const express = require("express");
const router = express.Router();
const handbookController = require("../controllers/handbookController");

/**
 * @swagger
 * components:
 *   schemas:
 *     HandbookArticleSection:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: Tiêu đề phần
 *         content:
 *           type: string
 *           description: Nội dung phần
 *         image:
 *           type: string
 *           description: Hình ảnh của phần
 *     HandbookArticle:
 *       type: object
 *       required:
 *         - title
 *         - slug
 *         - excerpt
 *         - image
 *         - author
 *         - readTime
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: ID tự động tạo của bài viết
 *         title:
 *           type: string
 *           description: Tiêu đề bài viết
 *         slug:
 *           type: string
 *           description: Slug duy nhất của bài viết
 *         excerpt:
 *           type: string
 *           description: Tóm tắt bài viết
 *         image:
 *           type: string
 *           description: Hình ảnh đại diện
 *         author:
 *           type: string
 *           description: Tác giả
 *         readTime:
 *           type: string
 *           description: Thời gian đọc ước tính
 *         category:
 *           type: string
 *           description: Danh mục bài viết
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Các tag của bài viết
 *         sections:
 *           type: array
 *           items:
 *             $ref: 'components/schemas/HandbookArticleSection'
 *           description: Các phần của bài viết
 *         isPublished:
 *           type: boolean
 *           default: true
 *           description: Trạng thái xuất bản
 *         viewCount:
 *           type: number
 *           minimum: 0
 *           description: Số lượt xem
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian tạo
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian cập nhật
 */

/**
 * @swagger
 * tags:
 *   name: Handbook
 *   description: API quản lý cẩm nang
 */

/**
 * @swagger
 * /api/handbook:
 *   get:
 *     summary: Lấy danh sách bài viết cẩm nang
 *     tags: [Handbook]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số bài viết mỗi trang
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Lọc theo danh mục
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Lọc theo tag
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tiêu đề, tóm tắt, tags
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: -createdAt
 *         description: Sắp xếp
 *     responses:
 *       200:
 *         description: Danh sách bài viết
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: 'components/schemas/HandbookArticle'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalItems:
 *                       type: integer
 *                     itemsPerPage:
 *                       type: integer
 */
router.get("/", handbookController.getAllArticles);

/**
 * @swagger
 * /api/handbook/featured:
 *   get:
 *     summary: Lấy danh sách bài viết nổi bật
 *     tags: [Handbook]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 3
 *         description: Số bài viết tối đa
 *     responses:
 *       200:
 *         description: Danh sách bài viết nổi bật
 */
router.get("/featured", handbookController.getFeaturedArticles);

/**
 * @swagger
 * /api/handbook/category/{category}:
 *   get:
 *     summary: Lấy bài viết theo danh mục
 *     tags: [Handbook]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Danh mục bài viết
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số bài viết mỗi trang
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: -createdAt
 *         description: Sắp xếp
 *     responses:
 *       200:
 *         description: Danh sách bài viết theo danh mục
 */
router.get("/category/:category", handbookController.getArticlesByCategory);

/**
 * @swagger
 * /api/handbook/{slug}:
 *   get:
 *     summary: Lấy bài viết theo slug
 *     tags: [Handbook]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug của bài viết
 *     responses:
 *       200:
 *         description: Thông tin bài viết
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: 'components/schemas/HandbookArticle'
 *       404:
 *         description: Không tìm thấy bài viết
 */
router.get("/:slug", handbookController.getArticleBySlug);

/**
 * @swagger
 * /api/handbook:
 *   post:
 *     summary: Tạo bài viết mới
 *     tags: [Handbook]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: 'components/schemas/HandbookArticle'
 *     responses:
 *       201:
 *         description: Tạo bài viết thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/", handbookController.createArticle);

/**
 * @swagger
 * /api/handbook/{id}:
 *   put:
 *     summary: Cập nhật bài viết
 *     tags: [Handbook]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của bài viết
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: 'components/schemas/HandbookArticle'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy bài viết
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.put("/:id", handbookController.updateArticle);

/**
 * @swagger
 * /api/handbook/{id}:
 *   delete:
 *     summary: Xóa bài viết
 *     tags: [Handbook]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của bài viết
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy bài viết
 */
router.delete("/:id", handbookController.deleteArticle);

module.exports = router;
