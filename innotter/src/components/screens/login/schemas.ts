export interface ILoginInput {
  username: string;
  hashed_password: string;
}

export interface ITokens {
  access_token: string;
  refresh_token: string;
}
