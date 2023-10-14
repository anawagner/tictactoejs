import GameBoard from "./GameBoard/GameBoard";
import Header from "./Header";
import './App.css'

function App() {

  return (
    <>
      <Header />
      <main>
        <div className="container">

          <GameBoard />
        </div>
      </main>
    </>
  )
}

export default App
