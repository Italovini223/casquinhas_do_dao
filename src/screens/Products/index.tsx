import { useCallback, useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../../utils/api';

import { productsDataProps } from '../New';

import { ProductCard } from '../../components/ProductCard';
import { Header } from '../../components/Header';
import { Container, Content, EmptyList, EmptyListText } from './styles';

export function Products() {
  const [products, setProducts] = useState<productsDataProps[]>([]);

  async function handleDeleteProduct(id: string) {
    try {
      await api.delete(`/product/${id}`);    
      Alert.alert('Produto deletado', 'Produto deletado com sucesso');
    } catch (error) {
      Alert.alert('Erro ao deletar produto', 'Erro ao deletar produto, tente novamente');
      console.log(error);
    }
  }

  function DeleteProduct(id: string) {
    Alert.alert(
      'Deletar Produto',
      'Deseja realmente deletar este produto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Deletar',
          onPress: async () => {
            await handleDeleteProduct(id);
          }
        }
      ]
    );
  }

  useFocusEffect(useCallback(() =>{

    async function fetchProducts() {
      try {
        const response = await api.get('/product');
        setProducts(response.data.products);
      } catch (error) {
        Alert.alert('ERRO', 'Erro ao carregar os produtos');
      }
    }
    fetchProducts();
  }, []))

  return (
    <Container>
      <Header title="Produtos" />
      {
        products.length > 0 ?
          <Content>
            <FlatList
              data={products}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <ProductCard 
                  data={item} 
                  deleteButtonFunction={() => DeleteProduct(item.id.toString())}
                />
              )}
            />
          </Content>
        :
          <EmptyList>
            <EmptyListText>Nenhum produto cadastrado</EmptyListText>
          </EmptyList>

      }
    </Container>
  );
}