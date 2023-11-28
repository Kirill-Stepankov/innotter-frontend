import { instance } from "../api/axios";
import { ILoginInput } from "../components/screens/login/schemas";
import { LocalStorageService } from "./LocalStorageService";

export const AuthService = {
  getTokens(login_data: ILoginInput) {
    return instance
      .post("http://0.0.0.0:8000/auth/login", login_data)
      .then((res) => res.data);
  },

  getUserMe() {
    return instance.get("http://0.0.0.0:8000/user/me").then((res) => res.data);
  },

  refreshTokens(refreshToken: string | null, originalRequest: object) {
    return instance
      .post(
        "http://0.0.0.0:8000/auth/refresh-token",
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
