import { Proveedor } from "./context/Contexto";
import { Rutas } from "./routers/Rutas";
import "./App.css";
import Fondo from "./Fondo/Fondo";

function App() {
  return (
    <Proveedor>
      <Rutas />
    </Proveedor>
  );
}

export default App;
