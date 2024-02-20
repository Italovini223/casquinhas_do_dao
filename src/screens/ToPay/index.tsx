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
import { SearchInput } from '../../components/SearchInput'
import { Loading } from '../../components/Loading'

export function ToPay(){
  const [notPayedOrders, setNotPayedOrders] = useState<OrderProps[]>([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const orders = useQuery(Order);
  const user = useUser();




  
  function fetchNotPayedOrders(){
    try {

      let response;
      if(!isAdmin){
        response = orders.filtered(`user_id = '${user.id}' SORT(created_at DESC)`);
      } else {
        response = orders;
      }
      
      const filteredResponse = response.filtered("its_paid == $0", false);

      const formattedOrder = filteredResponse.map(item => {
        return({
          id: item._id,
          status: item.order_status,
          user_name: item.user_name,
          its_paid: item.its_paid,
          created_at: dayjs(item.created_at).format('[em] DD/MM/YYYY [as] HH:mm'),
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

  function handleSearchByName(){
    try {
      setIsLoading(true);

      if(searchInput.length == 0){
        return Alert.alert("BUSCA", "Digite um nome para ser pesquisado");
      }
  
      const response = orders.filtered(`user_name = '${searchInput}'`);
  
      const formattedOrders = response.map(item => {
        return({
          id: item._id,
          status: item.order_status,
          user_name: item.user_name,
          its_paid: item.its_paid,
          created_at: dayjs(item.created_at).format('[em] DD/MM/YYYY [as] HH:mm'),
          price: item.total_price,
          product_name: item.product_name,
          quantity: item.product_quantity,
        })
      });
  
      setNotPayedOrders(formattedOrders);

    } catch (error){
      console.log(error);
    } finally {
      setIsLoading(false);
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
        <SearchInput 
          onPress={handleSearchByName} 
          placeholder='Busque pelo nome' 
          onChangeText={setSearchInput}
        />

        {
          isLoading ? <Loading /> :
          <>
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
          </>
        }

      </Content>

    </Container>
  );
}