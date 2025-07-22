import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import authenticateToken from "./middleware/authMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import gameRoutes from "./routes/games.js";
import tournamentRoutes from "./routes/tournaments.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", gameRoutes);
app.use("/api/tournaments", tournamentRoutes);

// Example protected route
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: `Welcome user ${req.user.id}` });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
