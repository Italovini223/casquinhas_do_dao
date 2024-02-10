import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs"

import { Platform } from "react-native"

import { House, IceCream } from "phosphor-react-native"

import { useTheme } from "styled-components/native"

import { New } from "../screens/New"
import { Home } from "../screens/Home"


type AppRoutes = {
  home: undefined;
  new: undefined;
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
    </Navigator>
  )
}