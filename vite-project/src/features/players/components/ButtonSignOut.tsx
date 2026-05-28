import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";


export const ButtonSignOut: React.FC = () => {
    const navegar = useNavigate();
    
    return (
    <button 
    onClick={async () => {
      try {
        signOut(auth)
        navegar("/");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    }}
    style={{ 
      background: "#ff4d4d", 
      border: "none", 
      borderRadius: "8px", 
      padding: "6px 12px", 
      color: "white", 
      cursor: "pointer", 
      fontWeight: "bold" 
    }}
  >
    Cerrar Sesion
  </button>

)

}
