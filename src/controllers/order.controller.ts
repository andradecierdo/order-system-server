import { Request, Response } from 'express';
import { OrderInput } from '../models/order';
import { IOrderService } from '../services/order.service';

export class OrderController {
  constructor(private orderService: IOrderService) {}

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
