import { Values } from './types';

/**
 * 
 * @param board Array<Array<Values>> representing the game board
 * @param size size of the board (size X size)
 * @returns Winning value if there is a winner, -1 if the game is a draw, 0 otherwise
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

  // check for draw
  const blankSpaces = getBlankSpaces(board);
  return blankSpaces.length <= 0 ? -1 : Values.empty;
};

const togglePlayer = (player: Values) => {
  return player === Values.x ? Values.o : Values.x;
}

/**
 * Score: 1 if the player (X) wins, -1 if the opponent (O, computer) wins, 0 otherwise
 * This gives a heuristic value of the board for the minimax algorithm
 */
const score = (winner: Values): number => {
  if (winner === Values.x) {
    return 1;
  } else if (winner === Values.o) {
    return -1;
  }
  return 0;
};

/**
 * @param board current game board
 * @returns an array of blank spaces on the board
 */
const getBlankSpaces = (board: Array<Array<Values>>) => {
  const blankSpaces = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === Values.empty) {
        blankSpaces.push({ x: i, y: j });
      }
    }
  }
  return blankSpaces;
}

/**
 * Minimax algorithm with alpha beta prunning 
 * @param board - the current state of the game 
 * @param depth the depth of the search tree 
 * @param isMaximizing boolean
 * @param alpha - the maximum value 
 * @param beta - the minimum valule 
 * @returns 
 */
const minimax_alpha_beta = (
  board: Array<Array<Values>>,
  depth: number,
  isMaximizing: boolean,
  alpha: number = -Infinity,
  beta: number = Infinity,
) => {
  const winner = checkWinner(board);
  if (depth <= 0 || winner !== Values.empty) {
    return score(winner);
  }

  let value;
  const blankSpaces = getBlankSpaces(board);
  if (isMaximizing) {
    value = -Infinity;
    for (const child of blankSpaces) {
      const childBoard = board.map(row => [...row]);
      childBoard[child.x][child.y] = Values.x;
      value = Math.max(value, minimax_alpha_beta(childBoard, depth - 1, false, alpha, beta));
      alpha = Math.max(alpha, value);
      if (alpha >= beta) {
        break;
      }
    }
  } else {
    value = Infinity;
    for (const child of blankSpaces) {
      const childBoard = board.map(row => [...row]);
      childBoard[child.x][child.y] = Values.o;
      value = Math.min(value, minimax_alpha_beta(childBoard, depth - 1, true, alpha, beta));
      beta = Math.min(beta, value);
      if (alpha >= beta) {
        break;
      }
    }
  }
  return value;
}

export {
  checkWinner,
  togglePlayer,
  getBlankSpaces, 
  minimax_alpha_beta
};