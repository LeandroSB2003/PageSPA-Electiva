import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomeView from "../features/game/views/PantallaInicio";
import GameView from "../features/game/views/PantallaJuego";
import ResultView from "../features/game/views/PantallaResultado";
import LoginView from "../features/game/views/auth/login";

const router = createBrowserRouter([
  { path: "/", element: <WelcomeView /> },
  { path: "/game", element: <GameView /> },
  { path: "/result", element: <ResultView /> },
  { path: "/login", element: <LoginView /> },
]);

export const AppRouter = () => <RouterProvider router={router} />;