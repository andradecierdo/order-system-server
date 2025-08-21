import { Request, Response } from 'express';
import { Order } from '../models/order';

export class OrderController {
  private orders: Order[] = [];

  public createOrder = async (req: Request, res: Response) => {
    const { customerName, productId } = req.body;

    const newOrder: Order = {
      id: 1,
      customerName,
      productId,
      status: 'Processing',
    };

    this.orders.push(newOrder);

    // TODO process order

    res.status(201).json({ success: true, order: newOrder });
  };
}
