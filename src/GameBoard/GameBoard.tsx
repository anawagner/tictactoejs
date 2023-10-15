import styles from './GameBoard.module.css';
import { useState, useEffect } from 'react';
import { Values } from './utils/types';
import Cell from './Cell';
import { checkWinner, bestMove } from './utils/gameFunctions';

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

  useEffect(() => {
    const opponentMove = () => {
      const newBoard = [...board];
      const move = bestMove(newBoard, player);
      newBoard[move.x][move.y] = player;
      setBoard(newBoard);
      const winner = checkWinner(board);
      if (winner !== Values.empty) {
        setWinner(winner);
      } else {
        setPlayer(Values.x);
      }
    }

    if (player === Values.o) {
      opponentMove();
    }
  }, [board, player]);

  const handleClick = (x: number, y: number) => {
    if (board[x][y] !== Values.empty || winner !== Values.empty) {
      return;
    }
    const newBoard = [...board];
    newBoard[x][y] = player;
    setBoard(newBoard);
    const newWinner = checkWinner(board);
    if (newWinner !== Values.empty) {
      setWinner(newWinner);
    } else {
      setPlayer(Values.o);
    }
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
          <p>{winner} won!</p>
        )}
      </div>

      <button className={styles.resetButton} onClick={resetGame}>
        Reset Game
      </button>

    </div>
  )
}

export default GameBoard