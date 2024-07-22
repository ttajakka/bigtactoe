import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialState } from "../gamelogic/gamelogic";
import gameService from "../services/game";

import Board from "./Board";
import RightColumn from "./RightColumn";

const PlayOnline = ({ user }) => {
  const [gamestate, setGamestate] = useState(JSON.parse(initialState))

  const navigate = useNavigate()
  const handleLoginClick = () => {
    navigate("/login")
  }

  const handleFindOpp = async () => {
    const game = await gameService.getNewGame()
    console.log(game)
    if (game.side == "O") {
      console.log(await gameService.getMove(game.gameID))
    }
  }

  return (
    <div>
      <Board gamestate={gamestate} setGamestate={setGamestate} />
      {user
        ? <RightColumn title={"Play online"} buttontext={"Find opponent"} handleClick={handleFindOpp} />
        : <RightColumn title={"Play online"} buttontext={"Login to play"} handleClick={handleLoginClick} />
      }
    </div>
  )
}

export default PlayOnline