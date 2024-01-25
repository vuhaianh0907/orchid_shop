// routes/plantRoutes.js
import express from 'express';
import { createPlant, getAllPlants, getPlantById, updatePlantById, removePlantById, getPlantsBySeller } from '../controllers/plantController.js';
import { protect } from '../middlewares/authMiddleware.js'; // Import your authentication middleware

const router = express.Router();

// Create a new plant
router.post('/plants/', protect, createPlant);

// Get all plants
router.get('/plants/', getAllPlants);

// Get a plant by ID
router.get('/plants/:id', getPlantById);

// Update a plant by ID
router.put('/plants/:id', protect, updatePlantById);

// Delete a plant by ID
router.delete('/plants/:id', protect, removePlantById);

router.get('/plants/seller/plants', protect, getPlantsBySeller);

export default router;
