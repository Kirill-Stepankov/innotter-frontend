import { useState } from "react";
import { usePatchMe } from "./hooks/usePatchMe";
import { EditUser } from "../user/EditUser";
import { useEditUser } from "../user/hooks/useEditUser";

export const EditMeProfile = () => {
  const [Errors, setErrors] = useState<string>();
  const mutation = usePatchMe({ setErrors });

  const {form, onSubmit} = useEditUser(mutation);

  return <EditUser form={form} Errors={Errors} onSubmit={onSubmit} />;
};
