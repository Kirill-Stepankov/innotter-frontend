import { useQuery } from "@tanstack/react-query";
import { useAxiosInterceptors } from "../../../hooks/useAxiosInterceptors";
import { AuthService } from "../../../services/AuthService";
import { useState } from "react";
import { Link } from "react-router-dom";

export const App = () => {
  useAxiosInterceptors();
  const [count, setCount] = useState<number>(0)

  const { data, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: AuthService.getUserMe,
  });
  return (
    <>
      <div>
        {isLoading ? "Loading..." : JSON.stringify(data)}
        {error?.message}
        {count}
         <button onClick={() => setCount(count+1)}>click</button>
         <p>
          <Link to='/home'>Home</Link>
         </p>
      </div>
    </>
  );
};
