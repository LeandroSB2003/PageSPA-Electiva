import React from "react";
import { useNavigate } from "react-router-dom";
import Fondo from "../../../Fondo/Fondo";
import { EnJuego } from "../../../hooks/EnJuego";
import "./PantallaInicio.css";

const PantallaInicio: React.FC = () => {
  const navegar = useNavigate();
  const { reiniciar } = EnJuego();

  const TInicio = () => {
    reiniciar();
    navegar("/juego");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
      <h1
        style={{
          color: "white",
          textAlign: "center",
        }}
      >

        Tic Tac Toe
      </h1>
      <button
        onClick={TInicio}
        className="bn3"
        style={{ marginTop: "10%" }}
      >
        Iniciar Partida
      </button>
      <center>
        <h2
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "10%",
          }}
        >
          Nicol Leandro Sanchez Bermudez
        </h2>
      </center>
      <center>
        <h2
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Santiago Bedoya Gómez
        </h2>
      </center>
      <Fondo />;
    </div>
  );
};

export default PantallaInicio;
