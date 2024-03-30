import AsyncStorage from "@react-native-async-storage/async-storage";
import { ADMIN_STORAGE } from "./storageConfig";

export async function storageIsAdminSave(isAdmin: boolean){
  await AsyncStorage.setItem(ADMIN_STORAGE, JSON.stringify(isAdmin));
}

export async function storageIsAdminGet(){
  const isAdmin = await AsyncStorage.getItem(ADMIN_STORAGE);

  return isAdmin ? JSON.parse(isAdmin) : false;
}

export async function storageIsAdminRemove(){
  await AsyncStorage.removeItem(ADMIN_STORAGE);
}