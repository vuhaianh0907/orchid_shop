import socketIO from 'socket.io';
import Auction from "../models/auctionModel";
import Bid from "../models/bidModel";

let io;

export function startSocket(server) {
  io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('startAuction', async (auctionId) => {
      const auction = await Auction.findById(auctionId);
      // Add any necessary checks here
      io.emit('startAuction', auction);
    });

    socket.on('newBid', async (data) => {
      const { userId, bid, auctionId } = data;
      // Add your bid logic here
      const newBid = new Bid({ user: userId, bid: bid, auction: auctionId });
      await newBid.save();
      io.emit('updateHighestBid', newBid);
    });

    socket.on('endAuctionForPlant', async (data) => {
      const { plantId, highestBid } = data;
      // Add your logic to end the auction for the plant here
      io.emit('endAuctionForPlant', { plantId, highestBid });
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
}

export function getIO() {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
}
