import AsyncStorage from '@react-native-async-storage/async-storage'

import { USER_TOKEN_STORAGE } from './config/storageAuthTokenConfig'

type StorageAuthTokenPros = {
  token: string;
}

export async function storageAuthTokenSave({ token }: StorageAuthTokenPros){
  await AsyncStorage.setItem(USER_TOKEN_STORAGE, JSON.stringify({ token }))
}

export async function storageAuthTokenGet(){
  const response = await AsyncStorage.getItem(USER_TOKEN_STORAGE)

  const token: StorageAuthTokenPros = response ? JSON.parse(response) : {};

  return { token  }
}