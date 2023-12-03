import { AxiosError } from "axios";
import { useUserService } from "../../../../hooks/useUserService";
import { useNavigate } from "react-router-dom";
import { IErrorData } from "../../schemas";
import { Dispatch } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAxiosInterceptors } from "../../../../hooks/useAxiosInterceptors";

interface IPatchMeProps {
  setErrors: Dispatch<React.SetStateAction<string | undefined>>;
}

export const usePatchMe = ({ setErrors }: IPatchMeProps) => {
  const navigate = useNavigate();
  const userService = useUserService();
  useAxiosInterceptors();

  const handleSuccessPatch = () => {
    navigate("/user/me");
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
    mutationFn: userService.patchUserMe,
    onSuccess: handleSuccessPatch,
    onError: handleError,
  });

  return mutation;
};
