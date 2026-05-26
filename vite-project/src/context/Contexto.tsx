import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config"
import { RevisarGanador } from "../utils/Utilidades";
import type { EstadoTablero } from "../utils/Utilidades";

interface ContextoDeJuego {
  tablero: EstadoTablero;
  turno: "X" | "O";
  ganador: string | null;
  dibujando: boolean;
  jugadorX: string;
  jugadorO: string;
  nombreTurnoActual: string;
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
  
  const [jugadorX, setJugadorX] = useState<string>("Jugador X");
  const [jugadorO, setJugadorO] = useState<string>("Jugador O");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Usuario de Firebase detectado:", user);

      if (user) {
        const nombreMostrar = user.displayName || user.email?.split('@')[0] || "Jugador X";
        setJugadorX(nombreMostrar);
      } else {
        setJugadorX("Jugador X");
      }
    });

    return () => unsubscribe();
  }, []);

  const ganador = RevisarGanador(tablero);
  const dibujando = !ganador && tablero.every((cell) => cell !== null);
  
  const nombreTurnoActual = turno === "X" ? jugadorX : jugadorO;

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
      value={{ 
        tablero, 
        turno, 
        ganador, 
        dibujando, 
        jugadorX,
        jugadorO,
        nombreTurnoActual,
        JugarTurno, 
        reiniciar 
      }}
    >
      {children}
    </ContextoJuego.Provider>
  );
};