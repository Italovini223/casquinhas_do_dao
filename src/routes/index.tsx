import{ DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'

import { useTheme } from 'styled-components/native'

export function Routes(){
  const { COLORS } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = COLORS.GRAY_800;

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />
    </NavigationContainer>
  )
}