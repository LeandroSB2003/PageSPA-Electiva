import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EnJuego } from "../../../hooks/EnJuego";
import Tablero from "../../board/components/Tablero";
import EstadoJugador from "../../players/components/EstadoJugador";
import Fondo from "../../../Fondo/FondoJuego";
import "./PantallaJuego.css";
import { ButtonSignOut } from "../../players/components/ButtonSignOut";

const GameView: React.FC = () => {
  const { ganador, dibujando } = EnJuego();
  const navegar = useNavigate();

  useEffect(() => {
    if (ganador || dibujando) {
      navegar("/resultado");
    }
  }, [ganador, dibujando, navegar]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "10%",
        boxShadow: "10px 0px 40px rgb(56, 56, 56)",
      }}
    >
      <div style={{
  position: "fixed",
  top: "20px",
  right: "20px",
  display: "flex",
  gap: "12px",
  zIndex: 1100
}}>
  <ButtonSignOut />
</div>
      <EstadoJugador />
      <Tablero />
      <Fondo />;
    </div>
  );
};

export default GameView;
