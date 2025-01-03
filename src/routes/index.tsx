import { useState } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/useAuth';

import { SingInRoutes } from './singIn.routes';

import { useTheme } from 'styled-components/native';
import { Loading } from '../components/Loading';
import { AdminRoutes } from './admin.routes';
import { AppRoutes } from './app.routes';

export function Routes() {
  const { user, isLoadingUserData} = useAuth();
  const { COLORS } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = COLORS.GRAY_800;

  if(isLoadingUserData){
    return <Loading />
  }

  console.log(user);


  return (
    <NavigationContainer theme={theme}>
      {
        user?.id ? user?.isAdmin ? <AdminRoutes /> : <AppRoutes /> : <SingInRoutes /> 
      }
    </NavigationContainer>
  );
}