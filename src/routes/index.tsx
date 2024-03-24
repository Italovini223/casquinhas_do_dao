import { useEffect, useState } from 'react'

import{ DefaultTheme, NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'
import { AdminRoutes } from './admin.routes'

import { useUser } from '@realm/react'


import { useTheme } from 'styled-components/native'

import { useQuery } from '../libs/realm'
import { Admin } from "../libs/realm/schemas/admin"

export function Routes(){
  const [isAdmin, setIsAdmin] = useState(false);
  const { COLORS } = useTheme();
  const adminRequests = useQuery(Admin);
  const user = useUser();


  function verifyAdmin(){
    const admin = adminRequests.find(admin => admin.is_admin == true && admin.user_id == user.id);
    
    if(admin){
      setIsAdmin(true);
    }
  }

  const theme = DefaultTheme;
  theme.colors.background = COLORS.GRAY_800;

  useEffect(() => {
    verifyAdmin();
  })

  return (
    <NavigationContainer theme={theme}>
      {
        isAdmin ? <AdminRoutes /> :  <AppRoutes />
      }
    </NavigationContainer>
  )
}