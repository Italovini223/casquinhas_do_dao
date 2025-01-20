import { useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { api } from '../../utils/api';

import { UserListDto } from '../../dtos/userListDto';

import { UserCard } from '../../components/UserCard';

import { Container, Content } from './styles';
import { Loading } from '../../components/Loading';

import { Header } from '../../components/Header';

export function UsersList() {
  const [userList, setUserList] = useState<UserListDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getUsersList() {
    try {
      setIsLoading(true);
      const { data } = await api.get('/user');
      setUserList(data.users); 
    } catch (error) {
      Alert.alert('Erro ao buscar usuários');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  } 

  useFocusEffect(useCallback(() => {
    getUsersList();
  }, []));

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <Container>
      <Header title="Usuários" />
      <Content>
        <FlatList 
          data={userList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <UserCard data={item} />
          )}
        />
      </Content>
    </Container>
  );
}