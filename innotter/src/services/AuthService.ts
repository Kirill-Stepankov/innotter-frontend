import { instance } from "../api/axios";
import { ILoginInput } from "../components/screens/login/schemas";
import { LocalStorageService } from "./LocalStorageService";

export const AuthService = {
  getTokens(login_data: ILoginInput) {
    return instance
      .post(import.meta.env.VITE_LOGIN_URL, login_data)
      .then((res) => res.data);
  },

  getUserMe() {
    return instance.get(import.meta.env.VITE_USER_ME_URL).then((res) => res.data);
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
};
