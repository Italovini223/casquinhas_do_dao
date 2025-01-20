import { useState, useCallback } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { Alert, FlatList } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { orderDto } from '../../dtos/orderDto';
import { notPaidOrderDto } from '../../dtos/notPaidOrderDto';
import dayjs from 'dayjs';
import { Header } from '../../components/Header';
import { Container, Content, Empty, EmptyContent, TotalContainer } from './styles';
import { DoNotPayed } from '../../components/DoNotPayed';
import { TotalPrice } from '../New/styles';
import { Loading } from '../../components/Loading';
import { api } from '../../utils/api';

type AdminRouteParams = {
  id: string;
  userName: string;
};

export function ToPay() {
  const [notPayedOrders, setNotPayedOrders] = useState<notPaidOrderDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const route = useRoute();
  const { id, userName } = route.params as AdminRouteParams;

  let headerTitle = 'Não pagos';

  if (user.isAdmin) {
    headerTitle = `Não pagos de ${userName}`;
  }

  async function fetchNotPayedOrders() {
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
          console.log(item),
          console.log(id),
          item.isPaid === false && item.userId === id
        ));
      }

      const formattedOrder = filteredResponse.map((item: orderDto) => ({
        id: item.id,
        its_paid: item.isPaid,
        created_at: dayjs(item.createdAt).format('[em] DD/MM/YYYY [às] HH:mm'),
        price: item.total,
      }));

      setNotPayedOrders(formattedOrder);
    } catch (error) {
      Alert.alert('PEDIDOS', 'Erro ao carregar os pedidos');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function calculateTotal() {
    let total = 0;
    notPayedOrders.forEach(item => {
      total += item.price;
    });
    return total;
  }

  useFocusEffect(useCallback(() => {
    fetchNotPayedOrders();
  }, [id]));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Header title={headerTitle} />
      <Content>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <FlatList
              data={notPayedOrders}
              ListEmptyComponent={() => (
                <EmptyContent>
                  <Empty>Ainda não há pedidos</Empty>
                </EmptyContent>
              )}
              renderItem={({ item }) => <DoNotPayed data={item} />}
            />
            <TotalContainer>
              <TotalPrice>Total</TotalPrice>
              <TotalPrice>R$ {String(calculateTotal())},00</TotalPrice>
            </TotalContainer>
          </>
        )}
      </Content>
    </Container>
  );
}