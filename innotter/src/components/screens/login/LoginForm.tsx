import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FC } from "react";
import { ILoginInput } from "./schemas";
import { useAuthService } from "../../../hooks/useAuthService";

export const LoginForm: FC = () => {
  const authService = useAuthService();

  const handleErrors = (error: AxiosError) => {
    if (error.response?.status == 422) {
      // пока просто выводит ошибку в консоль
      console.log(error.response.data);
    }
  };



  const { mutate } = useMutation({
    mutationFn: authService.getTokens,
    onError: handleErrors,
    onSuccess: authService.login,
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
