import asyncHandler from "express-async-handler";
import Auction from "../models/auctionModel";

const createAuction = asyncHandler(async (req, res) => {
  try {
    const { title, description, startingDate, endingDate, staffId } = req.body;
    const newAuction = new Auction({
      title: title,
      description: description,
      startingDate: startingDate,
      endingDate: endingDate,
      staff: staffId,
    });
    res.status(201).json(newAuction);
  } catch (error) {
    console.error("Error creating auction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const signUpPlantsForAuction = asyncHandler(async (req, res, next) => {
  const { auctionId, plantIds } = req.body;

  try {
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      res.status(404);
      throw new Error("Auction not found");
    }
    if (auction.status !== "preparing") {
      res.status(400);
      throw new Error("Auction is not in the preparing phase");
    }
    if (plantIds.length > 20 - auction.plants.length) {
      res.status(400);
      throw new Error(
        "Exceeds the maximum number of plants allowed for this auction"
      );
    }
    const plants = await Plant.find({ _id: { $in: plantIds } });
    if (plants.length !== plantIds.length) {
      res.status(404);
      throw new Error("Some of the specified plants were not found");
    }
    auction.plants.push(...plantIds);

    const savedAuction = await auction.save();

    res.status(200).json(savedAuction);
  } catch (error) {
    next(error);
  }
});

const startAuction = asyncHandler(async (req, res, next) => {
    const { auctionId } = req.body;
    const userId = req.user.id;

    try {
        const auction = await Auction.findById(auctionId);

        if (!auction) {
            res.status(404);
            throw new Error('Auction not found');
        }
        if (auction.staff.toString() !== userId) {
            res.status(403);
            throw new Error('You are not authorized to start the auction');
        }
        if (auction.status !== 'preparing') {
            res.status(400);
            throw new Error('Auction is not in the preparing phase');
        }
        auction.status = 'on-going';
        auction.startTime = new Date();
        const savedAuction = await auction.save();

        res.status(200).json(savedAuction);
    } catch (error) {
        next(error);
    }
});