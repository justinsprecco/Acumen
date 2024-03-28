import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { responseHandler } from "./middleware/response.handler.js";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";

// Absolute Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express Setup
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(responseHandler);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);

// Static files
app.use(express.static(path.join(__dirname, "../public")));

// Catch Route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

export default app;
