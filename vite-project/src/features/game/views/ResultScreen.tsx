import React, { useEffect, useState } from "react";
import { useGame } from "../../../hooks/useGame";
import Fondo from "../../../Fondo/FondoFinal";
import "./ResultScreen.css";
import { auth, db } from "../../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, increment, updateDoc } from "firebase/firestore";
import { Ranking } from "../../players/components/Ranking";
import { ButtonSignOut } from "../../players/components/ButtonSignOut";
import { useNavigate } from "react-router-dom";

const ResultScreen: React.FC = () => {
  const [showRanking, setShowRanking] = useState(false);
  const { winner, isDraw, resetGame, playerX, playerO } = useGame();
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    resetGame();
    navigate("/game");
  };

  // Nombre del ganador desde el contexto
  const winnerName = winner === "X" ? playerX : playerO;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const username = user.email ?? "desconocido";

        try {
          await addDoc(collection(db, "Round"), {
            DateTime: new Date().toISOString(),
            Result: isDraw ? "Empate" : "Winner",
            WinnerID: isDraw ? null : username,
            WinnerName: isDraw ? null : winnerName,
          });

          if (!isDraw && winner) {
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
  }, [winner, isDraw, winnerName]);

  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
      {/* Ranking + SignOut */}
      <div style={{ position: "fixed", top: "20px", right: "20px", display: "flex", gap: "12px", zIndex: 1100 }}>
        <button onClick={() => setShowRanking(!showRanking)} style={styles.iconButton}>
          🏆
        </button>
        <ButtonSignOut />
      </div>

      {showRanking && (
        <div style={styles.modal}>
          <Ranking />
          <button onClick={() => setShowRanking(false)} style={styles.closeButton}>
            Cerrar
          </button>
        </div>
      )}

      <h1 style={{ color: "white", padding: "10px 20px" }}>Fin de la Partida</h1>

      {/* Mostrar ganador con nombre desde contexto */}
      {winner && (
        <h2 style={{ color: "#38a169", padding: "10px 20px" }}>
          Ganó el jugador: <span style={{ color: "#f6ff41" }}>{winnerName}</span>
        </h2>
      )}

      {isDraw && <h2 style={{ color: "#dd6b20" }}>Empate</h2>}

      <div style={{ marginTop: "200px" }}>
        <button onClick={handlePlayAgain} style={{ ...styles.actionButton, backgroundColor: "#38a169" }}>
          Jugar Otra Vez
        </button>
        <button onClick={() => navigate("/inicio")} style={{ ...styles.actionButton, backgroundColor: "#3182ce" }}>
          Volver al Inicio
        </button>
      </div>
      <Fondo />
    </div>
  );
};

export default ResultScreen;

const styles = {
  iconButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "28px",
    color: "white",
    transition: "transform 0.2s ease",
  },
  modal: {
    position: "fixed" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#111",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0,0,0,0.5)",
    zIndex: 1000,
    color: "white",
  },
  closeButton: {
    marginTop: "10px",
    padding: "8px 16px",
    backgroundColor: "#ff4d4d",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold" as const,
    transition: "background-color 0.3s ease",
  },
  actionButton: {
    padding: "12px 24px",
    margin: "0 15px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold" as const,
    cursor: "pointer",
    transition: "transform 0.2s ease, background-color 0.3s ease",
  },
};
