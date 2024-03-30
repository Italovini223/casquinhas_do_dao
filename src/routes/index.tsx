
import{ DefaultTheme, NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'
import { AdminRoutes } from './admin.routes'


import { useIsAdmin } from '../hooks/useIsAdmin'


import { useTheme } from 'styled-components/native'


export function Routes(){
  const { COLORS } = useTheme();
  const { isAdmin } = useIsAdmin();


  const theme = DefaultTheme;
  theme.colors.background = COLORS.GRAY_800;

  return (
    <NavigationContainer theme={theme}>
      {
        isAdmin ? <AdminRoutes /> :  <AppRoutes />
      }
    </NavigationContainer>
  )
}