import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../../utils/api';

import { ButtonContainer, Container, Content, DefaultSelect, DefaultSelectText, TotalPrice, TotalPriceContent } from './styles';

import { useAuth } from '../../hooks/useAuth';

import { useTheme } from 'styled-components/native';

import CounterInput from "react-native-counter-input";

import { productDto } from '../../dtos/productDto';
import { orderProductDto } from '../../dtos/orderProductDto';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';

import { Alert, FlatList } from 'react-native';
import { OrderProductCard } from '../../components/OrderProductCard';

export function New() {
  const [selectedProducts, setSelectedProducts] = useState<orderProductDto[]>([]);
  const [productsAvailable, setProductsAvailable] = useState<productDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const { COLORS } = useTheme();
  const { user } = useAuth();

  async function getAllAvailableProducts() {
    try {
      const response = await api.get('/product');
      const filteredProducts = response.data.products.filter((product: productDto) => product.quantity > 0);
      setProductsAvailable(filteredProducts);
    } catch (error) {
      Alert.alert('ERRO', 'Erro ao carregar os produtos');
    }
  }

  async function handleOrderRegister() {
    try {

      const newOrder = {
        userId: user.id,
        total: totalPrice,
        products: selectedProducts,
      };

      await api.post('/order', newOrder);

      Alert.alert('REGISTRO', 'Pedido realizado com sucesso');
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Erro", 'Nao foi possível fazer o pedido!');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSelectProduct(product: productDto) {
    const isSelected = selectedProducts.some(selectedProduct => selectedProduct.productId === product.id);

    const filteredSelectedProduct = {
      productId: product.id,
      quantity: 1,
      price: product.price
    }

    if (isSelected) {
      setSelectedProducts(selectedProducts.filter(selectedProduct => selectedProduct.productId !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, filteredSelectedProduct]);
    }
  }

  function handleUpdateProductQuantity(id: string, quantity: number) {
    setSelectedProducts(prevSelectedProducts =>
      prevSelectedProducts.map(product =>
        product.productId === id ? { ...product, quantity } : product
      )
    );
  }

  useEffect(() => {
    const newTotalPrice = selectedProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    setTotalPrice(newTotalPrice);
  }, [selectedProducts]);

  useFocusEffect(useCallback(() => {
    getAllAvailableProducts();
  }, []));

  return (
    <Container>
      <Header title='Novo pedido' />

      <Content>
        <FlatList 
          data={productsAvailable}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OrderProductCard
              product={item}
              isSelected={selectedProducts.some(product => product.productId === item.id)}
              children={
                <CounterInput
                  onChange={(quantity) => handleUpdateProductQuantity(item.id, quantity)}
                  initial={1}
                  horizontal
                  min={1}
                  max={item.quantity}
                  style={{ backgroundColor: COLORS.BRAND_MID }}
                  increaseButtonBackgroundColor={COLORS.GRAY_800}
                  decreaseButtonBackgroundColor={COLORS.GRAY_800}
                />
              }
              onPress={() => handleSelectProduct(item)}
            />
          )}
        />

        <TotalPriceContent>
          <TotalPrice>
            Total R$
          </TotalPrice>
          <TotalPrice>
            {totalPrice.toFixed(2)}
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