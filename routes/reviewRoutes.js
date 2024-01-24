import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createReview, updateReviewById, hideReviewById, getReviewsByPlantId } from '../controllers/reviewController.js';

const router = express.Router();

// Create a review for a plant
router.post('/reviews', protect, createReview);

// Update a review by ID
router.put('/reviews/:id', protect, updateReviewById);

// Hide a review by ID (staff and manager roles only)
router.put('/reviews/:id/hide', protect, hideReviewById);

router.get('/reviews/plant/:plantId', getReviewsByPlantId);

export default router;
