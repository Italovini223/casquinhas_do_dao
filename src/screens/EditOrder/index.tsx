import { useState, useCallback } from 'react'

import { useFocusEffect } from '@react-navigation/native'

import { useRoute } from '@react-navigation/native'

import { api } from '../../utils/api'

import { orderDataProps } from '../Details'
import { productsDataProps } from '../New'

import { useTheme } from 'styled-components/native'

import { useNavigation } from '@react-navigation/native'
import { AdminNavigationRoutesProps } from '../../routes/admin.routes'



import { CaretDown } from 'phosphor-react-native'

import { Container, Content, DefaultSelect, DefaultSelectText } from './styles'

import { FlatList } from 'react-native'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { Button } from '../../components/Button'
import { Alert } from 'react-native'

const itsPaidValues = ['Pago', 'Aguardando pagamento'];
const orderStatusValues = ['em preparação', 'finalizado'];

type itsPaidValuesProps = 'Pago' | 'Aguardando pagamento';
type OrderStatusValuesPros = 'em preparação'| 'finalizado';


type RouteParams = {
  id: string;
}


export function EditOrder() {
  const [orderStatus, setOrderStatus] = useState('');
  const [order, setOrder] = useState<orderDataProps>({} as orderDataProps);
  const [products, setProducts] = useState<productsDataProps[]>([]);
  const [itsPaid, setItsPaid] = useState('');
  const [disable, setDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const { COLORS } = useTheme();

  const routes = useRoute();
  const { id } = routes.params as RouteParams;


  const navigation = useNavigation<AdminNavigationRoutesProps>();


  async function handleOderChanges(){
    try {
      setIsLoading(true);

      await api.put(`/order`, {
        id: order.id,
        isPaid: itsPaid === 'Pago' ? true : false,
      });


      Alert.alert("Pedido", 'Pedido atualizado com sucesso');

      navigation.navigate('home');

    } catch(error){
      Alert.alert('Erro', 'Nao foi possível atualizar o pedido');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    async function fetchOrder() {
      const response = await api.get(`/order/${id}`);
      setOrder(response.data.order);

      for(const product of response.data.order.products){
        const response = await api.get(`/product/${product.productId}`);
        setProducts(prevState => [...prevState, response.data.product]);
      }
    }

    fetchOrder();
  }, []));


  
  return (
    <Container>
      <Header title='Editar pedido'/>

      <Content>
        <FlatList 
          data={order.products}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <>
              {
                products.forEach(product => {
                  product.id === item.productId &&
                  <Input 
                  label='Produto'
                  value={product.name}
                  editable={false}
                  />
                })
              }

              <Input 
                label='Quantidade'
                value={item.quantity.toString()}
                editable={false}
              />
            
            </>
          )}
        />




        <Input 
          label='Total'
          value={order.total.toString()}
          editable={false}
        />

        {/* <Input 
          label='Pedido por'
          value={order?.user_name}
          editable={false}
        /> */}


        <Select 
          label='Status do pagamento'
          data={itsPaidValues}
          onSelect={(itsPaidStatus: itsPaidValuesProps) => {
            setItsPaid(itsPaidStatus);
          }}
          buttonTextAfterSelection={(itsPaidStatus: itsPaidValuesProps) => {
            return itsPaidStatus
          }}
          rowTextForSelection={(itsPaidStatus: itsPaidValuesProps) => {
            return itsPaidStatus
          }}
          renderCustomizedButtonChild={() => {
            return (
              <DefaultSelect>
                <CaretDown 
                  color={COLORS.BRAND_LIGHT}
                  style={{
                  position: 'absolute',
                  left: 4,
                }}
                />
                <DefaultSelectText>
                  {
                    itsPaid
                  }
                </DefaultSelectText>
              </DefaultSelect>
            )
          }}
        />

        <Button 
          title='Editar produto'
          disabled={disable}
          isLoading={isLoading}
          onPress={handleOderChanges}
        />
      </Content>
    </Container>
  );
}