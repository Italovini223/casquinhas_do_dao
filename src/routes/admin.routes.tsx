import { useEffect } from "react"
import { Platform } from "react-native"
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs"

import { useTheme } from "styled-components/native"

import { useAuth } from "../hooks/useAuth"


import { House, Money, SignOut, IdentificationBadge, ListPlus, Package, UserList } from "phosphor-react-native"

import { Loading } from "../components/Loading"
import { Home } from "../screens/Home"
import { EditOrder } from "../screens/EditOrder"
import { NewProduct } from "../screens/NewProduct"
import { Products } from "../screens/Products"
import { ProductDetails } from "../screens/ProductDetails"
import { AdminRequest } from "../screens/AdminRequest"
import { UsersList } from "../screens/UsersList"
import { ToPay } from "../screens/ToPay"
import { Details } from "../screens/Details"


type AdminRoutes = {
  home: undefined;
  newProduct: undefined;
  editProduct: undefined;
  editOrder: { id: string };
  singOut: undefined;
  adminRequest: undefined;
  products: undefined;
  productDetails: { id: string };
  usersList: undefined;
  toPay: { id: string, userName: string };
  details: { id: string };
}

export type AdminNavigationRoutesProps = BottomTabNavigationProp<AdminRoutes>
const { Navigator, Screen } = createBottomTabNavigator<AdminRoutes>();

export function AdminRoutes(){
  const { COLORS } = useTheme();
  const iconSize = 26;
  const { user, singOut } = useAuth();
  
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
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none'
          }
        }}
      />

      <Screen 
        name="productDetails"
        component={ProductDetails}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none'
          }
        }}
      />

      <Screen 
        name="details"
        component={Details}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none'
          }
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
        name="usersList"
        component={UsersList}
        options={{
          tabBarIcon: ({ color }) => (
            <UserList 
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
        name="products"
        component={Products}
        options={{
          tabBarIcon: ({ color }) => (
            <Package 
              color={color}
              size={iconSize}
            />
          )
        }}
      />

      <Screen 
        name="singOut"
        component={() => {

          useEffect(() => {
            function handleLogout(){
              singOut();
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