export interface IUserBase {
  username: string;
  name: string;
  email: string;
  surname: string;
  phone_number: string;
}

export interface IUser extends IUserBase {
  uuid: string;
  role: string;
  group_id: number;
  is_blocked: boolean;
  s3_path: string;
  image: string;
}

export interface IUserEdit extends IUserBase {
  file: FileList;
}

export interface IUserEditSchema {
  file?: FileList | undefined;
  username?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  surname?: string | undefined;
  phone_number?: string | undefined;
}