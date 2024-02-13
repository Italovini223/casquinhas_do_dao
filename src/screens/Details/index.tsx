import { useCallback  } from 'react'

import { useFocusEffect  } from '@react-navigation/native'

import { useObject } from '../../libs/realm'

import { BSON } from 'realm'


import { useRoute } from '@react-navigation/native'

import { Container, Content, Status, Label, Price, Product, Quantity } from './styles'

import { Header } from '../../components/Header';
import { Order } from '../../libs/realm/schemas/order'


type RouteParams = {
  id: string;
}

export function Details() {
  const routes = useRoute();
  const { id } = routes.params as RouteParams;

  const order = useObject(Order, new BSON.UUID(id) as unknown as string);

  const orderStatus = order?.order_status === 'in preparation' ? 'Em preparação' : 'Pedido Pronto'
  const paymentStatus = order?.its_paid == true ? 'Pago' : 'Pendente pagamento';

  return (
    <Container>
      <Header title='Detalhes'/>
      
      <Content>
        <Label> Produto </Label>
        <Product>
          { order?.product_name }
        </Product>

        <Label>
          Quantidade p-10
        </Label>
        <Quantity>
          { order?.product_quantity }
        </Quantity>

        <Label>
          Preço total
        </Label>
        <Price>
          R$ { order?.total_price },00
        </Price>

        <Label>
          Status do pedido
        </Label>
        <Status>
          { orderStatus }
        </Status>

        <Label>
          Status do pagamento
        </Label>
        <Status>
          { paymentStatus }
        </Status>
      </Content>
    </Container>
  );
}