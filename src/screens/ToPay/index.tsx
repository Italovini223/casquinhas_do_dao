import { useState, useCallback } from 'react'

import { useFocusEffect } from '@react-navigation/native'

import { Alert, FlatList } from 'react-native'

import { useAuth } from '../../hooks/useAuth'


import { orderDto } from '../../dtos/orderDto'
import { notPaidOrderDto } from '../../dtos/notPaidOrderDto'

import dayjs from 'dayjs'


import { Header } from '../../components/Header'
import { Container, Content, Empty, EmptyContent, TotalContainer } from './styles'
import { DoNotPayed } from '../../components/DoNotPayed'
import { TotalPrice } from '../New/styles'
import { SearchInput } from '../../components/SearchInput'
import { Loading } from '../../components/Loading'
import { api } from '../../utils/api'

export function ToPay(){
  const [notPayedOrders, setNotPayedOrders] = useState<notPaidOrderDto[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  
  const { user } = useAuth();

  
  async function fetchNotPayedOrders(){
    try {
      setIsLoading(true);
      const { data } = await api.get('/order');

      let filteredResponse;
      
      if (!user.isAdmin) {
        filteredResponse = data.orders.filter((item: orderDto) => (
          item.userId === user.id && item.isPaid === false
        ));
      } else {
        filteredResponse = data.orders.filter((item: orderDto) => (
          item.isPaid === false
        ));
      }
      
      

      const formattedOrder = filteredResponse.map((item: orderDto) => {
        return({
          id: item.id,
          its_paid: item.isPaid,
          created_at: dayjs(item.createdAt).format('[em] DD/MM/YYYY [as] HH:mm'),
          price: item.total,
        })
      })

      setNotPayedOrders(formattedOrder);

    } catch(error){
      Alert.alert('PEDIDOS', 'Erro ao carregas os pedidos');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // function handleSearchByName(){
  //   try {
  //     setIsLoading(true);

  //     if(searchInput.length == 0){
  //       return Alert.alert("BUSCA", "Digite um nome para ser pesquisado");
  //     }
  
  //     const response = orders.filtered(`user_name = '${searchInput}'`);
  
  //     const formattedOrders = response.map(item => {
  //       return({
  //         id: item.id,
  //         its_paid: item.isPaid,
  //         created_at: dayjs(item.createdAt).format('[em] DD/MM/YYYY [as] HH:mm'),
  //         price: item.total,
  //         products: item.products,
  //       })
  //     });
  
  //     setNotPayedOrders(formattedOrders);

  //   } catch (error){
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  function calculateTotal(){
    let total = 0;
    notPayedOrders.forEach(item => (
      total += item.price
    ));

    return total;
  }

  useFocusEffect(useCallback(() => {

    fetchNotPayedOrders();

  }, []));


  if(isLoading){
    return (
      <Loading />
    )
  }

  return (
    <Container>
      <Header title='Não pagos'/>
      <Content>
        {/* <SearchInput 
          onPress={() => {}} 
          placeholder='Busque pelo nome' 
          onChangeText={setSearchInput}
        /> */}

        {
          isLoading ? <Loading /> :
          <>
            <FlatList 
              data={notPayedOrders}
              ListEmptyComponent={() => (
                <EmptyContent>
                  <Empty>
                    Ainda nao ha pedidos
                  </Empty>
                </EmptyContent>
              )}
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