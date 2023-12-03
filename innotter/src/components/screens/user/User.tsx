import { UseQueryResult } from "@tanstack/react-query";
import { FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../profile/shemas";
import { Button } from "@mui/material";

interface IUserProps {
  owner: boolean;
  query: UseQueryResult<IUser, Error>;
  handleDelete: MouseEventHandler;
}

export const User: FC<IUserProps> = ({ owner, query, handleDelete }) => {
  return (
    <>
      <div>
        {query.isLoading ? (
          "Loading..."
        ) : (
          <div>
            {" "}
            <img src={`data:image/jpeg;base64,${query.data?.image}`} />{" "}
            {JSON.stringify(query.data)}{" "}
          </div>
        )}
        {query.error?.message}
        <p>
          <Link to="/home">Home</Link>
        </p>
        {owner ? (
          <>
            <Link to="/user/settings">
              <Button variant="contained">Settings</Button>
            </Link>
            <br />
            <Button variant="contained" onClick={handleDelete}>
              Delete account
            </Button>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
