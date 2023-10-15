import { Values } from './types';

const checkWinner = (board: Array<Array<Values>>) => {
  // check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== Values.empty
      && (board[i][0] === board[i][1] && board[i][1] === board[i][2])
    ) {
      return board[i][0];
    }
    // check columns
    if (board[0][i] !== Values.empty
      && (board[0][i] === board[1][i] && board[1][i] === board[2][i])
    ) {
      return board[0][i];
    }
    // check diagonals
    if (board[0][0] !== Values.empty
      && (board[0][0] === board[1][1] && board[1][1] === board[2][2])
    ) {
      return board[0][0];
    }
    if (board[0][2] !== Values.empty
      && (board[0][2] === board[1][1] && board[1][1] === board[2][0])
    ) {
      return board[0][2];
    }
  }
  return Values.empty;
};

export { checkWinner }