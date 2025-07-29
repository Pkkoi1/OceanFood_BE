const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    description: [
      {
        title: {
          type: String,
          trim: true,
        },
        content: {
          type: String,
          trim: true,
        },
      },
    ],
    origin: {
      type: String,
      trim: true,
      required: true,
    },
    commitment: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    unit: {
      type: String,
      default: "kg",
    },
    weight: {
      type: Number,
      min: 0,
    },
    condition: {
      type: String,
      null: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stockQuantity: {
      type: Number,
      min: 0,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    categories: [
      {
        type: String,
        trim: true,
      },
    ],
    stockStatus: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for current price (considering discount)
ProductSchema.virtual("currentPrice").get(function () {
  if (this.discount > 0 && this.originalPrice) {
    return this.originalPrice * (1 - this.discount / 100);
  }
  return this.price;
});

// Ensure virtual fields are serialized
ProductSchema.set("toJSON", { virtuals: true });
ProductSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Product", ProductSchema);
