import { EditUser } from "./EditUser";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePatchUser } from "./hooks/usePatchUser";
import { useEditUser } from "./hooks/useEditUser";

export const EditUserProfile = () => {
  const { id } = useParams();
  const init_id = id

  const [Errors, setErrors] = useState<string>();
  const mutation = usePatchUser({ setErrors, init_id });

  const {form, onSubmit} = useEditUser(mutation);

  return <EditUser form={form} Errors={Errors} onSubmit={onSubmit} />;
};
