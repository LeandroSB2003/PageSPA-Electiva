import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomeView from "../features/game/views/PantallaInicio";
<<<<<<< HEAD
import GameView from "../features/game/views/PantallaJuego";
=======
import LoginView from "../features/game/views/auth/login";
>>>>>>> c00fd65daba245c13bda1b9809bf42f7095f5a20


const router = createBrowserRouter([
  { path: "/", element: <WelcomeView /> },
<<<<<<< HEAD
  { path: "/game", element: <GameView /> },
=======
  { path: "/login", element: <LoginView /> },
>>>>>>> c00fd65daba245c13bda1b9809bf42f7095f5a20
]);

export const AppRouter = () => <RouterProvider router={router} />;
