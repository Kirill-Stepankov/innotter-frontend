import { instance } from "../api/axios";
import { ILoginInput } from "../components/screens/login/schemas";

export const AuthService = {
  getTokens(login_data: ILoginInput) {
    return instance
      .post("http://0.0.0.0:8000/auth/login", login_data)
      .then((res) => res.data);
  },
};
