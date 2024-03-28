import express from "express";
import cors from "cors";
import { responseHandler } from "./middleware/response.handler.js";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

// Reverse-Proxy
app.set("trust proxy", 1);

// Middleware
app.use(cors());
app.use(express.json());
app.use(responseHandler);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);

// Static files
app.use(express.static("public"));

export default app;
