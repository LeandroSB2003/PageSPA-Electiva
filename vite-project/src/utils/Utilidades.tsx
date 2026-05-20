export type BoardState = (string | null)[];

export const checkWinner = (board: BoardState): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Horizontales [cite: 95]
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Verticales [cite: 95]
    [0, 4, 8],
    [2, 4, 6], // Diagonales [cite: 95]
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};
