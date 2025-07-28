const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       required:
 *         - name
 *         - logo
 *       properties:
 *         id:
 *           type: string
 *           description: ID tự động tạo của thương hiệu
 *         name:
 *           type: string
 *           description: Tên thương hiệu
 *         logo:
 *           type: string
 *           description: Đường dẫn logo thương hiệu
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
 *   name: Brands
 *   description: API quản lý thương hiệu
 */

/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Lấy danh sách tất cả thương hiệu
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Danh sách thương hiệu
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
 *                     $ref: 'components/schemas/Brand'
 */
router.get("/", brandController.getAllBrands);

/**
 * @swagger
 * /api/brands/{id}:
 *   get:
 *     summary: Lấy thông tin thương hiệu theo ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của thương hiệu
 *     responses:
 *       200:
 *         description: Thông tin thương hiệu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: 'components/schemas/Brand'
 *       404:
 *         description: Không tìm thấy thương hiệu
 */
router.get("/:id", brandController.getBrandById);

/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: Tạo thương hiệu mới
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - logo
 *             properties:
 *               name:
 *                 type: string
 *               logo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo thương hiệu thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/", brandController.createBrand);

/**
 * @swagger
 * /api/brands/{id}:
 *   put:
 *     summary: Cập nhật thương hiệu
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của thương hiệu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               logo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy thương hiệu
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.put("/:id", brandController.updateBrand);

/**
 * @swagger
 * /api/brands/{id}:
 *   delete:
 *     summary: Xóa thương hiệu
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của thương hiệu
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy thương hiệu
 */
router.delete("/:id", brandController.deleteBrand);

module.exports = router;
