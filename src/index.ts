import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { OrderController } from './controllers/order.controller';
import { OrderService, WebSocketService } from './services';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.set('server', server);

const wsService = new WebSocketService(server);
const orderService = new OrderService(wsService);
const orderController = new OrderController(orderService);

app.post('/order', orderController.createOrder);

server.listen(PORT, () => {
  console.log(`Ordering server running at http://localhost:${PORT}`);
});
