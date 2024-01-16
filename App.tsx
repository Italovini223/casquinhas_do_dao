import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'

import { ThemeProvider } from 'styled-components'

import { Home } from "./src/screens/Home";

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
      <Home />
    </ThemeProvider>
  );
}

