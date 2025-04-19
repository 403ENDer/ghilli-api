import express from "express";
import mongoose from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
import indexRouter from "./routes/index.routes";
import { setupWebSocket } from "./socket.io";
import { createServer } from "http";
import { swaggerSpec, swaggerUi } from "./swagger";

dotenv.config();

const app = express();

const server = createServer(app);
setupWebSocket(server);

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", indexRouter);
server.listen(PORT, () => {
  mongoose.connect;
  console.log(`Server is running on ${HOST}:${PORT}`);
});
