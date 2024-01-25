import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createReview, updateReviewById, hideReviewById, getReviewsByPlantId } from '../controllers/reviewController.js';

const router = express.Router();


router.post('/reviews/:plantId', protect, createReview);
router.put('/reviews/:id', protect, updateReviewById);
router.put('/reviews/:id/hide', protect, hideReviewById);
router.get('/reviews/:plantId', getReviewsByPlantId);

export default router;
