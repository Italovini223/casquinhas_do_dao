import { useContext } from 'react'
import { IsAdminContext } from '../contexts/isAdmin';

export function useIsAdmin(){
  const contextData = useContext(IsAdminContext);

  return contextData;
}