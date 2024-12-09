import { Server } from "socket.io";

let io;

const userSocketMap = {};

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Allow all origins (can be restricted in production)
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Associating user ID with the socket
    socket.on("identify", (userId) => {
      userSocketMap[userId] = socket.id;
      console.log(`User identified: ${userId}`);
    });

    // User disconnection
    socket.on("disconnect", () => {
      const userId = Object.keys(userSocketMap).find(
        (key) => userSocketMap[key] === socket.id
      );
      if (userId) delete userSocketMap[userId];
      console.log("User disconnected:", socket.id);
    });
  });
};

// Notify user using their socket ID
export const notifyUser = (userId, data) => {
    const socketId = userSocketMap[userId];
    if (socketId) {
      io.to(socketId).emit('earningsUpdate', data);
    }
};
