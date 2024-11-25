import { useState, useCallback } from 'react'

import { useFocusEffect } from '@react-navigation/native'

import { Header } from '../../components/Header'

import { SuitcaseSimple } from 'phosphor-react-native'

import { api } from '../../utils/api'

import { useTheme } from 'styled-components/native'


import { Container, Content } from './styles'
import { Button } from '../../components/Button';
import { Alert } from 'react-native'

export function RequestAdmin() {
  const [isLoading, setIsLoading] = useState(false);

  const { COLORS } = useTheme();


  function handleUserRequests(){
    console.log('handleUserRequests');
  }

  useFocusEffect(useCallback(() => {
    handleUserRequests();
  }, []));

  function handleRequestAdmin(){
    try {
      
      console.log('handleRequestAdmin');
  

    }catch(error){
      Alert.alert('Administrador', 'Erro ao requisitar administração');
      console.log(error);
    }finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header title='administrador'/>
      <Content>
        <SuitcaseSimple 
          size={64}
          color={COLORS.BRAND_LIGHT}
        />

        <Button 
          title='Requisitar administrador'
          onPress={handleRequestAdmin}
          isLoading={isLoading}
        />
      </Content>
    </Container>
  );
}