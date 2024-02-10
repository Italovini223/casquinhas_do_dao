import { useState } from 'react'

import { ButtonContainer, Container, Content, DefaultSelect, DefaultSelectText, TotalPrice, TotalPriceContent } from './styles'

import { products, productType } from '../../utils/products'

import { useTheme } from 'styled-components/native'
import { useUser } from '@realm/react'
import { useRealm } from '../../libs/realm'

import { CaretDown } from 'phosphor-react-native'

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { Button } from '../../components/Button'
import { Alert } from 'react-native'
import { Order } from '../../libs/realm/schemas/order'

export function New() {
  const [selectProduct, setSelectedProduct] = useState<productType>({} as productType);
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const { COLORS } = useTheme();
  const user = useUser();
  const realm = useRealm();

  function handleOrderRegister(){
    try{
      if(!title || !quantity || !selectProduct){
        return Alert.alert('REGISTRO', 'Favor preencher todos os campos');
      }
  
      realm.write(() => {
        realm.create('Order', Order.generate({
          user_id: user!.id,
          user_name: user.profile.name!,
          product_name: selectProduct!.name,
          product_quantity: quantity,
          total_price: selectProduct!.value * quantity!,
        }))
      }) 

      Alert.alert('REGISTRO', 'Pedido realizado com sucesso');
    }catch(error){
      setIsLoading(false);
      Alert.alert("Erro", 'Nao foi possível fazer o pedido!');
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <Container>
      <Header title='Novo pedido'/>

      <Content>
        <Input 
          label='Nome do pedido'
          onChangeText={setTitle}
        />

        <Input 
          label='Quantidade (pc-10)'
          keyboardType='numeric'
          onChangeText={value => setQuantity(Number(value))}
        />

        <Select 
          label='Escolha o produto'
          data={products}
          onSelect={(selectedProduct: productType) => {
            setSelectedProduct(selectedProduct);
          }}
          buttonTextAfterSelection={(selectedProduct: productType) => {
            return selectedProduct.name
          }}
          rowTextForSelection={(selectedProduct: productType) => {
            return selectedProduct.name
          }}
          renderCustomizedButtonChild={(selectedProduct) => {
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
                    selectedProduct ? selectedProduct.name : 'Escolha o produto'
                  }
                </DefaultSelectText>
              </DefaultSelect>
            )
          }}
        />

        <Input 
          label='Nome do usuário'
          value={user.profile.name}
          editable={false}
        />

        <TotalPriceContent>
          <TotalPrice>
            Total R$
          </TotalPrice>
          <TotalPrice>
            {
              quantity > 0 && selectProduct.value > 0 ?
              String(quantity * selectProduct.value) : '00'
            },00
          </TotalPrice>
        </TotalPriceContent>
      </Content>
      <ButtonContainer>
      <Button 
        title='Fazer Pedido'
        isLoading={isLoading}
        onPress={handleOrderRegister}
      />
      </ButtonContainer>

    </Container>
  );
}