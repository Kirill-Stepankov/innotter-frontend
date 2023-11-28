import { useQuery } from "@tanstack/react-query";
import { useAxiosInterceptors } from "../../../hooks/useAxiosInterceptors";
import { AuthService } from "../../../services/AuthService";

export const App = () => {
  const axiosInterceptors = useAxiosInterceptors();

  const { data, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: AuthService.getUserMe,
  });
  return (
    <>
      <div>
        {isLoading ? "Loading..." : JSON.stringify(data)}
        {error?.message}
      </div>
    </>
  );
};
