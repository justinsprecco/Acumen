import express from "express";
import cors from "cors";
import { json } from "express";
import { responseHandler } from "./middleware/response.handler.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(json());
app.use(responseHandler);

// Routes
app.use("/api/auth", authRoutes);

export default app;
