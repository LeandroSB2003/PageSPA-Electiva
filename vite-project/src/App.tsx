import { GameProvider } from "./context/Contexto";
import { AppRouter } from "./routers/Rutas";
import "./App.css";
import Fondo from "./Fondo/Fondo";

function App() {
  return (
    <GameProvider>
      <AppRouter />
    </GameProvider>
  );
}

export default App;
