import { useEffect, useState } from 'react'

import { IceCream } from 'phosphor-react-native'

import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env'

import { useTheme } from 'styled-components/native'

import { Container } from './styles'
import { Button } from '../../components/Button'
import { Alert } from 'react-native'

WebBrowser.maybeCompleteAuthSession();

export function Register() {
  const { COLORS } = useTheme()
  const [isLoading, setIsLoading] = useState(false);

  const [_, response, googleSingIn] = Google.useAuthRequest({
    androidClientId: IOS_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email']
  });

  function handleGoogleSingIn(){
    setIsLoading(true);

    googleSingIn().then((response) => {
      if(response.type != 'success'){
        setIsLoading(false);
      }
    })
  }

  useEffect(() => {
    if(response?.type === 'success'){
      if(response.authentication?.idToken){
        console.log("TOKEN => ", response.authentication.idToken);
      }
    }
  }, [response]);

  return (
    <Container>
      <IceCream 
        color={COLORS.GRAY_200}
        size={32}
      />

      <Button 
        title='Entrar com Google'
        onPress={handleGoogleSingIn}
      />
    </Container>
  );
}