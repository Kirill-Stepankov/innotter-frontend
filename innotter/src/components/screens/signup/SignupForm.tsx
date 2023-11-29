import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuthService } from "../../../hooks/useAuthService";
import { useNavigate } from "react-router";
import { ISignupInput } from "./schemas";

export const SignupForm = () => {
  const handleErrors = (error: AxiosError) => {
    if (error.response?.status == 422) {
      // пока просто выводит ошибку в консоль
      console.log(error.response.data);
    }
  };

  const authService = useAuthService();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: authService.signup,
    onError: handleErrors,
    onSuccess: () => navigate("/login"),
  });

  const schema = yup.object().shape({
    username: yup.string().max(255).required(),
    hashed_password: yup.string().min(8).max(155).required(),
    repeat_password: yup
      .string()
      .oneOf([yup.ref("hashed_password")])
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (signup_data: ISignupInput) => {
    mutate(signup_data);
  };

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
      <input
        type="password"
        placeholder="Repeat password..."
        {...register("repeat_password")}
      />
      <p>{errors.repeat_password?.message}</p>
      <input type="submit" />
    </form>
  );
};
