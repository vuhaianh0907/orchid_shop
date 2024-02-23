import Review from "../models/reviewModel.js";
import Plant from "../models/plantModel.js";

// Plant functions

//@desc Create a new review
//@route POST /api/reviews/:plantId
//@access private
const createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, feedback } = req.body;
    const plantId = req.params.plantId;

    const existingReview = await Review.findOne({ userId, plantId });
    if (existingReview) {
      res.status(400).json({ message: "You have already reviewed this plant" });
      return;
    }

    const newReview = await Review.create({
      userId,
      plantId,
      rating,
      feedback,
      isVisible: true,
    });

    await updateAverageRating(plantId);

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//@desc Update a review
//@route PUT /api/reviews/:id
//@access private
const updateReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedReview = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedReview) {
      await updateAverageRating(updatedReview.plantId);
      res.status(200).json(updatedReview);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    console.error("Error updating review by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//@desc Hide a review
//@route PUT /api/reviews/:id/hide
//@access private
const hideReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const { role } = req.user;
    if (role !== "staff" && role !== "manager") {
      res
        .status(403)
        .json({
          message: "Permission denied. Staff or manager role required.",
        });
      return;
    }
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { isVisible: false },
      { new: true }
    );

    if (updatedReview) {
      res.status(200).json(updatedReview);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    console.error("Error hiding review by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//@desc Get reviews of a plant
//@route GET /api/reviews/:plantId
//@access public
const getReviewsByPlantId = async (req, res) => {
  const { plantId } = req.params;
  try {
    const reviews = await Review.find({ plantId, isVisible: true });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error getting reviews by plantId:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//@desc Get reviews of a plant
//@route GET /api/reviews
//@access public
const getAllReviewsWithPlants = async (req, res) => {
  try {
    const reviewsWithPlants = await Review.find({ isVisible: true }).populate('plantId');
    
    const reviewsData = reviewsWithPlants.map(review => ({
      feedback: review.feedback,
      rating: review.rating,
      plant: {
        plantId: review.plantId,
      }
    }));

    res.status(200).json(reviewsData);
  } catch (error) {
    console.error("Error getting all reviews with plants:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const updateAverageRating = async (plantId) => {
  try {
    const reviews = await Review.find({ plantId });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
    await Plant.findByIdAndUpdate(plantId, { averageRating }, { new: true });
  } catch (error) {
    console.error("Error updating average rating:", error);
  }
};

export { createReview, updateReviewById, hideReviewById, getReviewsByPlantId, getAllReviewsWithPlants };
