import { createRealmContext } from "@realm/react"
import { Order } from "./schemas/order";

export const {
  RealmProvider,
  useRealm,
  useQuery,
  useObject
} = createRealmContext({
  schema: [Order]
});