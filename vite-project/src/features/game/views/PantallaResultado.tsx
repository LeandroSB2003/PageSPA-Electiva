import React from "react";
import { useNavigate } from "react-router-dom";
import { EnJuego } from "../../../hooks/EnJuego";
import Fondo from "../../../Fondo/FondoFinal";
import "./PantallaResultado.css";


const PantallaResultado: React.FC = () => {
  const { ganador, dibujando, reiniciar } = EnJuego();
  const navegar = useNavigate();

  const ManejarDeNuevo = () => {
    reiniciar();
    navegar("/juego");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
      <h1 style={{color:"white",padding: "10px 20px" }}>Fin de la Partida</h1>
      {ganador && (
        <h2 style={{ color: "#38a169",padding: "10px 20px" }}>
          Gano el jugador
        </h2>
      )} <h1 style={{ color: "#f6ff41" }}>{ganador}</h1>
      {dibujando && <h2 style={{ color: "#dd6b20" }}>Empate</h2>}

      <div style={{ marginTop: "300px",  marginLeft: "-1000px"  }}>
        <button
          className="bn3"
          onClick={ManejarDeNuevo}
          style={{ padding: "10px 20px", marginRight: "35px" }}
        >
          Jugar Otra Vez
        </button>
        <button className="bn3" onClick={() => navegar("/")} style={{ padding: "10px 20px" }}>
          Volver al Inicio
        </button>
      </div>
      <Fondo />;
    </div>
  );
};

export default PantallaResultado;
