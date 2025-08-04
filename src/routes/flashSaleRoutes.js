const express = require("express");
const router = express.Router();
const flashSaleController = require("../controllers/flashSaleController");

/**
 * @swagger
 * /api/flash-sale:
 *   get:
 *     summary: Lấy danh sách sản phẩm giảm giá
 *     tags: [FlashSale]
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm giảm giá
 */
router.get("/", flashSaleController.getFlashSales);

/**
 * @swagger
 * /api/flash-sale:
 *   post:
 *     summary: Thêm sản phẩm vào chương trình giảm giá
 *     tags: [FlashSale]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - startDate
 *               - endDate
 *               - discountPercentage
 *             properties:
 *               product:
 *                 type: string
 *                 description: ID sản phẩm
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: Ngày bắt đầu
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: Ngày kết thúc
 *               discountPercentage:
 *                 type: number
 *                 description: Phần trăm giảm giá
 *     responses:
 *       201:
 *         description: Thêm thành công
 */
router.post("/", flashSaleController.addFlashSale);

/**
 * @swagger
 * /api/flash-sale/{id}:
 *   put:
 *     summary: Cập nhật thông tin giảm giá
 *     tags: [FlashSale]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID sản phẩm giảm giá
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               discountPercentage:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/:id", flashSaleController.updateFlashSale);

/**
 * @swagger
 * /api/flash-sale/{id}:
 *   delete:
 *     summary: Xóa sản phẩm khỏi chương trình giảm giá
 *     tags: [FlashSale]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID sản phẩm giảm giá
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.delete("/:id", flashSaleController.deleteFlashSale);

module.exports = router;
