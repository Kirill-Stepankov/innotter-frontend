import { useQuery } from "@tanstack/react-query";
import { useAxiosInterceptors } from "../../../hooks/useAxiosInterceptors";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { useUserService } from "../../../hooks/useUserService";


export const App = () => {
  const userService = useUserService()
  useAxiosInterceptors();

  const { data, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: userService.getUserMe,
  });
  return (
    <>
      <div>
      <Button variant="contained">Hello world</Button>
        {isLoading ? "Loading..." : JSON.stringify(data)}
        {error?.message}
         <p>
          <Link to='/home'>Home</Link>
         </p>
      </div>
    </>
  );
};
