import { Routes, Route } from "react-router-dom";
import { App } from "./screens/home/App";
import { Login } from "./screens/login/Login";
import { AuthenticatedRoute } from "../HOC/AuthenticatedRoute";
import AuthProvider from "../providers/AuthProvider";
import { AnonymousRoute } from "../HOC/AnonymousRoute";
import { Home } from "./screens/home/Home";

export function Root() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/home" element={<AuthenticatedRoute page={<Home />} />} />
        <Route
          path="/"
          element={<AuthenticatedRoute page={<App />} />}
        />
        <Route path="/login" element={<AnonymousRoute page={<Login />} />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </AuthProvider>
  );
}
