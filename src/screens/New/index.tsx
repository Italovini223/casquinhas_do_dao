import { useState, useEffect } from 'react'

import { ButtonContainer, Container, Content, DefaultSelect, DefaultSelectText, TotalPrice, TotalPriceContent } from './styles'

import { products, productType } from '../../utils/products'

import { useTheme } from 'styled-components/native'
import { useUser } from '@realm/react'

import { CaretDown } from 'phosphor-react-native'

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { Button } from '../../components/Button'

export function New() {
  const [selectProduct, setSelectedProduct] = useState<productType>({} as productType);
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const { COLORS } = useTheme();
  const user = useUser();


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
            Total
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
      />
      </ButtonContainer>

    </Container>
  );
}