import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { FC, useContext } from "react";
import { instance } from "../../../api/axios";
import { AuthContext } from "../../../providers/AuthProvider";
import { ILoginInput, ITokens } from "./schemas";

export const LoginForm: FC = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const getTokens = (login_data: ILoginInput) => {
    return instance
      .post("http://0.0.0.0:8000/auth/login", login_data)
      .then((res) => res.data);
  };

  const handleErrors = (error: AxiosError) => {
    if (error.response?.status == 422) {
      console.log(error.response.data);
    }
  };

  const handleTokens = (data: ITokens) => {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    context?.setIsAuth(true);
    return navigate("/");
  };

  const { mutate } = useMutation({
    mutationFn: getTokens,
    onError: handleErrors,
    onSuccess: handleTokens,
  });

  const onSubmit = (login_data: ILoginInput) => {
    mutate(login_data);
  };

  const schema = yup.object().shape({
    username: yup.string().max(255).required(),
    hashed_password: yup.string().min(8).max(155).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Username..." {...register("username")} />
      <p>{errors.username?.message}</p>
      <input
        type="password"
        placeholder="Password..."
        {...register("hashed_password")}
      />
      <p>{errors.hashed_password?.message}</p>
      <input type="submit" />
    </form>
  );
};
