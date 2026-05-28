import React, { useEffect, useState } from "react";
import { EnJuego } from "../../../hooks/EnJuego";
import Fondo from "../../../Fondo/FondoFinal";
import "./PantallaResultado.css";
import { auth, db } from "../../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, collection, doc, increment, updateDoc } from "firebase/firestore";
import { Ranking } from "../../players/components/Ranking";
import { ButtonSignOut } from "../../players/components/ButtonSignOut";
import { useNavigate } from "react-router-dom";

const PantallaResultado: React.FC = () => {
  const [showRanking, setShowRanking] = useState(false);
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
      <div style={{
  position: "fixed",
  top: "20px",
  right: "20px",
  display: "flex",
  gap: "12px",
  zIndex: 1100
}}>
  <button 
    onClick={() => setShowRanking(!showRanking)} 
    style={{ 
      background: "transparent", 
      border: "none", 
      cursor: "pointer", 
      fontSize: "28px", 
      color: "white" 
    }}
  >
    🏆
  </button>
  <ButtonSignOut />
</div>
      {showRanking && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#111",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0,0,0,0.5)",
          zIndex: 1000,
          color: "white"
        }}>
          <Ranking />
          <button
            onClick={() => setShowRanking(false)}
            style={{ marginTop: "10px", padding: "8px 16px" }}
          >
            Cerrar
          </button>
        </div>
      )}

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
