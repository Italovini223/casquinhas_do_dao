import React from 'react'

import { Container, Content, OrderTitle, OrderStatus, DataInfo, Infos, UserInfo } from './styles'

import { useNavigation } from '@react-navigation/native'

import { AppNavigatorRoutesProps } from '../../routes/app.routes'
import { AdminNavigationRoutesProps } from '../../routes/admin.routes'

export type OrderProps = {
  id: string;
  product_name: string;
  user_name: string;
  its_paid: boolean;
  created_at: string;
  price: number;
  status: string;
}

type Props = {
  data: OrderProps;
}


export function Order({  data:{ product_name, status, created_at, id, user_name }}: Props) {
  const appNavigation = useNavigation<AppNavigatorRoutesProps>();
  const adminNavigation = useNavigation<AdminNavigationRoutesProps>();

  const isAdmin = true;

  function handleDetails(){
    appNavigation.navigate('details', { id: id.toString() });
  }

  function handleGoEditOrder(){
    adminNavigation.navigate('editOrder', { id: id.toString() });
  }

  return (
    <Container onPress={isAdmin ? handleGoEditOrder : handleDetails}>
      <Content>
        <OrderTitle>
          {product_name}
        </OrderTitle>

        <OrderStatus 
          status={status}
        />
      </Content>
      <Infos>
        <DataInfo>
          { created_at }
        </DataInfo>
        {
          isAdmin &&
          <UserInfo>
            por:  { user_name }
          </UserInfo>
        }
      </Infos>
    </Container>
  );
}
