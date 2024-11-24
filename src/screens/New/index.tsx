import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../../utils/api';
import { ButtonContainer, Container, Content, DefaultSelect, DefaultSelectText, TotalPrice, TotalPriceContent } from './styles';
import { storageUserGet } from '../../storage/storageUser';
import { useTheme } from 'styled-components/native';
import { CaretDown } from 'phosphor-react-native';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { Alert } from 'react-native';
import { Order } from '../../libs/realm/schemas/order';

type newOrderProductDataProps = {
  productId: string;
  quantity: number;
  price: number;
}

type productsDataProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export function New() {
  const [selectedProducts, setSelectedProducts] = useState<productsDataProps[]>([]);
  const [productsAvailable, setProductsAvailable] = useState<productsDataProps[]>([]);
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const { COLORS } = useTheme();

  async function getAllAvailableProducts() {
    try {
      const response = await api.get('/products');
      const filteredProducts = response.data.products.filter((product: productsDataProps) => product.quantity > 0);
      setProductsAvailable(filteredProducts);
    } catch (error) {
      Alert.alert('ERRO', 'Erro ao carregar os produtos');
    }
  }

  async function handleOrderRegister() {
    try {
      const user = await storageUserGet();
      if (!title || !quantity || selectedProducts.length === 0) {
        return Alert.alert('REGISTRO', 'Favor preencher todos os campos');
      }

      const products = selectedProducts.map(product => ({
        productId: product.id,
        quantity: product.quantity,
        price: product.price
      }));

      const total = selectedProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0);

      const newOrder = {
        userId: user!.id,
        total,
        products,
      };

      await api.post('/orders', newOrder);

      Alert.alert('REGISTRO', 'Pedido realizado com sucesso');
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Erro", 'Nao foi possível fazer o pedido!');
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    getAllAvailableProducts();
  }, []));

  return (
    <Container>
      <Header title='Novo pedido' />

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
          data={productsAvailable}
          onSelect={(selectedProduct: productsDataProps) => {
            setSelectedProducts([...selectedProducts, selectedProduct]);
          }}
          buttonTextAfterSelection={(selectedProduct: productsDataProps) => {
            return selectedProduct.name;
          }}
          rowTextForSelection={(selectedProduct: productsDataProps) => {
            return selectedProduct.name;
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
                  {selectedProduct ? selectedProduct.name : 'Escolha o produto'}
                </DefaultSelectText>
              </DefaultSelect>
            );
          }}
        />
{/* 
        <Input
          label='Nome do usuário'
          value={user.name}
          editable={false}
        /> */}

        <TotalPriceContent>
          <TotalPrice>
            Total R$
          </TotalPrice>
          <TotalPrice>
            {quantity > 0 && selectedProducts.length > 0
              ? String(quantity * selectedProducts.reduce((acc, product) => acc + product.price, 0))
              : '00'
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