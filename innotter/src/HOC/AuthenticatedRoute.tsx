import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { SpecificRouteProps } from "./AnonymousRoute";
import { AuthContext } from "../providers/AuthProvider";

export const AuthenticatedRoute: FC<SpecificRouteProps> = ({
  page,
}) => {
  const context = useContext(AuthContext);
  return <>{context?.isAuth ? page : <Navigate to="/login" />}</>;
};
