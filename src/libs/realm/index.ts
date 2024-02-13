import { createRealmContext } from "@realm/react"

import { Order } from "./schemas/order"
import { Admin } from "./schemas/admin"

export const {
  RealmProvider,
  useRealm,
  useQuery,
  useObject
} = createRealmContext({
  schema: [Order, Admin]
});