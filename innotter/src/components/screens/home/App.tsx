import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../api/axios";
import { useAxiosInterceptors } from "../../../hooks/useAxiosInterceptors";

export const App = () => {
  const axiosInterceptors = useAxiosInterceptors();

  const getUserMe = () => {
    return instance.get("http://0.0.0.0:8000/user/me").then((res) => res.data);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: getUserMe,
  });
  return (
    <>
      <div>
        <p>helxlo</p>
        {isLoading ? "Loading..." : JSON.stringify(data)}
        {error?.message}
        {localStorage.getItem("access_token")}
      </div>
    </>
  );
};
