import 'react-native-get-random-values'

import './src/libs/dayjs'

import { StatusBar } from 'react-native';

import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'

import { AppProvider, UserProvider } from '@realm/react';

import { ThemeProvider } from 'styled-components'
import {  SafeAreaProvider } from 'react-native-safe-area-context'

import { RealmProvider } from './src/libs/realm'

import { Register } from "./src/screens/Register"

import { REALM_APP_ID } from '@env'

import theme from './src/theme'

import { Routes } from './src/routes'

import { Loading } from './src/components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  if(!fontsLoaded){
    return(
      <Loading />
    )
  }
  return (
    <AppProvider id={REALM_APP_ID}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <StatusBar  
            barStyle='light-content'
            backgroundColor='transparent'
            translucent
          />
          <UserProvider fallback={Register}>
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </AppProvider>
  );
}

