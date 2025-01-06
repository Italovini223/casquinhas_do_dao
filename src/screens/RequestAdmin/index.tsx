import { useState, useCallback } from 'react'

import { useFocusEffect } from '@react-navigation/native'

import { Header } from '../../components/Header'

import { SuitcaseSimple } from 'phosphor-react-native'

import { api } from '../../utils/api'

import { useTheme } from 'styled-components/native'

import { useAuth } from '../../hooks/useAuth'

import { adminRequestDto } from '../../dtos/adminRequestDto'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '../../routes/app.routes'

import { Container, Content } from './styles'
import { Button } from '../../components/Button';
import { Alert } from 'react-native'
import { Loading } from '../../components/Loading'

export function RequestAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [adminRequest, setAdminRequest] = useState<adminRequestDto[]>([]);


  const { COLORS } = useTheme();
  const { user } = useAuth();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const userHasRequest = adminRequest.filter(request => request.userId === user.id);



 async function handleUserRequests(){
    try {
      setIsLoading(true);
      const { data } = await api.get(`/admin`);
      setAdminRequest(data);
    } catch (error) {
      Alert.alert('Administrador', 'Erro ao buscar requisições');
      navigation.goBack();
      throw error;
    } finally {
      setIsLoading(false);
    }

  }

  useFocusEffect(useCallback(() => {
    handleUserRequests();
  }, []));

 async function handleRequestAdmin(){
    try {
      setIsLoading(true);
     await api.post(`/admin/${user.id}`); 

      Alert.alert('Administrador', 'Requisição enviada com sucesso');

      navigation.goBack();
  
    }catch(error){
      Alert.alert('Administrador', 'Erro ao requisitar administração');
      console.log(error);
    }finally {
      setIsLoading(false);
    }
  }


  if(isLoading){
    return (
      <Loading />
    )
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
          title={userHasRequest.length > 0 ? "Aguardando aprovação" : 'Requisitar administrador'}
          onPress={handleRequestAdmin}
          isLoading={isLoading}
          disabled={userHasRequest.length > 0}
        />
      </Content>
    </Container>
  );
}