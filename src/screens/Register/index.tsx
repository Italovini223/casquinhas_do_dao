import { useState, useContext } from 'react'

import { IceCream } from 'phosphor-react-native'

import { api } from '../../utils/api'

import { storageUserSave } from '../../storage/storageUser'
import { IsAdminContext } from '../../contexts/isAdmin'
import { useTheme } from 'styled-components/native'

import { Container, Content } from './styles'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { Alert } from 'react-native'


export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { COLORS } = useTheme()
  const { saveIfIsAdmin } = useContext(IsAdminContext)


  async function handleSingIn(){
    try {
      setIsLoading(true);

      if(!email || !password){
        return Alert.alert('Erro', 'Preencha todos os campos');
      }

      const response = await api.post('/section', {
        email,
        password
      });

      setIsLoading(false);
      console.log(response.data.user);
      await storageUserSave(response.data.user);

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

        <Button 
          title='ENTRAR'
          onPress={handleSingIn}
          isLoading={isLoading}
        />
      </Content>
    </Container>
  );
}