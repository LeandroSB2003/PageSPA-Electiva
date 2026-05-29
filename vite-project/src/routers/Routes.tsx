import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StartScreen from "../features/game/views/StartScreen";
import GameScreen from "../features/game/views/GameScreen";
import ResultScreen from "../features/game/views/ResultScreen";
import LoginView from "../features/game/views/auth/Login";
import Register from "../features/game/views/auth/Register";

const router = createBrowserRouter([
  { path: "/", element: <LoginView /> },
  { path: "/register", element: <Register /> },
  { path: "/inicio", element: <StartScreen /> },
  { path: "/game", element: <GameScreen /> },
  { path: "/resultado", element: <ResultScreen /> },
]);

export const Routes = () => <RouterProvider router={router} />;
