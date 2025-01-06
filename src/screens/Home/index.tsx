import { useEffect, useState, useCallback } from 'react'

import { api } from '../../utils/api'

import { useFocusEffect } from '@react-navigation/native'

import { FlatList } from 'react-native'

import { orderDto } from '../../dtos/orderDto'


import { useIsAdmin } from '../../hooks/useIsAdmin'
import { useAuth } from '../../hooks/useAuth'


import { HomeHeader } from '../../components/HomeHeader'
import { Order, Order as OrderComponent } from '../../components/Order'
import { Container, Content } from './styles'
import { Alert } from 'react-native'



export function Home() {
  const [userOrders, setUserOrders] = useState<orderDto[]>([])
  const { user } = useAuth();



  const title = user.isAdmin ? 'Todos os pedidos' : 'Meus pedidos';


  async function fetchOrder(){
    try {
      const response = await api.get('/order');

      if(!user.isAdmin){
        const filteredOrders = response.data.orders.filter((order: orderDto) => order.userId === user.id);
        setUserOrders(filteredOrders);
      
      } else {
        setUserOrders(response.data.orders);
      }
    } catch(error){
      Alert.alert('ERRO', 'Erro ao carregar os pedidos');
      console.log(error);
    }
  }


  useFocusEffect(useCallback(() => {

    fetchOrder();
  }, []));


  return (
    <Container>
      <HomeHeader title={title}/>
      
      <Content>
        <FlatList 
          data={userOrders}
          renderItem={({ item }) => (
            <OrderComponent 
              data={item}
              key={item.id}
              
            />
          )}
        />
      </Content>
    </Container>
  );
}