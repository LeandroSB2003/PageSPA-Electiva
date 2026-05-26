import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import avatar1 from "../../../../assets/avatars/avatar_1.png";
import avatar2 from "../../../../assets/avatars/avatar_2.png";
import avatar3 from "../../../../assets/avatars/avatar_3.png";

import { register } from "../../../../firebase/authProvider";
import { useLoginValidation } from "../../../../hooks/ValidateInput";

const Register = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const avatars = [avatar1, avatar2, avatar3];

  const [selectedAvatar, setSelectedAvatar] = useState(
    avatars[0]
  );

  const navigate = useNavigate();

  const {
    errorMessage,
    hasError,
    validateEmail,
    validatePassword,
    setErrorMessage,
    setHasError,
  } = useLoginValidation();

  const handleChangeUser = (text: string) => {
    setUser(text);
    validateEmail(text);
  };

  const handleChangePassword = (text: string) => {
    setPassword(text);
    validatePassword(text);
  };

  const handleRegister = async () => {
    setHasError(false);
    setErrorMessage("");

    if (!name || !user || !password) {
      setHasError(true);
      setErrorMessage(
        "Todos los campos son obligatorios"
      );
      return;
    }

    const emailValid = validateEmail(user);
    const passwordValid =
      validatePassword(password);

    if (!emailValid || !passwordValid) return;

    try {
      const response = await register(
        name,
        user,
        password,
        selectedAvatar
      );

      console.log("REGISTRO");
      console.log(response);

      navigate("/login");
    } catch (error: any) {
      console.log(error.message);

      setHasError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Registro</h1>

        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={{
              ...styles.input,
              border: hasError
                ? "1px solid #ff4d4d"
                : styles.input.border,
            }}
          />
        </div>

        <div style={styles.inputContainer}>
          <input
            type="email"
            placeholder="Correo"
            value={user}
            onChange={(e) =>
              handleChangeUser(e.target.value)
            }
            style={{
              ...styles.input,
              border: hasError
                ? "1px solid #ff4d4d"
                : styles.input.border,
            }}
          />
        </div>

        <div style={styles.inputContainer}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              handleChangePassword(
                e.target.value
              )
            }
            style={{
              ...styles.input,
              border: hasError
                ? "1px solid #ff4d4d"
                : styles.input.border,
            }}
          />
        </div>

        {errorMessage && (
          <p style={styles.errorText}>
            {errorMessage}
          </p>
        )}

        <span style={styles.loginText}>
          Selecciona tu Avatar
        </span>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
          }}
        >
          {avatars.map((img, index) => (
            <img
              key={index}
              src={img}
              onClick={() =>
                setSelectedAvatar(img)
              }
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                border:
                  selectedAvatar === img
                    ? "2px solid white"
                    : "2px solid transparent",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        <button
          style={styles.button}
          onClick={handleRegister}
        >
          Crear Cuenta
        </button>

        <div style={styles.loginContainer}>
          ¿Ya tienes una cuenta?
          <span
            style={styles.loginText}
            onClick={() =>
              navigate("/login")
            }
          >
            Iniciar sesión
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;

const styles: {
  [key: string]: React.CSSProperties;
} = {
  container: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "380px",
    backgroundColor: "#111111",
    border: "1px solid #222",
    borderRadius: "18px",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    boxShadow:
      "0 0 25px rgba(255,255,255,0.04)",
  },

  title: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  input: {
    width: "100%",
    backgroundColor: "#1a1a1a",
    border: "1px solid #2b2b2b",
    borderRadius: "12px",
    padding: "14px",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    width: "100%",
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "none",
    borderRadius: "12px",
    padding: "14px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },

  errorText: {
    color: "#ff4d4d",
    fontSize: "13px",
    margin: 0,
    textAlign: "center",
  },

  loginContainer: {
    marginTop: "10px",
    textAlign: "center",
    color: "#888",
    fontSize: "14px",
  },

  loginText: {
    color: "#ffffff",
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft: "5px",
    textAlign: "center",
  },
};