import { useCallback  } from 'react'

import { useFocusEffect  } from '@react-navigation/native'

import { useRoute } from '@react-navigation/native'

import { Container } from './styles'

import { Header } from '../../components/Header';

type RouteParams = {
  id: string;
}

export function Details() {
  const routes = useRoute();
  const { id } = routes.params as RouteParams;

  useFocusEffect(useCallback(() => {
    console.log(id);
  }, [id]));
  
  return (
    <Container>
      <Header title='Detalhes'/>
    </Container>
  );
}