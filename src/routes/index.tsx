import { useEffect, useState } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
import { AdminRoutes } from './admin.routes';
import { SingInRoutes } from './singIn.routes';
import { storageUserGet, userDataProps } from '../storage/storageUser';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { useTheme } from 'styled-components/native';

export function Routes() {
  const { COLORS } = useTheme();
  const { isAdmin } = useIsAdmin();
  const [user, setUser] = useState<userDataProps | null>(null);

  useEffect(() => {
    async function loadUser() {
      const userData = await storageUserGet();
      setUser(userData);
    }

    loadUser();
  }, []);

  const theme = DefaultTheme;
  theme.colors.background = COLORS.GRAY_800;

  return (
    <NavigationContainer theme={theme}>
      {
        user ?  <SingInRoutes /> : isAdmin ? <AdminRoutes /> : <AppRoutes />
      }
    </NavigationContainer>
  );
}