import { useContext } from "react";
import { ContextoJuego } from "../context/Contexto";

export const EnJuego = () => {
  const context = useContext(ContextoJuego);
  if (!context) {
    throw new Error("EnJuego debe usarse dentro de un GameProvider");
  }
  return context;
};
