import { useParams } from "react-router";
import { useGetUser } from "./hooks/useGetUser";
import { NotFound } from "../errors/NotFound";
import { User } from "./User";

export const UserProfile = () => {
  const { id } = useParams();
  const query = useGetUser({ id });

  return (
    <>
      {query.error ? (
        <NotFound />
      ) : (
        <User query={query} owner={false} handleDelete={() => {}} />
      )}
    </>
  );
};
