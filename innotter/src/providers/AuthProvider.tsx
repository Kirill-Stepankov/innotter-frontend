import { FC, ReactNode, createContext, useState } from "react";
import { LocalStorageService } from "../services/LocalStorageService";

interface IAuthContext {
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  export const AuthContext = createContext<IAuthContext | null>(null);

interface IAuthProvider {
    children: ReactNode
}

const AuthProvider: FC<IAuthProvider> = ({children}) => {
  const [isAuth, setIsAuth] = useState<boolean>(
    !!LocalStorageService.getAccessToken()
  );

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
