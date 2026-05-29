import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../../hooks/useGame";
import Board from "../../board/components/Board";
import PlayerStatus from "../../players/components/PlayerStatus";
import Fondo from "../../../Fondo/FondoJuego";
import "./GameScreen.css";
import { ButtonSignOut } from "../../players/components/ButtonSignOut";

const GameScreen: React.FC = () => {
  const { winner, isDraw } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (winner || isDraw) {
      navigate("/resultado");
    }
  }, [winner, isDraw, navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "10%",
        boxShadow: "10px 0px 40px rgb(56, 56, 56)",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          display: "flex",
          gap: "12px",
          zIndex: 1100,
        }}
      >
        <ButtonSignOut />
      </div>
      <PlayerStatus />
      <Board />
      <Fondo />
    </div>
  );
};

export default GameScreen;
