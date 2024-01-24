// controllers/reviewController.js
import Review from '../models/reviewModel.js';
import Plant from '../models/plantModel.js';

// Create a review for a plant
const createReview = async (req, res) => {
  try {
    const { userId, plantId, rating, feedback } = req.body;

    // Check if the user has already reviewed the same plant
    const existingReview = await Review.findOne({ userId, plantId });

    if (existingReview) {
      res.status(400).json({ message: 'You have already reviewed this plant' });
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
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a review by ID
const updateReviewById = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true });

    if (updatedReview) {
      await updateAverageRating(updatedReview.plantId);
      res.status(200).json(updatedReview);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    console.error('Error updating review by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const hideReviewById = async (req, res) => {
  const { id } = req.params;

  try {
    // Assuming req.user is set by your authentication middleware and contains information about the logged-in user
    const { role } = req.user;

    // Check if the user has the necessary role to hide reviews
    if (role !== 'staff' && role !== 'manager') {
      res.status(403).json({ message: 'Permission denied. Staff or manager role required.' });
      return;
    }

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { isVisible: false }, // Set isVisible to false to hide the review
      { new: true }
    );

    if (updatedReview) {
      res.status(200).json(updatedReview);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    console.error('Error hiding review by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getReviewsByPlantId = async (req, res) => {
  const { plantId } = req.params;

  try {
    const reviews = await Review.find({ plantId });

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error getting reviews by plantId:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateAverageRating = async (plantId) => {
  try {
    const reviews = await Review.find({ plantId });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    await Plant.findByIdAndUpdate(plantId, { averageRating }, { new: true });
  } catch (error) {
    console.error('Error updating average rating:', error);
  }
};

export { createReview, updateReviewById, hideReviewById, getReviewsByPlantId, updateAverageRating };

