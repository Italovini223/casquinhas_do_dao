import React from 'react';
import { Container, Content, TextDetails, OrderPrice, ProductName, DetailsContainer } from './styles';

import { useAuth } from '../../hooks/useAuth';

import { notPaidOrderDto } from '../../dtos/notPaidOrderDto';

import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/app.routes';
import { AdminNavigationRoutesProps } from '../../routes/admin.routes';

type Props = {
  data: notPaidOrderDto;
}

export function DoNotPayed({ data: { created_at, price, id } }: Props) {
  const { user } = useAuth();
  
  const navigation = useNavigation();



  function handleOrderDetails() {
    if (user.isAdmin) {
      (navigation as unknown as AdminNavigationRoutesProps).navigate('details', { id });
    } else {
      (navigation as unknown as AppNavigatorRoutesProps).navigate('details', { id });
    }
  }

  return (
    <Container
      onPress={handleOrderDetails}
    >
      <DetailsContainer>
        <TextDetails>
          { created_at }
        </TextDetails>

        <OrderPrice>
          R$ { price },00
        </OrderPrice>
        
      </DetailsContainer>
    </Container>
  );
}