import { useState } from "react";
import { initialState } from "../gamelogic/gamelogic";
import Board from "./Board";
import RightColumn from "./RightColumn";

const PlayOnline = () => {
  const [gamestate, setGamestate] = useState(JSON.parse(initialState))

  return (
    <div>
      <Board gamestate={gamestate} setGamestate={setGamestate} />
      <RightColumn title={"Play online"} buttontext={"Find opponent"} />
    </div>
  )
}

export default PlayOnline