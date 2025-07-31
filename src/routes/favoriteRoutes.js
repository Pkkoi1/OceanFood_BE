const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID danh sách yêu thích
 *         userId:
 *           type: string
 *           description: ID người dùng
 *         productIds:
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách ID sản phẩm yêu thích
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
 *   name: Favorites
 *   description: API quản lý sản phẩm yêu thích
 */

/**
 * @swagger
 * /api/favorites/{userId}:
 *   get:
 *     summary: Lấy danh sách sản phẩm yêu thích của người dùng
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID người dùng
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm yêu thích
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
 *                     $ref: 'components/schemas/Product'
 */
router.get("/:userId", favoriteController.getFavorites);

/**
 * @swagger
 * /api/favorites/{userId}/add:
 *   post:
 *     summary: Thêm sản phẩm vào danh sách yêu thích
 *     tags: [Favorites]
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
 *     responses:
 *       200:
 *         description: Thêm thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.post("/:userId/add", favoriteController.addToFavorites);

/**
 * @swagger
 * /api/favorites/{userId}/check/{productId}:
 *   get:
 *     summary: Kiểm tra sản phẩm có trong danh sách yêu thích không
 *     tags: [Favorites]
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
 *     responses:
 *       200:
 *         description: Kết quả kiểm tra
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     isFavorite:
 *                       type: boolean
 */
router.get("/:userId/check/:productId", favoriteController.checkFavorite);

/**
 * @swagger
 * /api/favorites/{userId}/remove/{productId}:
 *   delete:
 *     summary: Xóa sản phẩm khỏi danh sách yêu thích
 *     tags: [Favorites]
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
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy danh sách yêu thích
 */
router.delete(
  "/:userId/remove/:productId",
  favoriteController.removeFromFavorites
);

/**
 * @swagger
 * /api/favorites/{userId}/clear:
 *   delete:
 *     summary: Xóa tất cả sản phẩm yêu thích
 *     tags: [Favorites]
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
 *         description: Không tìm thấy danh sách yêu thích
 */
router.delete("/:userId/clear", favoriteController.clearFavorites);

/**
 * @swagger
 * /api/favorites/{userId}/count:
 *   get:
 *     summary: Đếm số lượng sản phẩm yêu thích của người dùng
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID người dùng
 *     responses:
 *       200:
 *         description: Số lượng sản phẩm yêu thích
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     count:
 *                       type: integer
 *       404:
 *         description: Không tìm thấy danh sách yêu thích
 */
router.get("/:userId/count", favoriteController.countFavoritesByUser);

module.exports = router;
