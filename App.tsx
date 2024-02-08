import { StatusBar } from 'react-native';

import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'

import { ThemeProvider } from 'styled-components'
import {  SafeAreaProvider } from 'react-native-safe-area-context';

import { Register } from "./src/screens/Register";

import theme from './src/theme'

import { Loading } from './src/components/Loading';

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
        <Register />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

