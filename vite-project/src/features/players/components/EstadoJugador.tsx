import React from "react";
import { EnJuego } from "../../../hooks/EnJuego";

export const EstadoJugador: React.FC = () => {
  const { turno } = EnJuego();

  return (
    <h2 style={{ color: "white", marginTop: "1%",}}>
      Turno del Jugador: {" "}
      <span style={{ color: turno === "X" ? "#55adff" : "#ff6969" }}>
        {turno}
      </span>
    </h2>
  );
};

export default EstadoJugador;
