import { useEffect, useState, useCallback } from 'react'

import { useFocusEffect } from '@react-navigation/native'

import { FlatList } from 'react-native'

import dayjs from 'dayjs'

import { useQuery } from '../../libs/realm'

import { useUser } from '@realm/react'

import { useRealm } from '../../libs/realm'

import { Order } from '../../libs/realm/schemas/order'
import { Admin } from '../../libs/realm/schemas/admin'

import { HomeHeader } from '../../components/HomeHeader'
import { Order as OrderComponent, OrderProps } from '../../components/Order'
import { Container, Content } from './styles'
import { Alert } from 'react-native'

export function Home() {
  const [userOrders, setUserOrders] = useState<OrderProps[]>([])

  const orders = useQuery(Order);
  const adminRequests = useQuery(Admin);

  const user = useUser();
  const realm = useRealm();

  const admin = adminRequests.find(admin => admin.is_admin == true && admin.user_id == user.id);

  const isAdmin = admin ? true : false;

  const title = isAdmin ? 'Todos os pedidos' : 'Meus pedidos';


  function fetchOrder(){
    try {
      let response;

      if(isAdmin){
        response = orders
      } else {
        response = orders.filtered(`user_id = '${user.id}' SORT(created_at DESC)`);
      }

      const formattedOrder = response.map(item => {
        return({
          id: item._id,
          status: item.order_status,
          user_name: item.user_name,
          its_paid: item.its_paid,
          created_at: dayjs(item.created_at).format('DD/MM/YYYY [as] HH:mm'),
          price: item.total_price,
          product_name: item.product_name,
          quantity: item.product_quantity,
        })
      })

      setUserOrders(formattedOrder);

    } catch(error){
      Alert.alert('PEDIDOS', 'Erro ao carregas os pedidos');
    }
  }


  useFocusEffect(useCallback(() => {

    fetchOrder();
  }, []));

  useEffect(() => {
    realm.addListener('change', () => fetchOrder());

    return () => {
      if(realm && !realm.isClosed){
        realm.removeListener('change', fetchOrder);
      }
    }
  });

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