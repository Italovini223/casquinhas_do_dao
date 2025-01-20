import { useEffect, useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../../utils/api';
import { orderDto } from '../../dtos/orderDto';
import { UserListDto } from '../../dtos/userListDto';
import { useAuth } from '../../hooks/useAuth';
import { HomeHeader } from '../../components/HomeHeader';
import { Order as OrderComponent } from '../../components/Order';
import { Loading } from '../../components/Loading';
import { Container, Content } from './styles';
import { SearchInput } from '../../components/SearchInput';

export function Home() {
  const [userOrders, setUserOrders] = useState<orderDto[]>([]);
  const [AllOrders, setAllOrders] = useState<orderDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [AllUsers, setAllUsers] = useState<UserListDto[]>([]);
  const { user } = useAuth();

  const title = user.isAdmin ? 'Todos os pedidos' : 'Meus pedidos';

  async function fetchAllUsers() {
    try {
      setIsLoading(true);
      const response = await api.get('/user');
      setAllUsers(response.data.users);
    } catch (error) {
      Alert.alert('ERRO', 'Erro ao carregar os usuários');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchOrder() {
    try {
      setIsLoading(true);
      const response = await api.get('/order');

      if (!user.isAdmin) {
        const filteredOrders = response.data.orders.filter((order: orderDto) => order.userId === user.id);
        setAllOrders(filteredOrders);
        setUserOrders(filteredOrders);
      } else {
        setAllOrders(response.data.orders);
        setUserOrders(response.data.orders); 
      }
    } catch (error) {
      Alert.alert('ERRO', 'Erro ao carregar os pedidos');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleFilterByUserName(name: string) {
    if (!name) {
      setUserOrders(AllOrders);
    } else {
      const filteredUsers = AllUsers.filter((user: UserListDto) =>
        user.name.toLowerCase().includes(name.toLowerCase())
      );

      if (filteredUsers.length > 0) {
        const filteredOrders = AllOrders.filter((order: orderDto) =>
          filteredUsers.some((user: UserListDto) => user.id === order.userId)
        );
        setUserOrders(filteredOrders);
      } else {
        setUserOrders([]);
      }
    }
  }

  useFocusEffect(useCallback(() => {
    fetchOrder();
    fetchAllUsers();
  }, []));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <HomeHeader title={title} />

      <Content>
        {
          user.isAdmin && 
          <SearchInput
            onPress={() => {}}
            placeholder='Buscar por nome do cliente'
            onChangeText={handleFilterByUserName}
          />
        }

        <FlatList
          data={userOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OrderComponent
              data={item}
            />
          )}
        />
      </Content>
    </Container>
  );
}