import { useState, useCallback } from 'react'

import { useFocusEffect } from '@react-navigation/native'

import { Header } from '../../components/Header'

import { SuitcaseSimple } from 'phosphor-react-native'

import { useUser } from '@realm/react'

import { useTheme } from 'styled-components/native'
import { useRealm, useQuery } from '../../libs/realm'


import { Container, Content } from './styles'
import { Button } from '../../components/Button';
import { Alert } from 'react-native'
import { Admin } from '../../libs/realm/schemas/admin'

export function RequestAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [userRequest, setUserRequest] = useState<Admin | null>(null);

  const { COLORS } = useTheme();
  const user = useUser();
  const realm = useRealm();
  const requests = useQuery(Admin)



  function handleUserRequests(){
    const request = requests.filtered(`user_id = '${user.id}'`)[0];
    setUserRequest(request);
    console.log(request);
  }

  useFocusEffect(useCallback(() => {
    handleUserRequests();
  }, []));

  function handleRequestAdmin(){
    try {
      setIsLoading(true);

      if(userRequest){
        return Alert.alert("Administrador", 'Você tem requisições em andamento, favor aguardar resposta')
      }

      realm.write(() => {
        realm.create('Admin', Admin.generate({
          user_id: user!.id,
          user_name: user.profile.name!,
        }))
      });

      Alert.alert('Administrador', 'Requisição feita com sucesso, aguarde a autorização');
  

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