import styles from './GameBoard.module.css';
import { useState } from 'react';
import { Values } from './utils/types';
import Cell from './Cell';
import { checkWinner, getBlankSpaces, togglePlayer, minimax_alpha_beta } from './utils/gameFunctions';

const GameBoard = () => {
  const [player, setPlayer] = useState<Values>(Values.x); // ['x', 'o']
  const [board, setBoard] = useState<Values[][]>([
    [Values.empty, Values.empty, Values.empty],
    [Values.empty, Values.empty, Values.empty],
    [Values.empty, Values.empty, Values.empty]
  ]);
  const [winner, setWinner] = useState<Values>(Values.empty);

  const resetGame = () => {
    setPlayer(Values.x);
    setBoard([
      [Values.empty, Values.empty, Values.empty],
      [Values.empty, Values.empty, Values.empty],
      [Values.empty, Values.empty, Values.empty]
    ]);
    setWinner(Values.empty);
  }

  const makeMove = (x: number, y: number, player: Values) => {
    const newBoard = [...board];
    newBoard[x][y] = player;
    setBoard(newBoard);

    // end turn if there is a winner, otherwise switch players
    const newWinner = checkWinner(board);
    if (newWinner !== Values.empty) {
      setWinner(newWinner);
    } else {
      setPlayer(togglePlayer(player));
    }
  }

  const opponentMove = () => {
    const blankSpaces = getBlankSpaces(board);
    let bestMove;
    let bestScore = Infinity;
    for (const move of blankSpaces) {
      const childBoard = board.map(row => [...row]);
      childBoard[move.x][move.y] = Values.o;
      const score = minimax_alpha_beta(childBoard, 9, true);

      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    // make the best move
    console.log('best move: ', bestMove);
    if (bestMove) {
      makeMove(bestMove.x, bestMove.y, Values.o);
    } else {
      console.log('no best move found');
    }
  }

  const handleClick = (x: number, y: number) => {
    if (board[x][y] !== Values.empty || winner !== Values.empty) {
      return;
    }
    makeMove(x, y, player);

    // make opponent move
    opponentMove();
  };

  return (
    <div className={styles.container}>
      <div className={styles.gameBoard}>
        {
          board.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <Cell
                value={cell}
                handleClick={() => handleClick(rowIndex, colIndex)}
                key={`${rowIndex}-${colIndex}`}
              />
            ))
          ))
        }
      </div>
      <div className={styles.winner}>
        {winner !== Values.empty && (
          winner === Values.tie ? (
            <p>It's a tie!</p>
          ) : (
            <p>{winner} won!</p>
          )
        )}
      </div>

      <button className={styles.resetButton} onClick={resetGame}>
        Reset Game
      </button>

    </div>
  )
}

export default GameBoard