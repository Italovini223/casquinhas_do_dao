import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Alert, FlatList } from 'react-native';

import dayjs from 'dayjs';


import { api } from '../../utils/api';

import { adminRequestDto } from '../../dtos/adminRequestDto';


import { RequestAdminCard } from '../../components/RequestAdminCard';
import { Header } from '../../components/Header';

import { useNavigation } from '@react-navigation/native';
import { AdminNavigationRoutesProps } from '../../routes/admin.routes';


import { Container, Content, EmptyListContainer, EmptyListText } from './styles';
import { Loading } from '../../components/Loading';



export function AdminRequest() {
  const [requests, setRequests] = useState<adminRequestDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<AdminNavigationRoutesProps>();



  async function fetchAdminRequest() {
    const { data } = await api.get('/admin');
    setRequests(data);
  }

  function acceptRequest(id: string) {
    Alert.alert('Aceitar requisição', 'Deseja aceitar essa requisição?', 
    [
      {
        text: 'Sim',
        onPress: () => handleAcceptRequest(id)
      },
      {
        text: 'Não'
      }
    ]
    )
  } 


  function rejectRequest(id: string) {
    Alert.alert('Recusar requisição', 'Deseja recusar essa requisição?', 
    [
      {
        text: 'Sim',
        onPress: () => handleRejectRequest(id)
      },
      {
        text: 'Não'
      }
    ]
    )
  } 




  async function handleAcceptRequest(id: string) {
    try {
        setIsLoading(true);
        const request = requests.find(request => request._id === id);

      if(request){
        await api.patch(`/admin/${request.userId}`);

        Alert.alert('Sucesso', 'Requisição aceita com sucesso');
        navigation.navigate('home');
      }

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível aceitar a requisição');
      navigation.navigate('home');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRejectRequest(id: string) {
    try {
        setIsLoading(true);
        const request = requests.find(request => request._id === id);

      if(request){
        await api.delete(`/admin/${request.userId}`);
        Alert.alert('Sucesso', 'Requisição recusada com sucesso');
        navigation.navigate('home');
      }

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível recusar a requisição');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchAdminRequest();
  }, []))

  if(isLoading){
    return(
      <Loading />
    )
  }

  return (
    <Container>
      <Header 
        title='Requisições de administração'
      />
      <Content>
        <FlatList 
          data={requests}
          renderItem={({ item })=> (
            <RequestAdminCard 
              data={item}
              key={item._id}
              acceptBtnFunction={() => acceptRequest(item._id)}
              deleteBtnFunction={() => rejectRequest(item._id)}
            />
          )}
          ListEmptyComponent={() => (
            <EmptyListContainer>
              <EmptyListText>
                Não há requisições pendentes
              </EmptyListText>
            </EmptyListContainer>
          )}
        />
      </Content>
    </Container>
  );
}