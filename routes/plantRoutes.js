import express from 'express';
import { createPlant, getAllPlants, getPlantById, updatePlantById, removePlantById, getPlantsBySeller, getPlantsByName } from '../controllers/plantController.js';
import { protect } from '../middlewares/authMiddleware.js'; // Import your authentication middleware

const router = express.Router();


router.post('/plants/', protect, createPlant);
router.get('/plants/', getAllPlants);
router.get('/plants/:id', getPlantById);
router.get('/plants/:name', getPlantsByName);
router.put('/plants/:id', protect, updatePlantById);
router.put('/plants/:id/remove', protect, removePlantById);
router.get('/seller/plants', protect, getPlantsBySeller);

export default router;
