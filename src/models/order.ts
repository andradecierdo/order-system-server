export enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Completed = 'Completed',
}

export type OrderInput = {
  productId: number;
  customerName: string;
}

export type Order = OrderInput & {
  id: number;
  status: OrderStatus;
}
