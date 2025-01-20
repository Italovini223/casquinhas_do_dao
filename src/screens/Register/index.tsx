import { useState, useContext } from 'react'
import { Alert, TouchableOpacityProps } from 'react-native'

import { IceCream } from 'phosphor-react-native'

import { useAuth } from '../../hooks/useAuth'

import { useNavigation } from '@react-navigation/native'
import { SingInRoutesProps } from '../../routes/singIn.routes'

import { useTheme } from 'styled-components/native'

import { Container, Content, SingUpText, BtnSingUp, SingUpTextComponent, BtnTitle } from './styles'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'



export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { COLORS } = useTheme()
  const { singIn } = useAuth()
  const navigation = useNavigation<SingInRoutesProps>()

  function handleNavigateToSingUp(){
    navigation.navigate('singUp');
  }


  async function handleSingIn(){
    try {
      setIsLoading(true);

      if(!email || !password){
        return Alert.alert('Erro', 'Preencha todos os campos');
      }

      await singIn(email, password);
      

    } catch(error){
      setIsLoading(false);
      Alert.alert('Erro', 'Não foi possível fazer login');
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
          placeholder='E-mail'
          keyboardType='email-address'
          label='E-mail'
          onChangeText={setEmail}
        />

        <Input 
          placeholder='Senha'
          secureTextEntry
          label='Senha'
          onChangeText={setPassword}
        />

        <SingUpTextComponent>

          <SingUpText>
            Não tem uma conta? 
          </SingUpText>
          
          <BtnSingUp onPress={handleNavigateToSingUp}>
            <BtnTitle>
              Cadastre-se
            </BtnTitle>
          </BtnSingUp>

        </SingUpTextComponent>

        <Button 
          title='ENTRAR'
          onPress={handleSingIn}
          isLoading={isLoading}
        />
      </Content>
    </Container>
  );
}