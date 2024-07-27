import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initialState } from "../gamelogic/gamelogic";
import gameService from "../services/gameService";

import { toPlay, updateState, ended, draw, victory } from "../gamelogic/gamelogic";

import Board from "./Board";
import RightColumn from "./RightColumn";

const PlayOnline = ({ user }) => {
  const inState = { ...JSON.parse(initialState), online: true }
  const [gamestate, setGamestate] = useState(inState)
  const [infotext, setInfotext] = useState(null)

  const navigate = useNavigate()
  const handleLoginClick = () => {
    navigate("/login")
  }

  const handleFindOpp = async () => {
    setInfotext("Waitin for opponent...")
    const game = await gameService.getNewGame()
    console.log("game received: " + game.gameID + " " + game.side)
    setGamestate({ ...gamestate, gameID: game.gameID, side: game.side })
    setInfotext(game.side == "X" ? "Your turn" : "Opponent's turn")
  }

  useEffect(() => {
    console.log("in useEffect, side: " + gamestate.side)

    const nextMove = async () => {
      if (!gamestate.side) {
        return null
      } else if (ended(gamestate)) {
        const moveToSend = gamestate.moves[gamestate.moves.length - 1]
        await gameService.sendMove(gamestate.gameID, { ...moveToSend })
        gameService.getMove(gamestate.gameID)
        if (draw(gamestate)) {
          setInfotext("Draw. :|")
        } else if (victory(gamestate) == gamestate.side) {
          setInfotext("You win! :)")
        } else {
          setInfotext("Opponent wins. :(")
        }
      } else if (gamestate.moves.length == 0 && gamestate.side == "O") {
        setInfotext("Opponent's turn")
        console.log("side O, making first getMove req")
        const oppMove = await gameService.getMove(gamestate.gameID)
        setGamestate(updateState(gamestate, { ...oppMove }))
        setInfotext("Your turn")
      } else if (toPlay(gamestate) != gamestate.side) {
        setInfotext("Opponent's turn")
        const moveToSend = gamestate.moves[gamestate.moves.length - 1]
        const sentMove = await gameService.sendMove(gamestate.gameID, { ...moveToSend })
        console.log("sent move: " + sentMove.move.x + " " + sentMove.move.y)
        const oppMove = await gameService.getMove(gamestate.gameID)
        setGamestate(updateState(gamestate, { ...oppMove }))
        setInfotext("Your turn")
      }
    }

    nextMove()

  }, [gamestate])

  return (
    <div>
      <Board gamestate={gamestate} setGamestate={setGamestate} />
      {user
        ? <RightColumn title={"Play online"} buttontext={"Find opponent"} handleClick={handleFindOpp} instruction={infotext} />
        : <RightColumn title={"Play online"} buttontext={"Login to play"} handleClick={handleLoginClick} />
      }
    </div>
  )
}

export default PlayOnline