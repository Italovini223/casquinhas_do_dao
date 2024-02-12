import React from 'react'

import { Container, Content, OrderTitle, OrderStatus, DataInfo } from './styles'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '../../routes/app.routes'

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


export function Order({  data:{ product_name, status, created_at, id }}: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleDetails(){
    navigation.navigate('details', { id });
  }

  return (
    <Container onPress={handleDetails}>
      <Content>
        <OrderTitle>
          {product_name}
        </OrderTitle>

        <OrderStatus 
          status={status}
        />
      </Content>
      <DataInfo>
        { created_at }
      </DataInfo>
    </Container>
  );
}
