import AsyncStorage from "@react-native-async-storage/async-storage";

import { USER_TOKEN_STORAGE } from "./config/storageAuthTokenConfig";

type storageAuthTokenDataPros = {
  token: string;
}

export async function storageAuthTokenSave({ token }: storageAuthTokenDataPros){

  const tokenAlreadyExists = await AsyncStorage.getItem(USER_TOKEN_STORAGE);

  if(tokenAlreadyExists){
    await AsyncStorage.removeItem(USER_TOKEN_STORAGE);
  }
    

  await AsyncStorage.setItem(USER_TOKEN_STORAGE, JSON.stringify(token));
}

export async function storageAuthTokenRemove(){
  await AsyncStorage.removeItem(USER_TOKEN_STORAGE);
}

export async function storageAuthTokenGet(){
  const response = await AsyncStorage.getItem(USER_TOKEN_STORAGE);
  const { token }: storageAuthTokenDataPros = response ? JSON.parse(response) : { };

  return { token };
}
