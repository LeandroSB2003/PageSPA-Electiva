import React from "react";
import { EnJuego } from "../../../hooks/EnJuego";
import Cuadrado from "./Cuadro";

export const Tablero: React.FC = () => {
  const { tablero, JugarTurno } = EnJuego();

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
      {tablero.map((value, index) => (
        <Cuadrado key={index} value={value} onClick={() => JugarTurno(index)} />
      ))}
    </div>
  );
};

export default Tablero;
