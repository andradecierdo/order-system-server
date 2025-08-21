export type Order = {
  id: number;
  productId: number;
  customerName: string;
  status: 'Pending' | 'Processing' | 'Completed';
}
