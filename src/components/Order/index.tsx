import React from 'react';
import { Container, Content, OrderTitle, OrderStatus, DataInfo } from './styles';

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


export function Order({  data:{ product_name, status, created_at }}: Props) {
  return (
    <Container>
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
