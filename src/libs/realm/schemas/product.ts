import { Realm } from '@realm/react'
import { ObjectSchema } from 'realm'

type GenerateProps = {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export class Product extends Realm.Object<Product> {
 _id!: string;
  name!: string;
  description!: string;
  price!: number;
  quantity!: number;
  created_at!: string;
  updated_at!: string;

  static generate({ name, description, price, quantity }: GenerateProps) {
    return {
      _id: new Realm.BSON.UUID(),
      name,
      description,
      price,
      quantity,
      created_at: new Date(),
      updated_at: new Date(),
    }
  }

  static schema: ObjectSchema = {
    name: 'Product',
    primaryKey: '_id',

    properties: {
      _id: 'uuid',
      name: {
        type: 'string',
        indexed: true,
      },
      description: 'string',
      price: 'int',
      quantity: 'int',
      created_at: 'date',
      updated_at: 'date',
    }
  }
}