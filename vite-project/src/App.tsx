import { GameProvider } from "./context/Context";
import { Routes } from "./routers/Routes";
import "./App.css";
import Fondo from "./Fondo/Fondo";

function App() {
  return (
    <GameProvider>
      <Routes />
    </GameProvider>
  );
}

export default App;
