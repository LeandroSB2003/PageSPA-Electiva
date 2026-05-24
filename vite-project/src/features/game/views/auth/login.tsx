import React from "react";
import { useState } from "react";
import { signin } from "../../../../firebase/authProvider";
import WelcomView from "../PantallaInicio";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const LoginView: React.FC = () => {

  const diccionarioErrores = {
    "Firebase: Error (auth/email-already-in-use).": "Este correo electrónico ya está registrado.",
    "Firebase: Error (auth/weak-password).": "La contraseña debe tener al menos 6 caracteres.",
    "Firebase: Error (auth/invalid-email).": "El formato del correo electrónico no es válido.",
    "Firebase: Error (auth/user-not-found).": "No existe ninguna cuenta con este correo.",
    "Firebase: Error (auth/wrong-password).": "La contraseña es incorrecta.",
    "Firebase: Error (auth/invalid-credential).": "El correo o contraseña es incorrecta."
  };

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navegacion = useNavigate();

  const handleChangeUser = (text: string) => {
    setUser(text);
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    setErrorMessage(isValid ? "" : "Formato de correo inválido");
    setError(isValid ? 'false' : 'true');
  };

  const handleChangePassword = (text: string) => {
    setPassword(text);
    const isValid = text.length >= 6;
    setErrorMessage(isValid ? "" : 'Formato de contraseña invalido');
    setError(isValid ? 'false' : 'true');
  };

  const handleLogin = async () => {
    try {
      const response = await signin(user, password);
      if (response.ok) {
        console.log("LOGUEADO");
        console.log(response.photoURL);
        navegacion("/");
      } else {
        const res = response.errorMessage;
        setError('true')
        setErrorMessage(diccionarioErrores[res as keyof typeof diccionarioErrores] || "Algo no parece estar funcionando bien.");
      }
    } catch (error: any) {
      console.log("ERROR");
      console.log(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login</h1>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={user}
          onChange={(e) => handleChangeUser(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => handleChangePassword(e.target.value)}
          style={styles.input}
        />

        {errorMessage && (
          <p style={styles.error}>{errorMessage}</p>
        )}

        <button style={styles.button} onClick={handleLogin}>
          Iniciar sesión
        </button>

        <p style={styles.registerText}>
          ¿No estas registrado?{" "}
          <span style={styles.registerLink} onClick={() => navegacion("/register")}>
            Haz Click
          </span>
        </p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#0a0a0a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "350px",
    backgroundColor: "#111111",
    padding: "40px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    boxShadow: "0 0 20px rgba(255,255,255,0.05)",
    border: "1px solid #222",
  },

  title: {
    color: "#ffffff",
    textAlign: "center",
    marginBottom: "10px",
  },

  input: {
    backgroundColor: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "10px",
    padding: "14px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.2s",
  },

  error: {
    color: "#b0b0b0",
    fontSize: "13px",
    margin: 0,
  },

  registerText: {
    color: "#888",
    textAlign: "center",
    fontSize: "14px",
  },

  registerLink: {
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default LoginView;