import { Values } from './types';

/**
 * 
 * @param board Array<Array<Values>> representing the game board
 * @param size size of the board (size X size)
 * @returns Winning value if there is a winner, empty otherwise
 */
const checkWinner = (board: Array<Array<Values>>, size: number = 3) => {
  // check rows
  for (let i = 0; i < size; i++) {
    if (board[i][0] !== Values.empty
      && board[i].every(val => val === board[i][0])
    ) {
      return board[i][0];
    }
    // check columns
    if (board[0][i] !== Values.empty
      && board.every(row => row[i] === board[0][i])
    ) {
      return board[0][i];
    }
  }
  // check diagonals
  if (board[0][0] !== Values.empty
    && board.every((row, i) => row[i] === board[0][0])
  ) {
    return board[0][0];
  }
  if (board[0][size - 1] !== Values.empty
    && board.every((row, i) => row[size - 1 - i] === board[0][size - 1])
  ) {
    return board[0][size - 1];
  }
  return Values.empty;
};

/**
 * Score: 1 if the player (X) wins, -1 if the opponent (O, computer) wins, 0 otherwise
 */
const score = (winner: Values): number => {
  if (winner === Values.x) {
    return 1;
  } else if (winner === Values.o) {
    return -1;
  }
  return 0;
};

const bestMove = (board: Array<Array<Values>>, player) => {
  // find the first empty cell on the board
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === Values.empty) {
        return { x: i, y: j };
      }
    }
  }

  return { x: 0, y: 0 }
}
export { checkWinner, bestMove };