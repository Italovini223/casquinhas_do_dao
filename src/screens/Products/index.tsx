import { FlatList, Alert } from 'react-native';
import { BSON } from 'realm';
import { useQuery } from '../../libs/realm';
import { Product } from '../../libs/realm/schemas/product';
import { useRealm } from '../../libs/realm';
import { ProductCard } from '../../components/ProductCard';
import { Header } from '../../components/Header';
import { Container, Content, EmptyList, EmptyListText } from './styles';

export function Products() {
  const products = useQuery(Product);
  const realm = useRealm();

  async function handleDeleteProduct(id: string) {
    try {
      const product = realm.objectForPrimaryKey(Product, new BSON.UUID(id));
      if (product) {
        realm.write(() => {
          realm.delete(product);
        });
        Alert.alert('Produto deletado', 'Produto deletado com sucesso');
      } else {
        Alert.alert('Erro ao deletar produto', 'Produto não encontrado');
      }
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

  return (
    <Container>
      <Header title="Produtos" />
      {
        products.length > 0 ?
          <Content>
            <FlatList
              data={products}
              keyExtractor={item => item._id.toString()}
              renderItem={({ item }) => (
                <ProductCard 
                  data={item} 
                  deleteButtonFunction={() => DeleteProduct(item._id.toString())}
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