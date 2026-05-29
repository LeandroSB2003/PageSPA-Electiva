import React from "react";
import { useGame } from "../../../hooks/useGame";
import Square from "./Square";

export const Board: React.FC = () => {
  const { board, playTurn } = useGame();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 100px)",
        gridTemplateRows: "repeat(3, 100px)",
        gap: "8px",
        marginTop: "20px",
      }}
    >
      {board.map((value, index) => (
        <Square key={index} value={value} onClick={() => playTurn(index)} />
      ))}
    </div>
  );
};

export default Board;
