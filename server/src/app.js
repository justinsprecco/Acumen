import express from "express";
import cors from "cors";
import { responseHandler } from "./middleware/response.handler.js";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(responseHandler);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);

// Statics
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});
export default app;
