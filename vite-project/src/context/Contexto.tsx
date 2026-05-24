import React, { createContext, useState } from "react";
import type { ReactNode } from "react";
import { RevisarGanador } from "../utils/Utilidades";
import type { EstadoTablero } from "../utils/Utilidades";

interface ContextoDeJuego {
  tablero: EstadoTablero;
  turno: "X" | "O";
  ganador: string | null;
  dibujando: boolean;
  JugarTurno: (index: number) => void;
  reiniciar: () => void;
}

export const ContextoJuego = createContext<ContextoDeJuego | undefined>(
  undefined
);

export const Proveedor: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tablero, setTablero] = useState<EstadoTablero>(Array(9).fill(null));
  const [turno, setTurno] = useState<"X" | "O">("X");

  const ganador = RevisarGanador(tablero);
  const dibujando = !ganador && tablero.every((cell) => cell !== null);

  const JugarTurno = (index: number) => {
    if (tablero[index] || ganador) return;

    const TableroNuevo = [...tablero];
    TableroNuevo[index] = turno;
    setTablero(TableroNuevo);

    if (!RevisarGanador(TableroNuevo)) {
      setTurno(turno === "X" ? "O" : "X");
    }
  };

  const reiniciar = () => {
    setTablero(Array(9).fill(null));
    setTurno("X");
  };

  return (
    <ContextoJuego.Provider
      value={{ tablero, turno, ganador, dibujando, JugarTurno, reiniciar }}
    >
      {children}
    </ContextoJuego.Provider>
  );
};
