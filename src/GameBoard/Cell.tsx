import styles from './GameBoard.module.css';
import { CellProps } from './utils/types';

const Cell = ({ value, handleClick }: CellProps) => {
  const contentStyle = value ? value === 'x' ? styles.x : styles.o : '';
  return (
    <div
      className={`${styles.cell} ${contentStyle}`}
      onClick={handleClick}
    ></div>
  );
};

export default Cell;
