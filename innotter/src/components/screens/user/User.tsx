import { useParams } from "react-router";
import { useGetUser } from "./hooks/useGetUser";
import { NotFound } from "../errors/NotFound";

// проверка что такой юзер вообще существует
export const User = () => {
  const { id } = useParams();
  const query = useGetUser({ id });

  return (
    <>
      {query.error ? (
        <NotFound />
      ) : <User owner={false} />}
    </>
  );
};
