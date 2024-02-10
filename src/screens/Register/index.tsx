import { useEffect, useState } from 'react'

import { IceCream } from 'phosphor-react-native'

import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env'

import { Realm, useApp } from '@realm/react'

import { useTheme } from 'styled-components/native'

import { Container, Content } from './styles'
import { Button } from '../../components/Button'
import { Alert } from 'react-native'

WebBrowser.maybeCompleteAuthSession();

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const { COLORS } = useTheme()
  const app = useApp();

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
        const credentials = Realm.Credentials.jwt(response.authentication.idToken);

        app.logIn(credentials).catch((error) => {
          Alert.alert('Entrar', 'Nao foi possível sincronizar a conta google');
          setIsLoading(false);
        })
      }
    } else {
      setIsLoading(false);
    }

    setIsLoading(false)
  }, [response]);

  return (
    <Container>
      <Content>
        <IceCream 
          color={COLORS.BRAND_LIGHT}
          size={64}
        />

        <Button 
          title='Entrar com Google'
          onPress={handleGoogleSingIn}
          isLoading={isLoading}
        />
      </Content>
    </Container>
  );
}