import { Realm } from '@realm/react'
import { ObjectSchema } from 'realm'

  type GenerateProps = {
    user_id: string
    user_name: string;
  }

export class Admin extends Realm.Object<Admin>{

  _id!: string;
  user_id!: string;
  user_name!: string;
  is_admin!: boolean;
  created_at!: string;

  static generate({ user_id, user_name}: GenerateProps){
    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      user_name,
      is_admin: false,
      created_at: new Date(),
    }
  }

  static schema: ObjectSchema = {
    name: 'Admin',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      user_id: {
        type: 'string',
        indexed: true,
      },
      user_name: 'string',
      is_admin: 'bool',
      created_at: 'date'
    }
  }
}