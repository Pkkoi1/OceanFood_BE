const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - key
 *         - label
 *       properties:
 *         id:
 *           type: string
 *           description: ID tự động tạo của danh mục
 *         key:
 *           type: string
 *           description: Khóa duy nhất của danh mục
 *         label:
 *           type: string
 *           description: Tên hiển thị của danh mục
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
 *   name: Categories
 *   description: API quản lý danh mục sản phẩm
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Lấy danh sách tất cả danh mục
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Danh sách danh mục
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
 *                     $ref: 'components/schemas/Category'
 */
router.get("/", categoryController.getAllCategories);

/**
 * @swagger
 * /api/categories/{key}:
 *   get:
 *     summary: Lấy thông tin danh mục theo key
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Key của danh mục
 *     responses:
 *       200:
 *         description: Thông tin danh mục
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: 'components/schemas/Category'
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.get("/:key", categoryController.getCategoryByKey);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Tạo danh mục mới
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - key
 *               - label
 *             properties:
 *               key:
 *                 type: string
 *               label:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo danh mục thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/", categoryController.createCategory);

/**
 * @swagger
 * /api/categories/{key}:
 *   put:
 *     summary: Cập nhật danh mục
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Key của danh mục
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               label:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy danh mục
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.put("/:key", categoryController.updateCategory);

/**
 * @swagger
 * /api/categories/{key}:
 *   delete:
 *     summary: Xóa danh mục
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Key của danh mục
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.delete("/:key", categoryController.deleteCategory);

module.exports = router;
