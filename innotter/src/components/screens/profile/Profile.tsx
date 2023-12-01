import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxiosInterceptors } from "../../../hooks/useAxiosInterceptors";
import { Link } from "react-router-dom";
import { useUserService } from "../../../hooks/useUserService";
import { Button } from "@mui/material";
import { useAuthService } from "../../../hooks/useAuthService";

export const Profile = () => {
  const userService = useUserService();
  const authService = useAuthService();
  useAxiosInterceptors();

  const { data, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: userService.getUserMe,
  });

  const handleSuccessDelete = () => {
    authService.logout();
  };

  const { mutate } = useMutation({
    mutationFn: userService.deleteUserMe,
    onSuccess: handleSuccessDelete,
  });

  const handleDelete = () => {
    mutate();
  };
  return (
    <>
      <div>
        {isLoading ? (
          "Loading..."
        ) : (
          <div>
            {" "}
            <img src={`data:image/jpeg;base64,${data?.image}`} />{" "}
            {JSON.stringify(data)}{" "}
          </div>
        )}
        {error?.message}
        <p>
          <Link to="/home">Home</Link>
        </p>
        <Link to="/user/settings">
          <Button variant="contained">Settings</Button>
        </Link>
        <br />
        <Button variant="contained" onClick={handleDelete}>
          Delete account
        </Button>
      </div>
    </>
  );
};
