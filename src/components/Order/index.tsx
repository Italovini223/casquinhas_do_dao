import { useState, useCallback } from 'react'

import { useFocusEffect } from '@react-navigation/native'

import { api } from '../../utils/api'

import dayjs from 'dayjs'

import { Container, Content, OrderTitle, OrderStatus, DataInfo, Infos, UserInfo } from './styles'

import { useNavigation } from '@react-navigation/native'

import { useIsAdmin } from '../../hooks/useIsAdmin'

import { AppNavigatorRoutesProps } from '../../routes/app.routes'
import { AdminNavigationRoutesProps } from '../../routes/admin.routes'

export type OrderProps = {
  id: string;
  userId: string;
  total: number;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}

type Props = {
  data: OrderProps;
}

export function Order({  data:{ id, userId, isPaid, total, createdAt   }}: Props) {
  const [userName, setUserName] = useState('');

  const { isAdmin } = useIsAdmin();
  

  const appNavigation = useNavigation<AppNavigatorRoutesProps>();
  const adminNavigation = useNavigation<AdminNavigationRoutesProps>();


  function handleDetails(){
    appNavigation.navigate('details', { id: id.toString() });
  }

  function handleGoEditOrder(){
    adminNavigation.navigate('editOrder', { id: id.toString() });
  }

  async function handleUserName(){
    try {
      const response = await api.get(`/user/${userId}`);
      setUserName(response.data.userName);
    } catch(error){
      console.log('Erro ao buscar o nome do usuário');
    }
  }


  useFocusEffect(useCallback(() => {
    isAdmin && handleUserName();
  }, []));



  return (
    <Container onPress={isAdmin ? handleGoEditOrder : handleDetails}>
      <Content>
        <OrderTitle>
          Pedido do dia { new Date(createdAt).toLocaleDateString() }
        </OrderTitle>

        <OrderStatus 
          status={isPaid ? 'finished' : 'pending'}
        />
      </Content>
      <Infos>
        <DataInfo>
          { dayjs(createdAt).format('HH:mm') }
        </DataInfo>
        {
          isAdmin &&
          <UserInfo>
            por:  { userName }
          </UserInfo>
        }
      </Infos>
    </Container>
  );
}
