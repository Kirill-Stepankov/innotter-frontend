import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../api/axios";
import { AuthContext } from "../providers/AuthProvider";
import { AuthService } from "../services/AuthService";
import { LocalStorageService } from "../services/LocalStorageService";

export const useAxiosInterceptors = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        const token = LocalStorageService.getAccessToken();
        if (token) {
          config.headers["token"] = token;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401) {
          if (
            originalRequest.url === import.meta.env.VITE_REFRESH_TOKEN_URL
          ) {
            LocalStorageService.removeRefreshToken();
            LocalStorageService.removeAccessToken();

            context?.setIsAuth(false);
            navigate("/login", { replace: true });
            return Promise.reject(error);
          }

          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = LocalStorageService.getRefreshToken();
            LocalStorageService.removeAccessToken();
            return AuthService.refreshTokens(refreshToken, originalRequest)
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [context, navigate]);
};
