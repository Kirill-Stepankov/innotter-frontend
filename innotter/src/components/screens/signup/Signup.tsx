import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuthService } from "../../../hooks/useAuthService";
import { useNavigate } from "react-router";
import { ISignupInput } from "./schemas";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IErrorData } from "../schemas";
import { useState } from "react";

export const Signup = () => {
  const [signupErrors, setSignupErrors] = useState<string>();

  const handleErrors = (error: AxiosError) => {
    if (error.response?.status == 422) {
      const error_data = error.response.data as IErrorData;
      setSignupErrors(error_data.detail);
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
      .oneOf([yup.ref("hashed_password")], "Passwords are not the same.")
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
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box maxWidth="sm">
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            error={!!errors.username || !!signupErrors}
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
                : signupErrors
                ? signupErrors
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
          <TextField
            error={!!errors.repeat_password}
            margin="normal"
            required
            fullWidth
            label="Repeat password"
            type="password"
            id="repeat_password"
            autoComplete="repeat-password"
            helperText={
              errors.repeat_password ? errors.repeat_password?.message : ""
            }
            {...register("repeat_password")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/login" style={{ color: "#363636" }}>
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
