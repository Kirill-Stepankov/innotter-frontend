import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { IUserEdit, IUserEditSchema } from "../../profile/shemas";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useEditUser = (mutation : UseMutationResult<AxiosResponse, AxiosError, FormData, unknown>) => {
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

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (init_data: IUserEditSchema) => {
    const data = init_data as IUserEdit;
    const formData = new FormData();
    if (data.file[0]) {
      formData.append("file", data.file[0]);
    }

    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("surname", data.surname);
    formData.append("phone_number", data.phone_number);

    mutation.mutate(formData);
  };

  return {form, onSubmit}


};
