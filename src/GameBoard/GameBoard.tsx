import styles from './GameBoard.module.css'

const GameBoard = () => {

  const handleClick = () => {
    console.log('click')
  }
  return (
    <div className={styles.gameBoard}>

      <div className={styles.cell} onClick={handleClick}></div>
      <div className={styles.cell} onClick={handleClick}></div>
      <div className={styles.cell} onClick={handleClick}></div>

      <div className={styles.cell} onClick={handleClick}></div>
      <div className={styles.cell} onClick={handleClick}></div>
      <div className={styles.cell} onClick={handleClick}></div>

      <div className={styles.cell} onClick={handleClick}></div>
      <div className={styles.cell} onClick={handleClick}></div>
      <div className={styles.cell} onClick={handleClick}></div>

    </div>
  )
}

export default GameBoard