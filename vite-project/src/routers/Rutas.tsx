import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomeView from "../features/game/views/PantallaInicio";
import LoginView from "../features/game/views/auth/login";


const router = createBrowserRouter([
  { path: "/", element: <WelcomeView /> },
  { path: "/login", element: <LoginView /> },
]);

export const AppRouter = () => <RouterProvider router={router} />;
