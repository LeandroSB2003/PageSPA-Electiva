import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PantallaInicio from "../features/game/views/PantallaInicio";
import PantallaJuego from "../features/game/views/PantallaJuego";
import PantallaResultado from "../features/game/views/PantallaResultado";
import LoginView from "../features/game/views/auth/login";
import Register from "../features/game/views/auth/register";

const router = createBrowserRouter([

  { path: "/", element: <LoginView /> },
  { path: "/register", element: <Register /> },
  { path: "/inicio", element: <PantallaInicio /> },
  { path: "/juego", element: <PantallaJuego /> },
  { path: "/resultado", element: <PantallaResultado /> },


]);

export const Rutas = () => <RouterProvider router={router} />;