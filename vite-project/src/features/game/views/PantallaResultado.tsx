import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../../hooks/EnJuego";
import Fondo from "../../../Fondo/FondoFinal";
import "./PantallaResultado.css";


const PantallaResultado: React.FC = () => {
  const { winner, isDraw, resetGame } = useGame();
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    resetGame(); // Reinicia el estado global [cite: 102]
    navigate("/game");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
      <h1 style={{color:"white",padding: "10px 20px" }}>Fin de la Partida</h1>
      {winner && (
        <h2 style={{ color: "#38a169",padding: "10px 20px" }}>
          Gano el jugador
        </h2>
      )} <h1 style={{ color: "#f6ff41" }}>{winner}</h1>
      {isDraw && <h2 style={{ color: "#dd6b20" }}>Empate</h2>}

      <div style={{ marginTop: "380px",  marginLeft: "-1000px"  }}>
        <button
          className="bn3"
          onClick={handlePlayAgain}
          style={{ padding: "10px 20px", marginRight: "35px" }}
        >
          Jugar Otra Vez
        </button>
        <button className="bn3" onClick={() => navigate("/")} style={{ padding: "10px 20px" }}>
          Volver al Inicio
        </button>
      </div>
      <Fondo />;
    </div>
  );
};

export default PantallaResultado;
