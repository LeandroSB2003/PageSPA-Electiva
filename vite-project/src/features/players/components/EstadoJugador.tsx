import React from "react";
import { useGame } from "../../../hooks/EnJuego";

export const EstadoJugador: React.FC = () => {
  const { turn } = useGame();

  return (
    <h2 style={{ color: "white", marginTop: "1%",}}>
      Turno del Jugador: {" "}
      <span style={{ color: turn === "X" ? "#55adff" : "#ff6969" }}>
        {turn}
      </span>
    </h2>
  );
};

export default EstadoJugador;
