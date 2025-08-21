import { Order, OrderInput, OrderStatus } from '../models/order';
import { WebSocketService } from './websocket.service';

export class OrderService {
  private orders: Order[] = [];

  constructor(private wsService: WebSocketService) { }
  
  public async createOrder(newOrder: OrderInput): Promise<void> {
    const order: Order = {
      id: this.orders.length + 1,
      status: OrderStatus.Pending,
      ...newOrder,
    }
    this.orders.push(order);

    // Broadcast orders using websocket
    this.broadcastOrders();

    this.processOrder(order);
  }

  public async processOrder(order: Order): Promise<void> {
    // Update status to Processing after 2s
    await new Promise(resolve => setTimeout(resolve, 2000));
    order.status = OrderStatus.Processing;
    this.broadcastOrders();

    // Update status to Completed after 2s
    await new Promise(resolve => setTimeout(resolve, 8000));
    order.status = OrderStatus.Completed;
    this.broadcastOrders();
  }

  private broadcastOrders(): void {
    this.wsService.broadcast<Order[]>('UPDATE', this.orders);
  }
}
