import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useGetMe } from "./hooks/useGetMe";
import { useDeleteMe } from "./hooks/useDeleteMe";

export const Profile = () => {
  const { isLoading, data, error } = useGetMe();
  const { mutate } = useDeleteMe();

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
