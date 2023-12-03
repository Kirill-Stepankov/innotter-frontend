import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { IUserEdit, IUserEditSchema } from "./shemas";
import { useState } from "react";
import { usePatchMe } from "./hooks/usePatchMe";

export const EditProfile = () => {
  const [Errors, setErrors] = useState<string>();
  const { mutate } = usePatchMe({ setErrors });

  const schema = yup.object().shape({
    file: yup.mixed<FileList>(),
    username: yup.string().max(255),
    name: yup.string().max(255),
    email: yup.string().email(),
    surname: yup.string().max(255),
    phone_number: yup
      .string()
      .matches(/^(|.{4,255})$/, "Between 4-255 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (dat: IUserEditSchema) => {
    const data = dat as IUserEdit
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
      <Typography component="h1" variant="h5" style={{ marginBottom: "20px" }}>
        Edit Info
      </Typography>
      <Box
        maxWidth="sm"
        component="form"
        onSubmit={handleSubmit((data) => onSubmit(data))}
        noValidate
      >
        <Button variant="outlined" component="label" fullWidth>
          Upload Avatar
          <input type="file" hidden {...register("file")} />
        </Button>
        <TextField
          error={!!errors["username"]}
          required={false}
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          autoComplete="username"
          autoFocus
          helperText={errors.username ? errors.username?.message : ""}
          {...register("username")}
        />
        <TextField
          error={!!errors.name}
          required={false}
          margin="normal"
          fullWidth
          id="name"
          label="Name"
          autoComplete="name"
          autoFocus
          helperText={errors.name ? errors.name?.message : ""}
          {...register("name")}
        />
        <TextField
          error={!!errors.surname}
          required={false}
          margin="normal"
          fullWidth
          id="surname"
          label="Surname"
          autoComplete="surname"
          autoFocus
          helperText={errors.surname ? errors.surname?.message : ""}
          {...register("surname")}
        />
        <TextField
          error={!!errors.email}
          required={false}
          margin="normal"
          fullWidth
          id="email"
          label="Email"
          autoComplete="email"
          autoFocus
          helperText={errors.email ? errors.email?.message : ""}
          {...register("email")}
        />
        {errors.email?.message}
        <TextField
          error={!!errors.phone_number}
          required={false}
          margin="normal"
          fullWidth
          id="phone_number"
          label="Phone number"
          autoComplete="phone_number"
          autoFocus
          helperText={errors.phone_number ? errors.phone_number?.message : ""}
          {...register("phone_number")}
        />
        {Errors ? (
          <Typography style={{ color: "#eb4034" }}>{Errors}</Typography>
        ) : (
          ""
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
