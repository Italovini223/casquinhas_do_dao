import { useEffect, useState, useCallback } from 'react'

import { api } from '../../utils/api'

import { useFocusEffect } from '@react-navigation/native'

import { FlatList } from 'react-native'

import dayjs from 'dayjs'

import { useIsAdmin } from '../../hooks/useIsAdmin'


import { HomeHeader } from '../../components/HomeHeader'
import { Order, Order as OrderComponent, OrderProps } from '../../components/Order'
import { Container, Content } from './styles'
import { Alert } from 'react-native'



export function Home() {
  const [userOrders, setUserOrders] = useState<OrderProps[]>([])
  const { isAdmin } = useIsAdmin();



  const title = isAdmin ? 'Todos os pedidos' : 'Meus pedidos';


  async function fetchOrder(){
    try {
      const response = await api.get('/orders');
      setUserOrders(response.data.orders);
    } catch(error){
      Alert.alert('ERRO', 'Erro ao carregar os pedidos');
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