import { Request, Response } from 'express';
import { OrderInput } from '../models/order';
import { OrderService } from '../services';

export class OrderController {
  constructor(private orderService: OrderService) {}

  public createOrder = async (req: Request, res: Response) => {
    const { customerName, productId } = req.body;

    const newOrder: OrderInput = {
      customerName,
      productId,
    };

    this.orderService.createOrder(newOrder);

    res.status(201).json({ success: true });
  };
}
