import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    plantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },
    rating: { type: Number, required: true },
    feedback: { type: String },
    isVisible: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
