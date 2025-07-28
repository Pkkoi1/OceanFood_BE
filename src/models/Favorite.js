const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Ensure one favorite list per user
FavoriteSchema.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", FavoriteSchema);
