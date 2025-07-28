const express = require("express");
const router = express.Router();
const productTypeController = require("../controllers/productTypeController");

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductType:
 *       type: object
 *       required:
 *         - key
 *         - label
 *       properties:
 *         id:
 *           type: string
 *           description: ID tự động tạo của loại sản phẩm
 *         key:
 *           type: string
 *           description: Khóa duy nhất của loại sản phẩm
 *         label:
 *           type: string
 *           description: Tên hiển thị của loại sản phẩm
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
 *   name: ProductTypes
 *   description: API quản lý loại sản phẩm
 */

/**
 * @swagger
 * /api/product-types:
 *   get:
 *     summary: Lấy danh sách tất cả loại sản phẩm
 *     tags: [ProductTypes]
 *     responses:
 *       200:
 *         description: Danh sách loại sản phẩm
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
 *                     $ref: 'components/schemas/ProductType'
 */
router.get("/", productTypeController.getAllProductTypes);

/**
 * @swagger
 * /api/product-types/{key}:
 *   get:
 *     summary: Lấy thông tin loại sản phẩm theo key
 *     tags: [ProductTypes]
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Key của loại sản phẩm
 *     responses:
 *       200:
 *         description: Thông tin loại sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: 'components/schemas/ProductType'
 *       404:
 *         description: Không tìm thấy loại sản phẩm
 */
router.get("/:key", productTypeController.getProductTypeByKey);

/**
 * @swagger
 * /api/product-types:
 *   post:
 *     summary: Tạo loại sản phẩm mới
 *     tags: [ProductTypes]
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
 *         description: Tạo loại sản phẩm thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/", productTypeController.createProductType);

/**
 * @swagger
 * /api/product-types/{key}:
 *   put:
 *     summary: Cập nhật loại sản phẩm
 *     tags: [ProductTypes]
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Key của loại sản phẩm
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
 *         description: Không tìm thấy loại sản phẩm
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.put("/:key", productTypeController.updateProductType);

/**
 * @swagger
 * /api/product-types/{key}:
 *   delete:
 *     summary: Xóa loại sản phẩm
 *     tags: [ProductTypes]
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Key của loại sản phẩm
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy loại sản phẩm
 */
router.delete("/:key", productTypeController.deleteProductType);

module.exports = router;
