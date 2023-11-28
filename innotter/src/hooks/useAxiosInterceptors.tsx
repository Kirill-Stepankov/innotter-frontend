import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../api/axios";
import { AuthContext } from "../providers/AuthProvider";

export const useAxiosInterceptors = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access_token");
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
            originalRequest.url === "http://0.0.0.0:8000/auth/refresh-token"
          ) {
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("access_token");

            console.log("sssssssssss");
            context?.setIsAuth(false);
            navigate("/login", { replace: true });
            return Promise.reject(error);
          }

          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refresh_token");
            localStorage.removeItem("access_token");
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
                  localStorage.setItem("refresh_token", res.data.refresh_token);
                  localStorage.setItem("access_token", res.data.access_token);

                  instance.defaults.headers.common["token"] =
                    localStorage.getItem("access_token");
                  return instance(originalRequest);
                }
              });
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
