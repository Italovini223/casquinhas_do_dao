import React from 'react';
import { Container, Content, TextDetails, OrderPrice, ProductName, DetailsContainer } from './styles';

import { OrderProps } from '../Order'

type Props = {
  data: OrderProps;
}

export function DoNotPayed({ data: {product_name, price, created_at, user_name} }: Props) {
  const isAdmin = true;

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

      <DetailsContainer>
        <TextDetails>
          { created_at }
        </TextDetails>
        
        {
          isAdmin && 
          <TextDetails>
           por { user_name }
          </TextDetails>
        }
      </DetailsContainer>
    </Container>
  );
}