import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomeView from "../features/game/views/PantallaInicio";
import GameView from "../features/game/views/PantallaJuego";
import LoginView from "../features/game/views/auth/login";
import Register from "../features/game/views/auth/register";
import PantallaResultado from "../features/game/views/PantallaResultado";

const router = createBrowserRouter([
  { path: "/login", element: <LoginView /> },
  { path: "/register", element: <Register /> },
  { path: "/", element: <WelcomeView /> },
  { path: "/game", element: <GameView /> },
  { path: "/result", element: <PantallaResultado /> },
]);

export const AppRouter = () => <RouterProvider router={router} />;