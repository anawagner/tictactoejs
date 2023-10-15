import styles from './GameBoard.module.css';
import { useState } from 'react';
import { Values } from './utils/types';
import Cell from './Cell';
import { checkWinner } from './utils/gameFunctions';

const GameBoard = () => {
  const [player, setPlayer] = useState<Values>(Values.x); // ['x', 'o']
  const [board, setBoard] = useState<Values[][]>([
    [Values.empty, Values.empty, Values.empty],
    [Values.empty, Values.empty, Values.empty],
    [Values.empty, Values.empty, Values.empty]
  ]);
  const [winner, setWinner] = useState<Values>(Values.empty);

  const handleClick = (x: number, y: number) => {
    const newBoard = [...board];
    newBoard[x][y] = player;
    setBoard(newBoard);
    setPlayer(player === Values.x ? Values.o : Values.x);
    const winner = checkWinner(board);
    if (winner !== Values.empty) {
      setWinner(winner);
    }
  };

  return (
    <>
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

      {winner !== Values.empty && (
        <div className={styles.winner}>
          {winner} won!
        </div>
      )}

    </>
  )
}

export default GameBoard