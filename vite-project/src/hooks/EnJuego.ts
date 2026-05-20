import { useContext } from "react";
import { GameContext } from "../context/Contexto";

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("EnJuego debe usarse dentro de un GameProvider");
  }
  return context;
};
