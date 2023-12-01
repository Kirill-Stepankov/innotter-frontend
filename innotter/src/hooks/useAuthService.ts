import { useContext } from "react";
import { instance } from "../api/axios";
import { ILoginInput, ITokens } from "../components/screens/login/schemas";
import { LocalStorageService } from "../services/LocalStorageService";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router";
import { ISignupInput } from "../components/screens/signup/schemas";

export const useAuthService = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const AuthService = {
    getTokens(login_data: ILoginInput) {
      return instance
        .post(import.meta.env.VITE_LOGIN_URL, login_data)
        .then((res) => res.data);
    },

    getUserMe() {
      return instance
        .get(import.meta.env.VITE_USER_ME_URL)
        .then((res) => res.data);
    },

    refreshTokens(refreshToken: string | null, originalRequest: object) {
      return instance
        .post(
          import.meta.env.VITE_REFRESH_TOKEN_URL,
          {},
          {
            headers: {
              token: refreshToken,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            LocalStorageService.setRefreshToken(res.data.refresh_token);
            LocalStorageService.setAccessToken(res.data.access_token);

            instance.defaults.headers.common["token"] =
              LocalStorageService.getAccessToken();
            return instance(originalRequest);
          }
        });
    },

    logout() {
      LocalStorageService.removeAccessToken();
      LocalStorageService.removeRefreshToken();
      context?.setIsAuth(false);
      navigate("/login");
    },

    login(data: ITokens) {
      LocalStorageService.setAccessToken(data.access_token);
      LocalStorageService.setRefreshToken(data.refresh_token);
      context?.setIsAuth(true);
      return navigate("/");
    },

    signup(signup_data: ISignupInput) {
      return instance
        .post(import.meta.env.VITE_SIGNUP_URL, signup_data)
        .then((res) => res.data);
    }
  };

  return AuthService;
};
