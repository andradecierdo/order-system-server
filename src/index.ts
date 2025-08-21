import express from 'express';
import cors from 'cors';
import http from 'http';
import { OrderController } from './controllers/order.controller';

const PORT = 4000;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const orderController = new OrderController();

app.post('/order', orderController.createOrder);

app.set('server', server);

server.listen(PORT, () => {
  console.log(`Ordering server running at http://localhost:${PORT}`);
});
