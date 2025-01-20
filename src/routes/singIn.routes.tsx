import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs"

import { Platform } from "react-native"

import { useApp } from "@realm/react"

import { House, IceCream, SignOut, Money } from "phosphor-react-native"

import { useTheme } from "styled-components/native"

import { Loading } from "../components/Loading"

import { Register } from "../screens/Register"
import { SingUp } from "../screens/SingUp"


type AppRoutes = {
  register: undefined;
  singUp: undefined;
}

export type SingInRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function SingInRoutes(){
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
          backgroundColor: COLORS.GRAY_800,
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: 30,
          paddingTop: 30,
        }
      }}
    >
      <Screen 
        name="register"
        component={Register}
        options={{
          tabBarShowLabel: false,
        }}
      />

      <Screen 
        name="singUp"
        component={SingUp}
        options={{
          tabBarShowLabel: false,
        }}
      />

      
    </Navigator>
  )
}