import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Alert, FlatList } from 'react-native';

import dayjs from 'dayjs';

import { useQuery, useRealm } from '../../libs/realm';

import { RequestAdminCard, AdminRequestProps } from '../../components/RequestAdminCard';
import { Header } from '../../components/Header';

import { Admin } from '../../libs/realm/schemas/admin';

import { Container, Content, EmptyListContainer, EmptyListText } from './styles';
import { Loading } from '../../components/Loading';



export function AdminRequest() {
  const [requests, setRequests] = useState<AdminRequestProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const adminRequests = useQuery(Admin);
  const realm = useRealm();

  function fetchAdminRequest() {
    const requests = adminRequests.filtered(`is_admin = ${false} SORT(created_at DESC)`);

    const formattedRequests = requests.map(request => {
      return ({
        _id: request._id,
        user_name: request.user_name,
        requested_at: dayjs(request.created_at).format('[solicitado em ]DD/MM/YYYY [as] HH:mm'),
        is_admin: request.is_admin,
        user_id: request.user_id
      
      })

    })
    setRequests(formattedRequests);
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

  function handleAcceptRequest(id: string) {
    try {
        setIsLoading(true);
        const request = adminRequests.find(requests => requests._id.toString() == id);

      if(request){
        realm.write(() => {
          request.is_admin = true;
        })

        console.log(request);

        Alert.alert('Sucesso', 'Requisição aceita com sucesso');
      }

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível aceitar a requisição');
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
              onPress={()=> acceptRequest(item._id)}
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