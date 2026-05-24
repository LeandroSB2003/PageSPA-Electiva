import React from "react";

interface CuadradoA {
  value: string | null;
  onClick: () => void;
}

export const Cuadro: React.FC<CuadradoA> = ({ value, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: "2rem",
        fontWeight: "bold",
        backgroundColor: "#070707",
        border: "2px solid #00172f",
        borderRadius: "8px",
        cursor: value ? "not-allowed" : "pointer",
        color: value === "X" ? "#55adff" : "#ff6969",
      }}
    >
      {value}
    </button>
  );
};

export default Cuadro;
