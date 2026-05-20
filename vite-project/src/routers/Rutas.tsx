import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomeView from "../features/game/views/PantallaInicio";


const router = createBrowserRouter([
  { path: "/", element: <WelcomeView /> },
]);

export const AppRouter = () => <RouterProvider router={router} />;
