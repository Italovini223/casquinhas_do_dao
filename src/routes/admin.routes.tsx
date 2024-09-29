import { useEffect } from "react"
import { Platform } from "react-native"
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs"

import { useTheme } from "styled-components/native"
import { useApp } from "@realm/react"

import { useIsAdmin } from "../hooks/useIsAdmin"

import { House, Money, SignOut, IdentificationBadge, ListPlus } from "phosphor-react-native"

import { Loading } from "../components/Loading"
import { Home } from "../screens/Home"
import { EditOrder } from "../screens/EditOrder"
import { ToPay } from "../screens/ToPay"
import { AdminRequest } from "../screens/AdminRequest"
import { NewProduct } from "../screens/NewProduct"

type AdminRoutes = {
  home: undefined;
  newProduct: undefined;
  editProduct: undefined;
  editOrder: { id: string };
  toPay: undefined;
  singOut: undefined;
  adminRequest: undefined;
}

export type AdminNavigationRoutesProps = BottomTabNavigationProp<AdminRoutes>
const { Navigator, Screen } = createBottomTabNavigator<AdminRoutes>();

export function AdminRoutes(){
  const { COLORS } = useTheme();
  const iconSize = 26;
  const { removeIsAdmin } = useIsAdmin();
  
  return(
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: COLORS.BRAND_MID,
        tabBarActiveTintColor: COLORS.BRAND_LIGHT,
        tabBarStyle: {
          backgroundColor: COLORS.GRAY_700,
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: 30,
          paddingTop: 30,
        }
      }}
    >
      <Screen 
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <House 
            color={color}
            size={iconSize}
          />
          )
        }}
      />

      <Screen 
        name="editOrder"
        component={EditOrder}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none'
          }
        }}
      />

      <Screen 
        name="toPay"
        component={ToPay}
        options={{
          tabBarIcon: ({ color }) => (
            <Money 
              color={color}
              size={iconSize}
            />
          )
        }}
      />

      <Screen
        name="adminRequest"
        component={AdminRequest}
        options={{
          tabBarIcon: ({ color }) => (
            <IdentificationBadge 
              color={color}
              size={iconSize}
            />
          )
        }}
      />

      <Screen 
        name="newProduct"
        component={NewProduct}
        options={{
          tabBarIcon: ({ color }) => (
            <ListPlus  
              color={color}
              size={iconSize}
            />
          )
        }}
      />

      <Screen 
        name="singOut"
        component={() => {
          const app = useApp();

          useEffect(() => {
            function handleLogout(){
              app.currentUser?.logOut();
            }
            
            removeIsAdmin();
            handleLogout();
          }, []);

          return <Loading />
        }}

        options={{
          tabBarIcon: () => (
            <SignOut 
              color={COLORS.ORANGE_500}
              size={iconSize}
            />
          )
        }}
      />
    </Navigator>
  )
}