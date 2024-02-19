import { useState, useCallback, useEffect } from 'react'

import { useFocusEffect } from '@react-navigation/native'

import { useRoute } from '@react-navigation/native'

import { useObject } from '../../libs/realm'
import { useTheme } from 'styled-components/native'

import { useNavigation } from '@react-navigation/native'
import { AdminNavigationRoutesProps } from '../../routes/admin.routes'

import { useRealm  } from '../../libs/realm'

import { CaretDown } from 'phosphor-react-native'

import { BSON } from 'realm'

import { Order } from '../../libs/realm/schemas/order'

import { Header } from '../../components/Header'
import { Container, Content, DefaultSelect, DefaultSelectText } from './styles'
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
  const [itsPaid, setItsPaid] = useState('');
  const [disable, setDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const realm = useRealm();

  const { COLORS } = useTheme();

  const routes = useRoute();
  const { id } = routes.params as RouteParams;

  const order = useObject(Order, new BSON.UUID(id) as unknown as string);

  const navigation = useNavigation<AdminNavigationRoutesProps>();

  const total = `R$ ${order?.total_price.toString()},00`

  function handleOderChanges(){
    try {
      setIsLoading(true);

      if(!order){
        return Alert.alert('Erro', 'Nao ha Pedido para ser modificado.')
      }

      realm.write(() => {
        order.its_paid = itsPaid === 'Pago' ? true : false,
        order.order_status = orderStatus === 'em preparação' ? 'in preparation' : 'finished'
        order.updated_at = new Date().toString()
      })

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
    const status = order?.order_status === 'in preparation' ? 'em preparação' : 'Finalizado';
    const itsPaid = order?.its_paid === false ? 'Aguardando pagamento' : 'Pago';

    setItsPaid(itsPaid);
    setOrderStatus(status);

  }, [order]));

  useEffect(() => {
    const checkOrderStatus = orderStatus === 'em preparação' ? 'in preparation' : 'finished'
    const checkItsPaid = itsPaid === 'Pago' ? true : false;

    const haveChanged = order?.order_status !== checkOrderStatus || order?.its_paid !== checkItsPaid;

    setDisable(!haveChanged);
  }, [orderStatus, itsPaid]);

  
  return (
    <Container>
      <Header title='Editar pedido'/>

      <Content>
        <Input 
          label='Produto'
          value={order?.product_name}
          editable={false}
        />

        <Input 
          label='Quantidade'
          value={order?.product_quantity.toString()}
          editable={false}
        />

        <Input 
          label='Total'
          value={total}
          editable={false}
        />

        <Input 
          label='Pedido por'
          value={order?.user_name}
          editable={false}
        />

        <Select 
          label='Status do pedido'
          data={orderStatusValues}
          onSelect={(orderStatusValue: OrderStatusValuesPros) => {
            setOrderStatus(orderStatusValue);
          }}
          buttonTextAfterSelection={(orderStatusValue: OrderStatusValuesPros) => {
            return orderStatusValue
          }}
          rowTextForSelection={(orderStatusValue: OrderStatusValuesPros) => {
            return orderStatusValue
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
                    orderStatus
                  }
                </DefaultSelectText>
              </DefaultSelect>
            )
          }}
        />

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