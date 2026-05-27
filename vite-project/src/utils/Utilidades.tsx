export type EstadoTablero = (string | null)[];

export const RevisarGanador = (tablero: EstadoTablero): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6], 
  ];

  for (const [a, b, c] of lines) {
    if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
      return tablero[a];
    }
  }

  // Si todas las casillas están llenas retorna empate
  if (tablero.every((cell) => cell !== null)) {
    return "Empate";
  }

  return null;
};
