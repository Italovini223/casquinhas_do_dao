import { useState } from "react"

import { Container, InputsContent } from './styles';

import { Input } from '../../components/Input';

import { Button } from "../../components/Button";

import { useIsAdmin } from '../../hooks/useIsAdmin';

import { useNavigation } from "@react-navigation/native";
import { AdminNavigationRoutesProps } from '../../routes/admin.routes'


import { useRealm } from '../../libs/realm';
import { Product } from '../../libs/realm/schemas/product';

import { Alert } from "react-native";
import { Header } from "../../components/Header";


export function NewProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const adminNavigation = useNavigation<AdminNavigationRoutesProps>();  

  const realm = useRealm();

  function handleCreateProduct() {
    try{
      setIsLoading(true);

      if(!name || !description || !price || !quantity){
        return Alert.alert('Novo Produto', 'Preencha todos os campos');
      }
  
      realm.write(() => {
        realm.create('Product', Product.generate({
          name,
          description,
          price: Number(price),
          quantity: Number(quantity),
        }));
      });

      Alert.alert('Novo Produto', 'Produto criado com sucesso');
      adminNavigation.goBack();

    } catch(error){
      Alert.alert('Erro', 'Não foi possível criar o produto');
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <Container>
      <Header 
        title="Novo Produto" 
      />
      
      <InputsContent>
        <Input label="Nome" 
          onChangeText={setName} 
          value={name}
        />
        <Input label="Preço" 
          onChangeText={setPrice} 
          value={price}
          keyboardType='numeric'
        />
        <Input label="Quantidade pc-10" 
          onChangeText={setQuantity} 
          value={quantity}
          keyboardType='numeric'
        />
        <Input label="Descrição" 
          onChangeText={setDescription} 
          value={description}
        />
      </InputsContent>

      <Button 
        title="Cadastrar Produto" 
        onPress={() => handleCreateProduct()} 
        isLoading={isLoading}
      />
    </Container>
  );
}