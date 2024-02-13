import React from 'react';
import { Container, Content, DataDetails, OrderPrice, ProductName } from './styles';

import { OrderProps } from '../Order'

type Props = {
  data: OrderProps;
}

export function DoNotPayed({ data: {product_name, price, created_at} }: Props) {
  return (
    <Container>
      <Content>
        <ProductName>
          { product_name}
        </ProductName>
        <OrderPrice>
          R$ { price },00
        </OrderPrice>
      </Content>

      <DataDetails>
        { created_at }
      </DataDetails>
    </Container>
  );
}