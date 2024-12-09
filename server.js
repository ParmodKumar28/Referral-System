import dotnev from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { PORT } from "./config/environment.js";
import {createServer} from "http";
import { initializeSocket } from "./sockets/socket.js";

dotnev.config();
connectDB();

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO
initializeSocket(server);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
