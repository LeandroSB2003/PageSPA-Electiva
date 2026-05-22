import { createBrowserRouter, RouterProvider } from "react-router-dom";

import WelcomeView from "../features/game/views/PantallaInicio";
import GameView from "../features/game/views/PantallaJuego";
import LoginView from "../features/game/views/auth/login";
import Register from "../features/game/views/auth/register";

const router = createBrowserRouter([
  { path: "/login", element: <LoginView /> },
  { path: "/register", element: <Register /> },
  { path: "/", element: <WelcomeView /> },
  { path: "/game", element: <GameView /> },
  
]);

export const AppRouter = () => <RouterProvider router={router} />;