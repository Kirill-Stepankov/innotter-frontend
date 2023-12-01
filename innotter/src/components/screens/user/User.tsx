import { useParams } from "react-router";
import { useAxiosInterceptors } from "../../../hooks/useAxiosInterceptors";
import { useQuery } from "@tanstack/react-query";
import { useUserService } from "../../../hooks/useUserService";

export const User = () => {
  const { id } = useParams();
  const userService = useUserService();
  useAxiosInterceptors();

  const { data, isLoading, } = useQuery({
    queryKey: ["user"],
    queryFn: () => userService.getUserById(id),
  });


  return(<div>

    User
    {isLoading ? "Loading..." : JSON.stringify(data)}
    </div>);
};
