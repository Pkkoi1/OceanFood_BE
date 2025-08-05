/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         product:
 *           type: string
 *           description: ID sản phẩm
 *         quantity:
 *           type: number
 *           description: Số lượng
 *         price:
 *           type: number
 *           description: Giá tại thời điểm đặt hàng
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *           description: ID người dùng
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         totalAmount:
 *           type: number
 *         status:
 *           type: string
 *           enum: [pending, processing, shipped, delivered, cancelled]
 *         shippingAddress:
 *           type: string
 *         phone:
 *           type: string
 *         note:
 *           type: string
 *         paymentMethod:
 *           type: string
 *           enum: [cod, banking, momo]
 *         isPaid:
 *           type: boolean
 *         paidAt:
 *           type: string
 *           format: date-time
 *         deliveredAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
const mongoose = require("mongoose");
const OrderItemSchema = require("./OrderItem");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [OrderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "banking", "momo"],
      default: "cod",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("Order", OrderSchema);
