import { ReactNode, createContext, useEffect, useState } from "react";
import { useQuery } from "../libs/realm";
import { Admin } from "../libs/realm/schemas/admin";
import { storageIsAdminGet, storageIsAdminRemove, storageIsAdminSave } from "../storage/storageIsAdmin";
import { useUser } from "@realm/react";

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
  const adminRequests = useQuery(Admin);
  const user = useUser();

  async function saveIfIsAdmin(){
    const admin = adminRequests.find(admin => admin.is_admin == true && admin.user_id == user.id);
  
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

