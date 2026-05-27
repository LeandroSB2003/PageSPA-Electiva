import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EnJuego } from "../../../hooks/EnJuego";
import Fondo from "../../../Fondo/FondoFinal";
import "./PantallaResultado.css";
import { auth, db } from "../../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, increment, updateDoc } from "firebase/firestore";

const PantallaResultado: React.FC = () => {
  const { ganador, dibujando, reiniciar, jugadorX, jugadorO } = EnJuego();
  const navegar = useNavigate();

  const ManejarDeNuevo = () => {
    reiniciar();
    navegar("/juego");
  };

  const nombreGanador = ganador === "X" ? jugadorX : jugadorO;

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const username = user.email ?? "desconocido";
        const nombre = user.displayName ?? "Jugador";

        try {
          await addDoc(collection(db, "Round"), {
            DateTime: new Date().toISOString(),
            Result: dibujando ? "Empate" : "Winner",
            WinnerID: dibujando ? null : username,
            WinnerName: dibujando ? null : nombreGanador,
          });

          if (!dibujando && ganador) {
            const userRef = doc(db, "scoringHistory", username);
            await updateDoc(userRef, {
              Wins: increment(1),
            });
            }
        } catch (error) {
          console.error("Error guardando la partida: ", error);
        }
      }
    });

    return () => unsubscribe();
  }, [ganador, dibujando, nombreGanador]);

  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
      <h1 style={{ color: "white", padding: "10px 20px" }}>Fin de la Partida</h1>
      
      {ganador && (
        <>
          <h2 style={{ color: "#38a169", padding: "10px 20px" }}>
            Ganó el jugador:
          </h2>
          <h1 style={{ color: "#f6ff41" }}>{nombreGanador}</h1>
        </>
      )} 
      
      {dibujando && <h2 style={{ color: "#dd6b20" }}>Empate</h2>}

      <div style={{ marginTop: "200px", marginLeft: "-1000px" }}>
        <button
          className="bn3"
          onClick={ManejarDeNuevo}
          style={{ padding: "10px 20px", marginRight: "35px" }}
        >
          Jugar Otra Vez
        </button>
        <button className="bn3" onClick={() => navegar("/inicio")} style={{ padding: "10px 20px" }}>
          Volver al Inicio
        </button>
      </div>
      <Fondo />
    </div>
  );
};

export default PantallaResultado;
