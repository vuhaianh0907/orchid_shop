// socketServer.js
const asyncHandler = require('express-async-handler');
const io = require('socket.io')();

const plantAuctions = []; // Array to store auctions for each plant

// Function to start the auction for a plant
function startPlantAuction(plantId) {
    // Logic to start the auction for the specified plant
    const auction = {
        plantId: plantId,
        currentBid: 0,
        highestBidder: null,
        timerId: null
    };
    plantAuctions.push(auction);
    startAuctionTimer(auction);
}

// Function to start the auction timer for a plant
function startAuctionTimer(auction) {
    auction.timerId = setTimeout(() => {
        if (auction.highestBidder) {
            // If there's a highest bidder, end the auction
            endAuction(auction);
        } else {
            // If no bidder, start last chance timer
            startLastChanceTimer(auction);
        }
    }, 10000); // 10 seconds timer
}

// Function to start the last chance timer for a plant
function startLastChanceTimer(auction) {
    auction.timerId = setTimeout(() => {
        endAuction(auction);
    }, 10000); // 10 seconds last chance timer
}

// Function to handle bid for a plant
function placeBid(plantId, amount, bidderId) {
    const auction = plantAuctions.find(auction => auction.plantId === plantId);
    if (!auction) {
        // Auction not found
        return;
    }

    if (amount > auction.currentBid) {
        // New highest bid
        auction.currentBid = amount;
        auction.highestBidder = bidderId;

        // Restart the timer
        clearTimeout(auction.timerId);
        startAuctionTimer(auction);
        
        // Broadcast the new bid to all connected clients
        io.emit('newBid', { plantId: plantId, currentBid: amount, highestBidder: bidderId });
    }
}

// Function to end the auction for a plant
function endAuction(auction) {
    // Logic to end the auction for the specified plant
    // Determine the winner, notify the clients, etc.
    console.log(`Auction for plant ${auction.plantId} ended. Highest bidder: ${auction.highestBidder}, bid amount: ${auction.currentBid}`);
}

// Exporting Socket.IO instance
module.exports = io;

// Listening for connection events
io.on('connection', socket => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    // Example of using asyncHandler with a Socket.IO event handler
    socket.on('someEvent', asyncHandler(async (data) => {
        // Handle asynchronous operations here
        // For example, querying the database, making HTTP requests, etc.
        // Ensure to handle errors appropriately
    }));
});

// Exporting the auction-related functions
module.exports = { startPlantAuction, placeBid };


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
