import http from "http";
import app from "./app.js";
import dbConnect from "./db/db.js";
import dotenv from "dotenv";
dotenv.config();

// Start MongoDB Server
dbConnect();

// HTTP Server
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Start HTTP Server
server.listen(PORT, () => {
  console.log(`Server running at https://localhost:${PORT}`);
});
