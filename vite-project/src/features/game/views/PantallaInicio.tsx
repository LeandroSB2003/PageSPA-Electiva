import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Fondo from "../../../Fondo/Fondo";
import { EnJuego } from "../../../hooks/EnJuego";
import "./PantallaInicio.css";
import { Ranking } from "../../players/components/Ranking";
import { ButtonSignOut } from "../../players/components/ButtonSignOut";

const PantallaInicio: React.FC = () => {
  const [showRanking, setShowRanking] = useState(false);
  const navegar = useNavigate();
  const { reiniciar } = EnJuego();

  const TInicio = () => {
    reiniciar();
    navegar("/juego");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
     <div style={{
  position: "fixed",
  top: "20px",
  right: "20px",
  display: "flex",
  gap: "12px",
  zIndex: 1100
}}>
  <button
    onClick={() => setShowRanking(!showRanking)}
    style={{
      background: "transparent",
      border: "none",
      cursor: "pointer",
      fontSize: "28px",
      color: "white"
    }}
  >
    🏆
  </button>

  <ButtonSignOut />
</div>
            {showRanking && (
              <div style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#111",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 0 15px rgba(0,0,0,0.5)",
                zIndex: 1000,
                color: "white"
              }}>
                <Ranking />
                <button
                  onClick={() => setShowRanking(false)}
                  style={{ marginTop: "10px", padding: "8px 16px" }}
                >
                  Cerrar
                </button>
              </div>
            )}
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
