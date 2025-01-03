import { ReactNode, createContext, useState, useEffect } from "react";

import { userDto } from "../dtos/userDto";

import { api } from "../utils/api";

import { storageUserGet, storageUserSave, storageUserRemove } from "../storage/storageUser";
import { storageAuthTokenSave, storageAuthTokenGet } from "../storage/storageAuthToken";


type AuthContextProviderProps = {
  children: ReactNode;
}

type AuthContextDataProps = {
  user: userDto;
  singIn: (email: string, password: string) => Promise<void>;
  singOut: () => Promise<void>
  isLoadingUserData: boolean;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({children}:AuthContextProviderProps){
  const [user, setUser] = useState<userDto>({} as userDto)
  const [isLoadingUserData, setIsLoadingUserData] = useState(true)

  async function storageUserAndTokenSave(userData: userDto, token: string,){
    try {

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      await storageUserSave(userData)
      await storageAuthTokenSave({token})

      setUser(userData)
    } catch (error) {
      throw error
    }

  }

  async function userAndTokenUpdate(userData: userDto, token: string){
    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(userData)
      
    } catch (error) {
      throw error
    }
  }

  async function singIn(email: string, password: string){
    try {
      const { data } = await api.post('/section', {
        email,
        password
      })

      if(data.user && data.token && data) {
       storageUserAndTokenSave(data.user, data.token)
      }

    } catch (error){
      throw error
    }
  }

  async function loadUserData(){
    try {
      const userLogged = await storageUserGet()
      const {token} = await storageAuthTokenGet()
  
      if(token && userLogged){
        await userAndTokenUpdate(userLogged, token)
        setIsLoadingUserData(false)
      }
    } catch (error){
      throw error
    } finally {
      setIsLoadingUserData(false)
    }
  }

  async function singOut(){
    try {
      setUser({} as userDto)
      await storageUserRemove()
    } catch(error){
      throw error
    }
  }


  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        singIn,
        isLoadingUserData,
        singOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}