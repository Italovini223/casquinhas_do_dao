import React from 'react';
import { Container, Content, TextDetails, OrderPrice, ProductName, DetailsContainer } from './styles';

import { useAuth } from '../../hooks/useAuth';

import { notPaidOrderDto } from '../../dtos/notPaidOrderDto';

type Props = {
  data: notPaidOrderDto;
}

export function DoNotPayed({ data: { created_at, price, } }: Props) {
  const { user } = useAuth();

  return (
    <Container>
      <DetailsContainer>
        <TextDetails>
          { created_at }
        </TextDetails>

        <OrderPrice>
          R$ { price },00
        </OrderPrice>
        
        {
           user.isAdmin && 
          <TextDetails>
           por {  }
          </TextDetails>
        }
      </DetailsContainer>
    </Container>
  );
}