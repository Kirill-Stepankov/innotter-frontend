import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useAuthService } from "../hooks/useAuthService";

export const Navbar = () => {
  const context = useContext(AuthContext);
  const authService = useAuthService()

  return (
    <>
      <div>
        Navbar {context?.isAuth ? <button onClick={authService.logout}>logout</button> : <></>}
        </div>
    </>
  );
};

export default Navbar;
