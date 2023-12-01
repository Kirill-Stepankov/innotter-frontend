import { Routes, Route } from "react-router-dom";
import { App } from "./screens/home/App";
import { AuthenticatedRoute } from "../HOC/AuthenticatedRoute";
import AuthProvider from "../providers/AuthProvider";
import { AnonymousRoute } from "../HOC/AnonymousRoute";
import { Home } from "./screens/home/Home";
import { Navbar } from "./Navbar";
import { Container } from "@mui/material";
import { Login } from "./screens/login/Login";
import { Signup } from "./screens/signup/Signup";
import { Profile } from "./screens/profile/Profile";
import { User } from "./screens/user/User";
import { EditProfile } from "./screens/profile/EditProfile";

export function Root() {
  return (
    <AuthProvider>
      <Navbar />
      <Container sx={{ marginTop: "30px" }}>
        <Routes>
          <Route path="/user">
            <Route index element={<div>Not Found</div>} />
            <Route
              path=":id"
              element={<AuthenticatedRoute page={<User />} />}
            />
            <Route
              path="me"
              element={<AuthenticatedRoute page={<Profile />} />}
            />
            <Route
              path="settings"
              element={<AuthenticatedRoute page={<EditProfile />} />}
            />
          </Route>
          <Route
            path="/home"
            element={<AuthenticatedRoute page={<Home />} />}
          />
          <Route path="/" element={<AuthenticatedRoute page={<App />} />} />
          <Route path="/login" element={<AnonymousRoute page={<Login />} />} />
          <Route
            path="/signup"
            element={<AnonymousRoute page={<Signup />} />}
          />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Container>
    </AuthProvider>
  );
}
