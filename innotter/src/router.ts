import { createBrowserRouter } from "react-router-dom";
import { Root } from "./components/Root";

export const router = createBrowserRouter([{ path: "*", Component: Root }]);
