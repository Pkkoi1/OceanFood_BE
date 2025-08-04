const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - product
 *         - quantity
 *         - price
 *       properties:
 *         product:
 *           type: string
 *           description: ID sản phẩm
 *         quantity:
 *           type: number
 *           minimum: 1
 *           description: Số lượng
 *         price:
 *           type: number
 *           minimum: 0
 *           description: Giá tại thời điểm thêm vào giỏ
 *     Cart:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID giỏ hàng
 *         userId:
 *           type: string
 *           description: ID người dùng
 *         items:
 *           type: array
 *           items:
 *             $ref: 'components/schemas/CartItem'
 *           description: Danh sách sản phẩm trong giỏ
 *         totalAmount:
 *           type: number
 *           minimum: 0
 *           description: Tổng tiền
 *         totalItems:
 *           type: number
 *           minimum: 0
 *           description: Tổng số sản phẩm
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
 *   name: Cart
 *   description: API quản lý giỏ hàng
 */

/**
 * @swagger
 * /api/cart/{userId}:
 *   get:
 *     summary: Lấy giỏ hàng của người dùng
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID người dùng
 *     responses:
 *       200:
 *         description: Thông tin giỏ hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: 'components/schemas/Cart'
 */
router.get("/:userId", cartController.getCart);

/**
 * @swagger
 * /api/cart/{userId}/add:
 *   post:
 *     summary: Thêm sản phẩm vào giỏ hàng
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID sản phẩm
 *               quantity:
 *                 type: number
 *                 minimum: 1
 *                 default: 1
 *                 description: Số lượng
 *     responses:
 *       200:
 *         description: Thêm thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.post("/:userId/add", cartController.addToCart);

/**
 * @swagger
 * /api/cart/{userId}/item/{itemId}:
 *   put:
 *     summary: Cập nhật số lượng sản phẩm trong giỏ hàng
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID người dùng
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID item trong giỏ hàng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *                 minimum: 0
 *                 description: Số lượng mới (0 để xóa)
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy giỏ hàng hoặc sản phẩm
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.put("/:userId/item/:itemId", cartController.updateCartItem);

/**
 * @swagger
 * /api/cart/{userId}/item/{itemId}:
 *   delete:
 *     summary: Xóa sản phẩm khỏi giỏ hàng
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID người dùng
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID item trong giỏ hàng
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy giỏ hàng hoặc sản phẩm
 */
router.delete("/:userId/item/:itemId", cartController.removeFromCart);

/**
 * @swagger
 * /api/cart/{userId}/clear:
 *   delete:
 *     summary: Xóa tất cả sản phẩm trong giỏ hàng
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID người dùng
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy giỏ hàng
 */
router.delete("/:userId/clear", cartController.clearCart);

/**
 * @swagger
 * /api/cart/{userId}/item/{productId}/quantity:
 *   put:
 *     summary: Thay đổi số lượng sản phẩm trong giỏ hàng
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID người dùng
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID sản phẩm
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *                 minimum: 0
 *                 description: Số lượng mới (0 để xóa sản phẩm)
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: 'components/schemas/Cart'
 *                 message:
 *                   type: string
 *       404:
 *         description: Không tìm thấy giỏ hàng hoặc sản phẩm
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.put(
  "/:userId/item/:productId/quantity",
  cartController.changeItemQuantity
);

module.exports = router;
