import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Fondo from "../../../Fondo/Fondo";
import { useGame } from "../../../hooks/useGame";
import "./StartScreen.css";
import { Ranking } from "../../players/components/Ranking";
import { ButtonSignOut } from "../../players/components/ButtonSignOut";

const StartScreen: React.FC = () => {
  const [showRanking, setShowRanking] = useState(false);
  const navigate = useNavigate();
  const { resetGame, playerX, playerO, setPlayerO } = useGame();

  const [inputO, setInputO] = useState("");

  const handleStart = () => {
    resetGame();
    navigate("/game");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
      {/* Ranking + SignOut */}
      <div style={styles.topRight}>
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

      <h1 style={{ color: "white", textAlign: "center" }}>Tres en Raya</h1>

      <div style={styles.playersContainer}>
        {/* Jugador X (logueado) */}
        <div style={styles.loginCard}>
          <h3 style={{ color: "#55adff", margin: "0 0 10px 0" }}>Jugador X (J1)</h3>
          <p style={{ color: "#fff", fontWeight: "bold" }}>🟢 Listo: {playerX}</p>
        </div>

        {/* Jugador O (input persistente en contexto) */}
        <div style={styles.loginCard}>
          <h3 style={{ color: "#ff6969", margin: "0 0 10px 0" }}>Jugador O (J2)</h3>
          {playerO === "Player O" ? (
            <div style={styles.form}>
              <input
                type="text"
                placeholder="Nombre J2"
                value={inputO}
                onChange={(e) => setInputO(e.target.value)}
                style={styles.input}
              />
              <button
                onClick={() => {
                  if (inputO.trim()) setPlayerO(inputO);
                }}
                style={styles.btnEnter}
              >
                Unirse
              </button>
            </div>
          ) : (
            <p style={{ color: "#fff", fontWeight: "bold" }}>🟢 Listo: {playerO}</p>
          )}
        </div>
      </div>

      <button onClick={handleStart} style={{ ...styles.actionButton, backgroundColor: "#3182ce", marginTop: "2%" }}>
        Iniciar Partida
      </button>

      <center>
        <h2 style={{ color: "white", marginTop: "10%" }}>Nicol Leandro Sanchez Bermudez</h2>
      </center>
      <center>
        <h2 style={{ color: "white" }}>Santiago Bedoya Gómez</h2>
      </center>
      <Fondo />
    </div>
  );
};

const styles = {
  topRight: {
    position: "fixed" as const,
    top: "20px",
    right: "20px",
    display: "flex",
    gap: "12px",
    zIndex: 1100,
  },
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
  playersContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    marginBottom: "40px",
  },
  loginCard: {
    backgroundColor: "#111",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #222",
    width: "220px",
  },
  form: { display: "flex", flexDirection: "column" as const, gap: "10px" },
  input: {
    backgroundColor: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "6px",
    padding: "8px",
    color: "#fff",
    outline: "none",
  },
  btnEnter: {
    backgroundColor: "#38a169",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px",
    fontWeight: "bold" as const,
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  actionButton: {
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold" as const,
    cursor: "pointer",
    transition: "transform 0.2s ease, background-color 0.3s ease",
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
};

export default StartScreen;
