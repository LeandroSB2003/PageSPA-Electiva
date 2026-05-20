import React, { createContext, useState } from "react";
import type { ReactNode } from "react";
import { checkWinner } from "../utils/Utilidades";
import type { BoardState } from "../utils/Utilidades";

interface GameContextType {
  board: BoardState;
  turn: "X" | "O";
  winner: string | null;
  isDraw: boolean;
  playTurn: (index: number) => void;
  resetGame: () => void;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");

  const winner = checkWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);

  const playTurn = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    if (!checkWinner(newBoard)) {
      setTurn(turn === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
  };

  return (
    <GameContext.Provider
      value={{ board, turn, winner, isDraw, playTurn, resetGame }}
    >
      {children}
    </GameContext.Provider>
  );
};
