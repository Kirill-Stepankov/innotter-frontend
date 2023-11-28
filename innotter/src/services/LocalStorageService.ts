export const LocalStorageService = {
  getAccessToken(): string | null {
    return localStorage.getItem("access_token");
  },

  getRefreshToken(): string | null {
    return localStorage.getItem("refresh_token");
  },

  setAccessToken(access_token: string): void {
    localStorage.setItem("access_token", access_token);
  },

  setRefreshToken(refresh_token: string): void {
    localStorage.setItem("refresh_token", refresh_token);
  },

  removeAccessToken(): void {
    localStorage.removeItem("access_token");
  },

  removeRefreshToken(): void {
    localStorage.removeItem("refresh_token");
  },
};
