import express from "express";
import { eq } from "drizzle-orm";
import { db } from "./db/db.js";
import { matchRouter } from "./routes/matches.js";

const app = express();
const PORT = 8000;

// JSON middleware
app.use(express.json());

// Root GET route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Live Sports Dashboard API!" });
});

app.use("/matches", matchRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
