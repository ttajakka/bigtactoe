import { useState } from "react";
import Board from "./Board";
import RightColumn from "./RightColumn";
import { initialState } from "../gamelogic/gamelogic";

const Analyze = () => {
  const [gamestate, setGamestate] = useState(JSON.parse(initialState))
  
  const handleClearBoard = () => {
    setGamestate(JSON.parse(initialState))
  }

  return (
    <div>
      <Board gamestate={gamestate} setGamestate={setGamestate} />
      <RightColumn title={"Analysis board"} buttontext={"Clear board"} handleClick={handleClearBoard} />
    </div>
  )
}

export default Analyze