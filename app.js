import express from "express";
import userRoutes from "./routers/user.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import earningRoutes from "./routers/earning.routes.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import cors from "cors";
import bodyParser from "body-parser";

// Initialize Express app
const app = express();

app.use(express.json());
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Earnings API");
});
app.use("/api/users", userRoutes);
app.use("/api/earnings", authMiddleware, earningRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handler Middleware
app.use(errorHandler);

export default app;
