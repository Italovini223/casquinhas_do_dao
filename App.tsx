import 'react-native-get-random-values'

import './src/libs/dayjs'

import { IsAdminContextProvider } from './src/contexts/isAdmin';

import { StatusBar } from 'react-native';

import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'


import { ThemeProvider } from 'styled-components'
import {  SafeAreaProvider } from 'react-native-safe-area-context'

import { AuthContextProvider } from './src/contexts/AuthContext';


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
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <StatusBar  
            barStyle='light-content'
            backgroundColor='transparent'
            translucent
          />

          <AuthContextProvider>
            <IsAdminContextProvider>
              <Routes />
            </IsAdminContextProvider>
          </AuthContextProvider>

   
        </ThemeProvider>
      </SafeAreaProvider>
  );
}

