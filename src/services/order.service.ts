import { Order, OrderInput, OrderStatus } from '../models/order';
import { IWebSocketServive } from './websocket.service';

export interface IOrderService {
  createOrder(newOrder: OrderInput): Promise<void>;
  processOrder(order: Order): Promise<void>;
}

export class OrderService {
  private orders: Order[] = [];

  constructor(private wsService: IWebSocketServive) {
    this.wsService.onInitData = () => this.orders;
  }
  
  public async createOrder(newOrder: OrderInput): Promise<void> {
    const order: Order = {
      id: this.orders.length + 1,
      status: OrderStatus.Pending,
      ...newOrder,
    }
    this.orders.push(order);

    // Broadcast updated orders
    this.broadcastOrders();

    // Process order
    this.processOrder(order);
  }

  public async processOrder(order: Order): Promise<void> {
    // Update status to Processing after 2s
    await this.delay(2000);
    order.status = OrderStatus.Processing;
    this.broadcastOrders();

    // Update status to Completed after 8s
    await this.delay(8000);
    order.status = OrderStatus.Completed;
    this.broadcastOrders();
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private broadcastOrders(): void {
    this.wsService.broadcast('UPDATE', this.orders);
  }
}
