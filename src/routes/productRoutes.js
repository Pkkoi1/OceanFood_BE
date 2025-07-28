const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - image
 *         - category
 *         - type
 *       properties:
 *         id:
 *           type: string
 *           description: ID tự động tạo của sản phẩm
 *         name:
 *           type: string
 *           description: Tên sản phẩm
 *         price:
 *           type: number
 *           minimum: 0
 *           description: Giá hiện tại của sản phẩm
 *         originalPrice:
 *           type: number
 *           minimum: 0
 *           description: Giá gốc của sản phẩm
 *         discount:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *           description: Phần trăm giảm giá
 *         image:
 *           type: string
 *           description: Hình ảnh chính của sản phẩm
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách hình ảnh sản phẩm
 *         description:
 *           type: string
 *           description: Mô tả sản phẩm
 *         category:
 *           type: string
 *           description: Danh mục sản phẩm
 *         type:
 *           type: string
 *           description: Loại sản phẩm
 *         brand:
 *           type: string
 *           description: ID thương hiệu
 *         unit:
 *           type: string
 *           default: kg
 *           description: Đơn vị tính
 *         weight:
 *           type: number
 *           minimum: 0
 *           description: Trọng lượng
 *         inStock:
 *           type: boolean
 *           default: true
 *           description: Còn hàng hay không
 *         stockQuantity:
 *           type: number
 *           minimum: 0
 *           description: Số lượng tồn kho
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           description: Đánh giá trung bình
 *         reviewCount:
 *           type: number
 *           minimum: 0
 *           description: Số lượng đánh giá
 *         isNew:
 *           type: boolean
 *           default: false
 *           description: Sản phẩm mới
 *         isFeatured:
 *           type: boolean
 *           default: false
 *           description: Sản phẩm nổi bật
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Các tag của sản phẩm
 *         currentPrice:
 *           type: number
 *           description: Giá hiện tại sau khi tính giảm giá (virtual field)
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
 *   name: Products
 *   description: API quản lý sản phẩm
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lấy danh sách tất cả sản phẩm không cần lọc
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Danh sách tất cả sản phẩm
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
 *                     $ref: '#/components/schemas/Product'
 */
router.get("/", productController.getAllProductsNoFilter);

/**
 * @swagger
 * /api/products/featured:
 *   get:
 *     summary: Lấy danh sách sản phẩm nổi bật
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 8
 *         description: Số sản phẩm tối đa
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm nổi bật
 */
router.get("/featured", productController.getFeaturedProducts);

/**
 * @swagger
 * /api/products/new:
 *   get:
 *     summary: Lấy danh sách sản phẩm mới
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 8
 *         description: Số sản phẩm tối đa
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm mới
 */
router.get("/new", productController.getNewProducts);

/**
 * @swagger
 * /api/products/category/{category}:
 *   get:
 *     summary: Lấy sản phẩm theo danh mục
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Key của danh mục
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
 *         description: Số sản phẩm mỗi trang
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: -createdAt
 *         description: Sắp xếp
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm theo danh mục
 */
router.get("/category/:category", productController.getProductsByCategory);

/**
 * @swagger
 * /api/products/all:
 *   get:
 *     summary: Lấy tất cả sản phẩm không cần lọc
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Danh sách tất cả sản phẩm
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
router.get("/all", productController.getAllProductsNoFilter);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Lấy thông tin sản phẩm theo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của sản phẩm
 *     responses:
 *       200:
 *         description: Thông tin sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: 'components/schemas/Product'
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.get("/:id", productController.getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Tạo sản phẩm mới
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: 'components/schemas/Product'
 *     responses:
 *       201:
 *         description: Tạo sản phẩm thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/", productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của sản phẩm
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: 'components/schemas/Product'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.put("/:id", productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Xóa sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của sản phẩm
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.delete("/:id", productController.deleteProduct);

module.exports = router;
