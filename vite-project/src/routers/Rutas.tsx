import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PantallaInicio from "../features/game/views/PantallaInicio";
import PantallaJuego from "../features/game/views/PantallaJuego";
import PantallaResultado from "../features/game/views/PantallaResultado";
import LoginView from "../features/game/views/auth/login";


const router = createBrowserRouter([
  { path: "/", element: <PantallaInicio /> },
  { path: "/juego", element: <PantallaJuego /> },
  { path: "/resultado", element: <PantallaResultado /> },
  { path: "/login", element: <LoginView /> },
]);

export const AppRouter = () => <RouterProvider router={router} />;
