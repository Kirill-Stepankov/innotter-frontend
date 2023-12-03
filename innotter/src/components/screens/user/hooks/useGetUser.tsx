import { useQuery } from "@tanstack/react-query";
import { useUserService } from "../../../../hooks/useUserService";
import { useAxiosInterceptors } from "../../../../hooks/useAxiosInterceptors";

interface IUserParams {
  id: string | undefined;
}

export const useGetUser = ({ id }: IUserParams) => {
  const userService = useUserService();
  useAxiosInterceptors();

  const query = useQuery({
    queryKey: ["user"],
    queryFn: () => userService.getUserById(id),
    retry: false
  });

  return query
};
