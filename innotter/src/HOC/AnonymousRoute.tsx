import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export interface SpecificRouteProps {
  page: JSX.Element;
}

export const AnonymousRoute: FC<SpecificRouteProps> = ({ page }) => {
  const context = useContext(AuthContext);
  return <>{!context?.isAuth ? page : <Navigate to="/" />}</>;
};
