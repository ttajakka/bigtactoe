import Board from "./components/Board"
import MainHeader from "./components/MainHeader"



const App = () => {
  return (
    <div className="container">
      <MainHeader />
      <Board />
      <div id="right-col">
        <div className="newgamebuttons" id="newgamebuttons">
          <h3>New game</h3>
          <button id="newgame">Normal</button>
          <button id="newreversegame">Reversed</button>
        </div>
      </div>
    </div>
  )
}

export default App
