import { useQuery } from "@tanstack/react-query";
import { useAxiosInterceptors } from "../../../../hooks/useAxiosInterceptors";
import { useUserService } from "../../../../hooks/useUserService";

export const useGetMe = () => {
  const userService = useUserService();
  useAxiosInterceptors();

  const query = useQuery({
    queryKey: ["me"],
    queryFn: userService.getUserMe,
  });

  return query;
};
