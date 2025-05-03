import express from 'express';
import mongoose from './config/db';
import dotenv from 'dotenv';
import cors from 'cors';
import indexRouter from './routes/index.routes';
import { setupWebSocket } from './socket.io';
import { createServer } from 'http';
import { swaggerSpec, swaggerUi } from './swagger';

dotenv.config();

const app = express();

const server = createServer(app);
setupWebSocket(server);

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'http://localhost';

app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', indexRouter);
server.listen(PORT, () => {
  mongoose.connect;
  console.log(`Vanakam da maple, ${HOST}:${PORT} la irundhu`);
  console.log(`Click here to see api docs: ${HOST}:${PORT}/api-docs`);
});
