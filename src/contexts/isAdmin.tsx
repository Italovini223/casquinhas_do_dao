import { ReactNode, createContext, useEffect, useState } from "react";
import { storageIsAdminGet, storageIsAdminRemove, storageIsAdminSave } from "../storage/storageIsAdmin";
import { storageUserGet, userDataProps } from "../storage/storageUser";

type isAdminContextProviderProps = {
  children: ReactNode;
}

type isAdminContextDataProps = {
  isAdmin: boolean;
  saveIfIsAdmin: () => void;
  removeIsAdmin: () => void;
}

export const IsAdminContext = createContext<isAdminContextDataProps>({} as isAdminContextDataProps);

export function IsAdminContextProvider({ children }: isAdminContextProviderProps){
  const [isAdmin, setIsAdmin] = useState(false);

  async function saveIfIsAdmin(){
    const user: userDataProps = await storageUserGet();
    const admin = user.isAdmin;
  
    if(admin){
      setIsAdmin(true);
      await storageIsAdminSave(true);
    } else {
      await storageIsAdminSave(false);
    }
  }

  async function getIsAdmin(){
   const data = await storageIsAdminGet();
   setIsAdmin(data);
  }

  async function removeIsAdmin() {
    await storageIsAdminRemove(); 
  }

  useEffect(() => {
    async function loadDatas(){
      await saveIfIsAdmin();
      await getIsAdmin();
    }

    loadDatas();
  }, []);

  return(
    <IsAdminContext.Provider value={{
      isAdmin,
      saveIfIsAdmin,
      removeIsAdmin
    }}>
      {children}
    </IsAdminContext.Provider>
  )
}

