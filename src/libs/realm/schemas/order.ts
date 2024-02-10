import { Realm } from '@realm/react'
import { ObjectSchema } from 'realm'

type GenerateProps = {
  user_id: string;
  user_name: string;
  product_name: string;
  product_quantity: number;
  total_price: number;
}

export class Order extends Realm.Object<Order>{

  _id!: string;
  user_id!: string;
  user_name!: string;
  product_name!: string;
  product_quantity!: number;
  order_status!: string;
  its_paid!:boolean;
  total_price!: number;
  created_at!: string;
  updated_at!: string;

  static generate({ user_id, user_name, product_name, product_quantity, total_price}: GenerateProps) {
    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      user_name,
      product_name,
      product_quantity,
      total_price,
      its_paid: false,
      order_status: 'in preparation',
      created_at: new Date(),
      updated_at: new Date(),
    }
  }

  static schema: ObjectSchema = {
    name: 'Order',
    primaryKey: '_id',

    properties: {
      _id: 'uuid',
      user_id: {
        type: 'string',
        indexed: true,
      },
      user_name: 'string',
      product_name: 'string',
      product_quantity: 'int',
      order_status: 'string',
      its_paid: 'bool',
      total_price: 'int',
      created_at: 'date',
      updated_at: 'date',
    }
  }
}