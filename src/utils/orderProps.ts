export type OrderProps = {
  _id: string;
  created_at: Date;
  its_paid: boolean;
  order_status: string;
  product_name: string;
  product_quantity: number;
  total_price: number;
  updated_at: Date;
  user_id: string;
  user_name: string;
}