import { StatusBar } from 'react-native';

import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'

import { ThemeProvider } from 'styled-components'

import { SingUp } from "./src/screens/SingUp";

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
    <ThemeProvider theme={theme}>
      <StatusBar  
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <SingUp />
    </ThemeProvider>
  );
}

