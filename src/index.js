import express from "express";
import http from "http";
import { eq } from "drizzle-orm";
import { db } from "./db/db.js";
import { matchRouter } from "./routes/matches.js";
import { attachWebSocketServer } from "./ws/server.js";
import { securityMiddleware } from "./arcjet.js";
import { commentaryRouter } from "./routes/commentary.js";

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 8000);

const app = express();
const server = http.createServer(app);

// JSON middleware
app.use(securityMiddleware());
app.use(express.json());

const { broadcastMatchCreated } = attachWebSocketServer(server);
app.locals.broadcastMatchCreated = broadcastMatchCreated;

app.use("/matches", matchRouter);
app.use("/matches/:id/commentary", commentaryRouter);

// Root GET route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Live Sports Dashboard API!" });
});

// Start server
server.listen(PORT, HOST, () => {
  const baseUrl =
    HOST === "0.0.0.0" ? `http://localhost:${PORT}` : `http://${HOST}:${PORT}`;
  console.log(`Server is running on baseUrl`);
  console.log(
    `WebSocket Server is running on ${baseUrl.replace("http", "ws")}/ws`,
  );
});
