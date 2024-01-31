import asyncHandler from "express-async-handler";
import Plant from "../models/plantModel.js";

// Plant functions

//@desc Create a new plant
//@route POST /api/plants
//@access private
const createPlant = asyncHandler(async (req, res) => {
  const { name, quantity, description, image, startingBid } = req.body;
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
    res.status(404).json({ message: "Plant not found" });
  }
});

//@desc Update a plant by ID
//@route PUT /api/plants/:id
//@access private
const updatePlantById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedPlant = await Plant.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );

  if (updatedPlant) {
    res.status(200).json(updatedPlant);
  } else {
    res.status(404).json({ message: "Plant not found" });
  }
});

//@desc Remove a plant by ID
//@route PUT /api/plants/remove/:id
//@access private
const removePlantById = async (req, res) => {
  const plantId = req.params.id;

  try {
    /*
    const deletedPlant = await Plant.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
*/
/*
    if (deletedPlant) {
      res.status(200).json({ message: "Plant deleted successfully" });
    } else {
      res.status(404).json({ message: "Plant not found" });
    }
    */
    const plantToRemove = await Plant.findById(plantId);

    if (!plantToRemove) {
      res.status(404);
      throw new Error("Plant not found");
    }

    plantToRemove.isActive = false;

    const updatedPlant = await plantToRemove.save();
    res.status(200).json({
      _id: updatedPlant._id,
      name: updatedPlant.name,
      quantity: updatedPlant.quantity,
      description: updatedPlant.description,
      isActive: updatedPlant.isActive,
    });
  } catch (error) {
    console.error("Error deleting plant by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//@desc Get the plants of a user
//@route GET /api/plants/seller/plants
//@access private
const getPlantsBySeller = async (req, res) => {
  try {
    const { _id: seller } = req.user;

    const plants = await Plant.find({ seller });

    res.status(200).json(plants);
  } catch (error) {
    console.error("Error getting plants by seller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  createPlant,
  getAllPlants,
  getPlantById,
  updatePlantById,
  removePlantById,
  getPlantsBySeller,
};
