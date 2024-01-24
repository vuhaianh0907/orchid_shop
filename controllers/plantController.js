import asyncHandler from 'express-async-handler';
import Plant from '../models/plantModel.js';

// Plant functions

//@desc Create a new plant
//@route POST /api/plants
//@access private
const createPlant = asyncHandler(async (req, res) => {
  const { name, quantity, description, image, startingBid} = req.body;
  const { _id: seller } = req.user;

  const newPlant = await Plant.create({
    name,
    quantity,
    description,
    image,
    startingBid,
    seller,
    isAvailableForAuction: false,
    isActive: true,
  });

  res.status(201).json(newPlant);
});

//@desc Get all plants
//@route GET /api/plants
//@access public
const getAllPlants = asyncHandler(async (req, res) => {
  const plants = await Plant.find();
  res.status(200).json(plants);
});

//@desc Get a plant by ID
//@route GET /api/plants/:id
//@access public
const getPlantById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const plant = await Plant.findById(id);

  if (plant) {
    res.status(200).json(plant);
  } else {
    res.status(404).json({ message: 'Plant not found' });
  }
});

//@desc Update a plant by ID
//@route PUT /api/plants/:id
//@access private
const updatePlantById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: seller } = req.user;

  const updatedPlant = await Plant.findByIdAndUpdate(
    id,
    { ...req.body, seller },
    { new: true }
  );

  if (updatedPlant) {
    res.status(200).json(updatedPlant);
  } else {
    res.status(404).json({ message: 'Plant not found' });
  }
});

export { createPlant, getAllPlants, getPlantById, updatePlantById };

