import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { useRoute, useNavigation } from '@react-navigation/native';

import CounterInput from "react-native-counter-input";

import { AdminNavigationRoutesProps } from '../../routes/admin.routes';
import { productDto } from '../../dtos/productDto';
import { useTheme } from 'styled-components/native';

import { api } from '../../utils/api'

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';

import { Container, ProductDescription, ProductName, ProductQuantity, Content, Label, Section, ButtonContainer } from './styles';

type routeParams = {
  id: string;
}

export function ProductDetails() {
  const [product, setProduct] = useState<productDto>({} as productDto);
  const [newQuantity, setNewQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const routes = useRoute();
  const navigation = useNavigation<AdminNavigationRoutesProps>();
  const { COLORS } = useTheme();

  const { id } = routes.params as routeParams;

 async function fetchProduct(){
    try {
      setIsLoading(true);
      const { data } = await api.get(`/product/${id}`);
      setProduct(data.product);
      setNewQuantity(data.product.quantity);
    } catch (error) {
      Alert.alert('Erro ao buscar produto');
      navigation.goBack();
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleEditProduct(){
    try {
      setIsEditing(true);
      await api.patch(`/product`, {
        id: product.id,
        quantity: newQuantity
      });
      Alert.alert('Produto atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao atualizar produto');
      console.log(error);
      throw error;
    } finally {
      setIsEditing(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchProduct();
  }, [id]));

  if(isLoading){
    return (
      <Loading />
    )
  }

  return (
    <Container>
      <Header 
        title='Detalhes do produto'
      />
      <Content>
        <ProductName>{product.name}</ProductName>

        <Section>
          <Label>Descrição:</Label>
          <ProductDescription>
            {product.description}
          </ProductDescription>
        </Section>

        <Section>
          <Label>
            Quantidade:
          </Label>
          <ProductQuantity>{newQuantity}</ProductQuantity>
        </Section>

        <CounterInput 
          initial={product.quantity}
          min={product.quantity}
          max={10000}
          onChange={(value) => setNewQuantity(value)}
          horizontal
          style={{ backgroundColor: COLORS.BRAND_MID }}
          increaseButtonBackgroundColor={COLORS.GRAY_800}
          decreaseButtonBackgroundColor={COLORS.GRAY_800}
        />

        <ButtonContainer>
          <Button 
            title='Salvar alterações'
            onPress={() => handleEditProduct()}
            isLoading={isEditing}
            disabled={newQuantity === product.quantity}
          />
        </ButtonContainer>
      </Content>
    </Container>
  );
}