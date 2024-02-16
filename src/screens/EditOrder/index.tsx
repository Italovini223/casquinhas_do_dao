import { useRoute } from '@react-navigation/native'

import { useObject } from '../../libs/realm'

import { BSON } from 'realm'

import { Order } from '../../libs/realm/schemas/order'

import { Header } from '../../components/Header'
import { Container } from './styles'

type RouteParams = {
  id: string;
}

export function EditOrder() {
  const routes = useRoute();
  const { id } = routes.params as RouteParams;

  const order = useObject(Order, new BSON.UUID(id) as unknown as string);

  console.log(order);
  return (
    <Container>
      <Header title='Editar pedido'/>
    </Container>
  );
}