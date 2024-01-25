import express from 'express';
import { createPlant, getAllPlants, getPlantById, updatePlantById, removePlantById, getPlantsBySeller } from '../controllers/plantController.js';
import { protect } from '../middlewares/authMiddleware.js'; // Import your authentication middleware

const router = express.Router();


router.post('/plants/', protect, createPlant);
router.get('/plants/', getAllPlants);
router.get('/plants/:id', getPlantById);
router.put('/plants/:id', protect, updatePlantById);
router.delete('/plants/:id', protect, removePlantById);
router.get('/plants/seller/plants', protect, getPlantsBySeller);

export default router;
