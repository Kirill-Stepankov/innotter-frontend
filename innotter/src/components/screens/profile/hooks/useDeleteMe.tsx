import { useMutation } from "@tanstack/react-query";
import { useAuthService } from "../../../../hooks/useAuthService";
import { useAxiosInterceptors } from "../../../../hooks/useAxiosInterceptors";
import { useUserService } from "../../../../hooks/useUserService";

export const useDeleteMe = () => {
    const userService = useUserService();
  const authService = useAuthService();
  useAxiosInterceptors();

  const handleSuccessDelete = () => {
    authService.logout();
  };

  const mutation = useMutation({
    mutationFn: userService.deleteUserMe,
    onSuccess: handleSuccessDelete,
  });

  return mutation
}