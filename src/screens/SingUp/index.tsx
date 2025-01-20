import { useState } from 'react';
import { Alert } from 'react-native';
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { api } from '../../utils/api';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { SingInRoutesProps } from '../../routes/singIn.routes';
import { IceCream } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import { Container, Content, BtnContainer, BtnSingIn, BtnTitle, SingInText, SingInTextComponent } from './styles';

export function SingUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<SingInRoutesProps>();

  const { singIn } = useAuth();
  const { COLORS } = useTheme();

  function handleSingInNavigation(){
    navigation.navigate('register');
  }

  async function handleSingUp(){
    try {
      setIsLoading(true);

      if(!email || !password || !name){
        return Alert.alert('Erro', 'Preencha todos os campos');
      }

      await api.post('/user', {
        name,
        email,
        password,
      }) 

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso');

      await singIn(email, password);

    } catch(error){
      setIsLoading(false);
      Alert.alert('Erro', 'Não foi possível realizar o cadastro');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
        <Content>
          <IceCream 
            color={COLORS.BRAND_LIGHT}
            size={64}
          />
          <Input 
            label='Digite seu nome'
            onChangeText={setName}
          />

          <Input 
            label='Digite seu e-mail'
            onChangeText={setEmail}
            keyboardType='email-address'
          />

          <Input 
            label='Digite sua senha'
            onChangeText={setPassword}
            secureTextEntry
          />

          <SingInTextComponent>
            <SingInText>Já tem uma conta?</SingInText>
            <BtnSingIn onPress={handleSingInNavigation}>
              <BtnTitle>Entrar</BtnTitle>
            </BtnSingIn>
          </SingInTextComponent>

          <BtnContainer>
            <Button 
              title='Cadastrar'
              onPress={handleSingUp}
              isLoading={isLoading}
            />
          </BtnContainer>

        </Content>
    </Container>
  );
}