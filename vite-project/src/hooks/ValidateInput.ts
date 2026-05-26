import { useState } from "react";

export const useLoginValidation = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  const validateEmail = (email: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValid) {
      setErrorMessage("Formato de correo inválido");
      setHasError(true);
      return false;
    }

    setErrorMessage("");
    setHasError(false);
    return true;
  };

  const validatePassword = (password: string) => {
    const isValid = password.length >= 6;

    if (!isValid) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres");
      setHasError(true);
      return false;
    }

    setErrorMessage("");
    setHasError(false);
    return true;
  };

  return {
    errorMessage,
    hasError,
    validateEmail,
    validatePassword,
    setErrorMessage,
    setHasError,
  };
};