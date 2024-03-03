import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';

import {
  createAuction,
  signUpPlantsForAuction,
  startAuction,
  endAuction,
  getAuctionDetails,
  getAllAuctions,
  getMyBids,
  cancelAuction
} from '../controllers/auctionController.js';

const router = express.Router();

router.post('/auctions', protect, createAuction);

router.post('/auctions/signup', protect, signUpPlantsForAuction);

router.put('/auctions/start', protect, startAuction); 

router.put('/auctions/end', protect, endAuction);

router.get('/auctions/:auctionId', protect, getAuctionDetails);

router.get('/auctions', protect, getAllAuctions);

router.get('/bids', protect, getMyBids);

router.put('/auctions/cancel', protect, cancelAuction);

export default router;
