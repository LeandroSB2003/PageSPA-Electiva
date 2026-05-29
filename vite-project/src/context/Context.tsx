import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { checkWinner } from "../utils/Utils";
import type { BoardState } from "../utils/Utils";

interface GameContextType {
  board: BoardState;
  turn: "X" | "O";
  winner: string | null;
  isDraw: boolean;
  playerX: string;
  playerO: string;
  currentTurnName: string;
  playTurn: (index: number) => void;
  resetGame: () => void;
  setPlayerO: (name: string) => void;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");

  const [playerX, setPlayerX] = useState<string>("Player X");
  const [playerO, setPlayerO] = useState<string>("Player O");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const displayName = user.displayName || user.email?.split('@')[0] || "Player X";
        setPlayerX(displayName);
      } else {
        setPlayerX("Player X");
      }
    });

    return () => unsubscribe();
  }, []);

  const winner = checkWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);

  const currentTurnName = turn === "X" ? playerX : playerO;

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
      value={{
        board,
        turn,
        winner,
        isDraw,
        playerX,
        playerO,
        currentTurnName,
        playTurn,
        resetGame,
        setPlayerO,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
