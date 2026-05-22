import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomeView from "../features/game/views/PantallaInicio";
import GameView from "../features/game/views/PantallaJuego";


const router = createBrowserRouter([
  { path: "/", element: <WelcomeView /> },
  { path: "/game", element: <GameView /> },
]);

export const AppRouter = () => <RouterProvider router={router} />;
