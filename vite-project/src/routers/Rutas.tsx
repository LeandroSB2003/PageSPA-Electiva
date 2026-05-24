import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PantallaInicio from "../features/game/views/PantallaInicio";
import PantallaJuego from "../features/game/views/PantallaJuego";
import PantallaResultado from "../features/game/views/PantallaResultado";
import LoginView from "../features/game/views/auth/login";
import Register from "../features/game/views/auth/register";

const router = createBrowserRouter([

  { path: "/", element: <PantallaInicio /> },
  { path: "/juego", element: <PantallaJuego /> },
  { path: "/resultado", element: <PantallaResultado /> },
  { path: "/login", element: <LoginView /> },
  { path: "/register", element: <Register /> },

]);

export const Rutas = () => <RouterProvider router={router} />;