import socketIO from "socket.io";
import Auction from "../models/auctionModel";
import Bid from "../models/bidModel";

let io;

export function startSocket(server) {
  io = socketIO(server);

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("startAuction", async (auctionId) => {
      const auction = await Auction.findById(auctionId);
      // Add any necessary checks here
      io.emit("startAuction", auction);
    });

    socket.on("newBid", async (data) => {
      const { userId, bid, auctionId } = data;
      if (!isValidObjectId(userId)) {
        return io.to(socket.id).emit("error", "Invalid user ID");
      }

      const auction = await Auction.findById(auctionId);
      if (!auction.plantsHighestBids.size) {
        auction.plants.forEach((plant) =>
          auction.plantsHighestBids.set(plant, 0)
        );
      }

      if (!auction) {
        return io.to(socket.id).emit("error", "Auction not found");
      }

      if (auction.status !== "on-going") {
        return io.to(socket.id).emit("error", "Auction is not ongoing");
      }

      // Update auction's current bid and bidder
      const currentHighestBid = auction.plantsHighestBids.get(plantId);

      if (!currentHighestBid || bid > currentHighestBid) {
        auction.plantsHighestBids.set(plantId, bid);
      }
      auction.currentBid = bid;
      auction.currentHighestBidder = userId;

      await auction.save();

      io.to(auctionId).emit("highestBidUpdated", {
        plantId,
        highestBid: bid,
        bidder: userId,
      });
    });

    socket.on("endAuctionForPlant", async ({ plantId, highestBid }) => {
      const auction = await Auction.findOne({ plants: plantId });

      if (!auction) {
        return io.to(socket.id).emit("error", "Auction not found");
      }

      // Mark plant as sold
      auction.plantsSold.push(plantId);

      // If all plants sold, end auction
      if (auction.plantsSold.length === auction.plants.length) {
        auction.status = "ended";
        auction.endTime = Date.now();
      }

      await auction.save();

      io.to(auction._id).emit("plantSold", {
        plantId,
        soldFor: highestBid,
      });
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}
