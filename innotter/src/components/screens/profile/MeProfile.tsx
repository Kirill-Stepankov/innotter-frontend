import { useGetMe } from "./hooks/useGetMe";
import { useDeleteMe } from "./hooks/useDeleteMe";
import { User } from "../user/User";

export const MeProfile = () => {
  const query = useGetMe();
  const { mutate } = useDeleteMe();

  const handleDelete = () => {
    mutate();
  };

  return <User query={query} owner={true} handleDelete={handleDelete} />
};
