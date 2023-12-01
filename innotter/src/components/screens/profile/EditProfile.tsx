import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { useUserService } from "../../../hooks/useUserService";
import { useAxiosInterceptors } from "../../../hooks/useAxiosInterceptors";
import { IUserEdit } from "./shemas";

export const EditProfile = () => {
  const navigate = useNavigate();
  const userService = useUserService();
  useAxiosInterceptors();
  const schema = yup.object().shape({
    file: yup.mixed(),
    username: yup.string().max(255),
    name: yup.string().max(255),
    email: yup.string().email(),
    surname: yup.string().max(255),
    phone_number: yup.string().matches(/^(|.{4,255})$/, "Between 5-34 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const handleSuccessPatch = () => {
    navigate("/user/me");
  };
  const { mutate } = useMutation({
    mutationFn: userService.patchUserMe,
    onSuccess: handleSuccessPatch,
  });

  const onSubmit = (data: IUserEdit) => {
    const formData = new FormData();
    if (data.file[0]) {
      formData.append("file", data.file[0]);
    }

    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("surname", data.surname);
    formData.append("phone_number", data.phone_number);

    mutate(formData);
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
      <Typography component="h1" variant="h5" style={{marginBottom: "20px"}}>
        Edit Info
      </Typography>
      <Box
        maxWidth="sm"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Button variant="outlined" component="label" fullWidth>
          Upload Avatar
          <input type="file" hidden {...register("file")} />
        </Button>
        <TextField
          required={false}
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          autoComplete="username"
          autoFocus
          {...register("username")}
        />
        <TextField
          required={false}
          margin="normal"
          fullWidth
          id="name"
          label="Name"
          autoComplete="name"
          autoFocus
          {...register("name")}
        />
        <TextField
          required={false}
          margin="normal"
          fullWidth
          id="surname"
          label="Surname"
          autoComplete="surname"
          autoFocus
          {...register("surname")}
        />
        <TextField
          required={false}
          margin="normal"
          fullWidth
          id="email"
          label="Email"
          autoComplete="email"
          autoFocus
          {...register("email")}
        />
        <TextField
          required={false}
          margin="normal"
          fullWidth
          id="phone_number"
          label="Phone number"
          autoComplete="phone_number"
          autoFocus
          {...register("phone_number")}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Save
        </Button>
        {errors.username?.message}
      </Box>
    </Box>
  );
};
