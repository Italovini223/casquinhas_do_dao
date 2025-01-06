
import { useEffect, useState } from 'react'


import { api } from '../../utils/api';

import { useRoute } from '@react-navigation/native'

import { orderDto } from '../../dtos/orderDto';
import { detailProductDto } from '../../dtos/detailProductDto';

import { Container, Content, Status, Label, Price, Product, Quantity } from './styles'

import { Header } from '../../components/Header';
import { Alert, FlatList } from 'react-native';
import { Loading } from '../../components/Loading';



type RouteParams = {
  id: string;
}

export function Details() {
  const [order, setOrder] = useState<orderDto>( {} as orderDto );
  const [isLoading, setIsLoading] = useState(true);

  const routes = useRoute();
  const { id } = routes.params as RouteParams;

  async function fetchOrder(){
    try{
      setIsLoading(true);
      const response = await api.get(`/order/${id}`);
      setOrder(response.data.order);

    } catch (error) {

      Alert.alert('Erro ao buscar pedido');
      throw error;

    } finally {
      setIsLoading(false);
    }

  }

  
  useEffect(() => {
    fetchOrder();
  }, [id])

  
  const paymentStatus = order?.isPaid == true ? 'Pago' : 'Pendente pagamento';

  if(isLoading){
    return (
      <Loading />
    )
  }

  return (
    <Container>
      <Header title='Detalhes'/>
      
      <Content>
      <Label> Produtos </Label>
        <FlatList 
          data={order.products}
          renderItem={({ item, index }) => (
          <>
            <Product>
              { item.productName }
            </Product>
            <Label>
                  Quantidade p-10
            </Label>
            <Quantity>
              { item.quantity }
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