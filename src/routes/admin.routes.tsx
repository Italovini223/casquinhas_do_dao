import { Platform } from "react-native"
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { useTheme } from "styled-components/native"

import { House } from "phosphor-react-native"

import { Home } from "../screens/Home"
import { EditOrder } from "../screens/EditOrder"


type AdminRoutes = {
  home: undefined;
  newProduct: undefined;
  editProduct: undefined;
  editOrder: { id: string };
}

export type AdminNavigationRoutesProps = BottomTabNavigationProp<AdminRoutes>
const { Navigator, Screen } = createBottomTabNavigator<AdminRoutes>();

export function AdminRoutes(){
  const { COLORS } = useTheme();
  const iconSize = 26;
  
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
    </Navigator>
  )
}