import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs"

import { Platform } from "react-native"

import { useApp } from "@realm/react"

import { House, IceCream, SignOut, Money } from "phosphor-react-native"

import { useTheme } from "styled-components/native"

import { Loading } from "../components/Loading"

import { New } from "../screens/New"
import { Home } from "../screens/Home"
import { useEffect } from "react"
import { ToPay } from "../screens/ToPay"


type AppRoutes = {
  home: undefined;
  new: undefined;
  singOut: undefined;
  toPay: undefined;
}
export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes(){
  const { COLORS } = useTheme();
  const iconSize = 26;

  return (
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
        name="new"
        component={New}
        options={{
          tabBarIcon: ({ color }) => (
            <IceCream 
              color={color}
              size={iconSize}
            />
          )
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
        name="singOut"
        component={() => {
          const app = useApp();

          useEffect(() => {
            function handleLogout(){
              app.currentUser?.logOut();
            }

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