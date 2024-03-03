import asyncHandler from "express-async-handler";
import Auction from "../models/auctionModel";
import Bid from "../models/bidModel";

//@desc Create a new auction
//@route POST /api/auctions
//@access private
const createAuction = asyncHandler(async (req, res) => {
  try {
    if (req.user.role !== 'manager') {
      res.status(401);
      throw new Error('Not authorized as a manager');
    }
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

//@desc Sign up plants for auction
//@route POST /api/auctions/signup
//@access private
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

//@desc Start an auction
//@route PUT /api/auctions/start
//@access private
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

//@desc End an auction
//@route PUT /api/auctions/end
//@access private
const endAuction = asyncHandler(async (req, res, next) => {
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
      throw new Error('You are not authorized to end the auction');
    }
    if (auction.status !== 'on-going') {
      res.status(400);
      throw new Error('Auction is not currently on-going');
    }
    auction.status = 'ended';
    auction.endTime = new Date();
    const savedAuction = await auction.save();

    res.status(200).json(savedAuction);
  } catch (error) {
    next(error);
  }
});

//@desc Get detail of an auction
//@route GET /api/auctions/:auctionId
//@access private
const getAuctionDetails = asyncHandler(async (req, res, next) => {
  const { auctionId } = req.params;

  try {
    const auction = await Auction.findById(auctionId);

    if (!auction) {
      res.status(404);
      throw new Error('Auction not found');
    }

    res.status(200).json(auction);
  } catch (error) {
    next(error);
  }
});

//@desc Get all auction
//@route GET /api/auctions
//@access private
const getAllAuctions = asyncHandler(async (req, res, next) => {
  try {
    const auctions = await Auction.find({});
    res.status(200).json(auctions);
  } catch (error) {
    next(error);
  }
});

//@desc Get all bids of user
//@route GET /api/bids
//@access private
const getMyBids = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  try {
    const bids = await Bid.find({ user: userId });

    if (!bids) {
      res.status(404);
      throw new Error('No bids found for this user');
    }

    res.status(200).json(bids);
  } catch (error) {
    next(error);
  }
});

//@desc Cancel an auction
//@route PUT /api/auctions/cancel
//@access private
const cancelAuction = asyncHandler(async (req, res, next) => {
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
      throw new Error('You are not authorized to cancel the auction');
    }
    if (auction.status !== 'on-going' && auction.status !== 'preparing') {
      res.status(400);
      throw new Error('Auction is not in a state that can be cancelled');
    }
    auction.status = 'cancelled';
    const savedAuction = await auction.save();

    res.status(200).json(savedAuction);
  } catch (error) {
    next(error);
  }
});

export {
  createAuction,
  signUpPlantsForAuction,
  startAuction,
  endAuction,
  getAuctionDetails,
  getAllAuctions,
  getMyBids,
  cancelAuction,
};