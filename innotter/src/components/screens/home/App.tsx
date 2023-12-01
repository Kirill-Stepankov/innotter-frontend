import { useQuery } from "@tanstack/react-query";
import { useAxiosInterceptors } from "../../../hooks/useAxiosInterceptors";
import { Link } from "react-router-dom";
import { useAuthService } from "../../../hooks/useAuthService";
import Button from '@mui/material/Button';


export const App = () => {
  const authService = useAuthService()
  useAxiosInterceptors();

  const { data, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: authService.getUserMe,
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
