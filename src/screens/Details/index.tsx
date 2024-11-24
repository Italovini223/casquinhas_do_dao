
import { useEffect, useState } from 'react'

import { api } from '../../utils/api';

import { useRoute } from '@react-navigation/native'

import { Container, Content, Status, Label, Price, Product, Quantity } from './styles'

import { Header } from '../../components/Header';
import { FlatList } from 'react-native';

type orderDataProps = {
  id: string;
  userId: string;
  total: number;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  products: orderProductDataProps[];
}

type orderProductDataProps = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
}

type productsDataProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

type RouteParams = {
  id: string;
}

export function Details() {
  const [order, setOrder] = useState<orderDataProps>( {} as orderDataProps );
  const [products, setProducts] = useState<productsDataProps[]>([]);
  const routes = useRoute();
  const { id } = routes.params as RouteParams;

  useEffect(() => {
    async function fetchOrder() {
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data.order);

      for (let i = 0; i < order?.products.length; i++) {
        const response = await api.get(`/products/${order.products[i].productId}`);
        setProducts([...products, response.data.product]);
      }
    }
    fetchOrder();

  }, [id]);
  

  const paymentStatus = order?.isPaid == true ? 'Pago' : 'Pendente pagamento';

  return (
    <Container>
      <Header title='Detalhes'/>
      
      <Content>
      <Label> Produtos </Label>
        <FlatList 
          data={products}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
          <>
            <Product>
              { item.name }
            </Product>
            <Label>
                  Quantidade p-10
            </Label>
            <Quantity>
              { item. quantity}
            </Quantity>
          </>
          )}
        />
       
        <Label>
          Preço total
        </Label>
        <Price>
          R$ { order?.total },00
        </Price>

        <Label>
          Status do pedido
        </Label>


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