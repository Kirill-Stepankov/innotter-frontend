import { instance } from "../api/axios";
import { IUser } from "../components/screens/profile/shemas";

export const useUserService = () => {
  const UserService = {
    getUserMe() {
      return instance.get(import.meta.env.VITE_USER_ME_URL).then((res) => {
        const data = res.data as IUser;
        return data;
      });
    },

    deleteUserMe() {
      return instance
        .delete(import.meta.env.VITE_USER_ME_URL)
        .then((res) => res.data);
    },

    patchUserMe(data: FormData) {
        return instance.patch(import.meta.env.VITE_USER_ME_URL, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    },

    getUserById(id: string | undefined) {
      return instance
        .get(import.meta.env.VITE_USER_URL + "/" + id)
        .then((res) => {
          const data = res.data as IUser;
          return data;
        });
    },
  };

  return UserService;
};
