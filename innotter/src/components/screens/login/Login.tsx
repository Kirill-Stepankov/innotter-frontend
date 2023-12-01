import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FC, useState } from "react";
import { ILoginInput } from "./schemas";
import { useAuthService } from "../../../hooks/useAuthService";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IErrorData } from "../schemas";

export const Login: FC = () => {
  const authService = useAuthService();
  const [loginErrors, setLoginErrors] = useState<string>();

  const handleErrors = (error: AxiosError) => {
    if (error.response?.status == 422) {
      const data = error.response?.data as IErrorData;
      setLoginErrors(data.detail);
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
    hashed_password: yup
      .string()
      .min(8, "password must be at least 8 characters")
      .max(155)
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          error={!!errors.username || !!loginErrors}
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          autoComplete="username"
          autoFocus
          helperText={
            errors.username
              ? errors.username?.message
              : loginErrors
              ? loginErrors
              : ""
          }
          {...register("username")}
        />
        <TextField
          error={!!errors.hashed_password}
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="hashed_password"
          autoComplete="current-password"
          helperText={
            errors.hashed_password ? errors.hashed_password?.message : ""
          }
          {...register("hashed_password")}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/signup" style={{color: '#363636'}}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
