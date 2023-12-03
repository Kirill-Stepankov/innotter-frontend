import { AxiosError } from "axios";
import { useUserService } from "../../../../hooks/useUserService";
import { useNavigate } from "react-router-dom";
import { IErrorData } from "../../schemas";
import { Dispatch } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAxiosInterceptors } from "../../../../hooks/useAxiosInterceptors";

interface IPatchUserProps {
  setErrors: Dispatch<React.SetStateAction<string | undefined>>;
  init_id: string | undefined
}

export const usePatchUser = ({ setErrors, init_id }: IPatchUserProps) => {
  const navigate = useNavigate();
  const userService = useUserService();
  useAxiosInterceptors();
  const id = init_id as string

  const handleSuccessPatch = () => {
    navigate("/user/"+id);
  };

  const handleError = (error: AxiosError) => {
    if (error.response?.status == 422) {
      const data = error.response.data as Map<string, string>;

      if ("detail" in data) {
        const error_data = error.response.data as IErrorData;
        setErrors(error_data.detail);
      }

      console.log(data);
    }
  };
  const mutation = useMutation({
    mutationFn: (data: FormData) => userService.patchUser(data, id),
    onSuccess: handleSuccessPatch,
    onError: handleError,
  });

  return mutation;
};
