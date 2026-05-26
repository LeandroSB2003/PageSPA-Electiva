import React from "react";
import { EnJuego } from "../../../hooks/EnJuego";

export const EstadoJugador: React.FC = () => {
  const { turno, nombreTurnoActual } = EnJuego();

  return (
    <h2 style={{ color: "white", marginTop: "1%" }}>
      Turno de:{" "}
      <span style={{ color: turno === "X" ? "#55adff" : "#ff6969" }}>
        {nombreTurnoActual}
      </span>
    </h2>
  );
};

export default EstadoJugador;