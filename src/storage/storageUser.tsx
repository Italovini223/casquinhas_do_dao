import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "./config/storageUserConfig";

export type userDataProps = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function storageUserSave(user: userDataProps){
  const userExists = await AsyncStorage.getItem(USER_STORAGE);
  if(userExists){
    await AsyncStorage.removeItem(USER_STORAGE);
  }
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet(){
  const user = await AsyncStorage.getItem(USER_STORAGE);

  return user ? JSON.parse(user) : {} as userDataProps;
}

export async function storageUserRemove(){
  await AsyncStorage.removeItem(USER_STORAGE);
}