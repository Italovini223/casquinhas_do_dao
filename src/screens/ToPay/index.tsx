import { useState, useCallback } from 'react'

import { useFocusEffect } from '@react-navigation/native'

import { Alert, FlatList } from 'react-native'

import { useQuery } from '../../libs/realm'

import { OrderProps } from '../../components/Order'

import dayjs from 'dayjs'

import { Order } from '../../libs/realm/schemas/order'
import { useUser } from '@realm/react'

import { Header } from '../../components/Header'
import { Container, Content, TotalContainer } from './styles'
import { DoNotPayed } from '../../components/DoNotPayed'
import { TotalPrice } from '../New/styles'

export function ToPay(){
  const [notPayedOrders, setNotPayedOrders] = useState<OrderProps[]>([]);
  const orders = useQuery(Order);
  const user = useUser();

  
  function fetchNotPayedOrders(){
    try {
      const response = orders.filtered(`user_id = '${user.id}' SORT(created_at DESC)`);
      const filteredResponse = response.filtered("its_paid == $0", false);

      const formattedOrder = filteredResponse.map(item => {
        return({
          id: item._id,
          status: item.order_status,
          user_name: item.user_name,
          its_paid: item.its_paid,
          created_at: dayjs(item.created_at).format('[pedido em] DD/MM/YYYY [as] HH:mm'),
          price: item.total_price,
          product_name: item.product_name,
          quantity: item.product_quantity,
        })
      })

      setNotPayedOrders(formattedOrder);

    } catch(error){
      Alert.alert('PEDIDOS', 'Erro ao carregas os pedidos');
      console.log(error);
    }
  }

  function calculateTotal(){
    let total = 0;
    notPayedOrders.forEach(item => (
      total += item.price
    ));

    return total;
  }

  useFocusEffect(useCallback(() => {
    fetchNotPayedOrders();
  }, [orders]));



  return (
    <Container>
      <Header title='Não pagos'/>
      <Content>
        <FlatList 
          data={notPayedOrders}
          renderItem={({ item }) => (
            <DoNotPayed 
              data={item}
            />
          )}
        />

        <TotalContainer>
          <TotalPrice>
            Total 
          </TotalPrice>
          <TotalPrice>
            R$ { String(calculateTotal()) }, 00
          </TotalPrice>
        </TotalContainer>
      </Content>

    </Container>
  );
}