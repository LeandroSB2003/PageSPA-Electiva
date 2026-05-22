import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../../hooks/EnJuego";
import Board from "../../board/components/Tablero";
import PlayerStatus from "../../players/components/EstadoJugador";
import Fondo from "../../../Fondo/FondoJuego";
import "./PantallaJuego.css";

const GameView: React.FC = () => {
  const { winner, isDraw } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (winner || isDraw) {
      navigate("/result");
    }
  }, [winner, isDraw, navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "12%",
        boxShadow: "10px 0px 40px rgb(56, 56, 56)",
      }}
    >
      <PlayerStatus />
      <Board />
      <Fondo />;
    </div>
  );
};

export default GameView;
