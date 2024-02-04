import React from 'react';
import { Container, Content, OrderTitle, statusProps, OrderStatus } from './styles';

type Props = {
  title: string;
  status: statusProps;
}

export function Order({ status, title }: Props) {
  return (
    <Container>
      <Content>
        <OrderTitle>
          {title}
        </OrderTitle>

        <OrderStatus 
          status={status}
        />
      </Content>
    </Container>
  );
}
