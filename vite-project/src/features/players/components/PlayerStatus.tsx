import React from "react";
import { useGame } from "../../../hooks/useGame";

export const PlayerStatus: React.FC = () => {
  const { turn, currentTurnName } = useGame();

  return (
    <h2 style={{ color: "white", marginTop: "1%" }}>
      Turno de:{" "}
      <span style={{ color: turn === "X" ? "#55adff" : "#ff6969" }}>
        {currentTurnName}
      </span>
    </h2>
  );
};

export default PlayerStatus;