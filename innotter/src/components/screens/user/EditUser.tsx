import { Box, Button, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { IUserEditSchema } from "../profile/shemas";

interface IEditUserProps {
  form: UseFormReturn<IUserEditSchema>;
  Errors: string | undefined;
  onSubmit: SubmitHandler<IUserEditSchema>;
}

export const EditUser: FC<IEditUserProps> = ({ form, Errors, onSubmit }) => {
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
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <Button variant="outlined" component="label" fullWidth>
          Upload Avatar
          <input type="file" hidden {...form.register("file")} />
        </Button>
        <TextField
          error={!!form.formState.errors["username"]}
          required={false}
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          autoComplete="username"
          autoFocus
          helperText={
            form.formState.errors.username
              ? form.formState.errors.username?.message
              : ""
          }
          {...form.register("username")}
        />
        <TextField
          error={!!form.formState.errors.name}
          required={false}
          margin="normal"
          fullWidth
          id="name"
          label="Name"
          autoComplete="name"
          autoFocus
          helperText={
            form.formState.errors.name
              ? form.formState.errors.name?.message
              : ""
          }
          {...form.register("name")}
        />
        <TextField
          error={!!form.formState.errors.surname}
          required={false}
          margin="normal"
          fullWidth
          id="surname"
          label="Surname"
          autoComplete="surname"
          autoFocus
          helperText={
            form.formState.errors.surname
              ? form.formState.errors.surname?.message
              : ""
          }
          {...form.register("surname")}
        />
        <TextField
          error={!!form.formState.errors.email}
          required={false}
          margin="normal"
          fullWidth
          id="email"
          label="Email"
          autoComplete="email"
          autoFocus
          helperText={
            form.formState.errors.email
              ? form.formState.errors.email?.message
              : ""
          }
          {...form.register("email")}
        />
        {form.formState.errors.email?.message}
        <TextField
          error={!!form.formState.errors.phone_number}
          required={false}
          margin="normal"
          fullWidth
          id="phone_number"
          label="Phone number"
          autoComplete="phone_number"
          autoFocus
          helperText={
            form.formState.errors.phone_number
              ? form.formState.errors.phone_number?.message
              : ""
          }
          {...form.register("phone_number")}
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
