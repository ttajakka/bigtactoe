import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialState } from "../gamelogic/gamelogic";
import Board from "./Board";
import RightColumn from "./RightColumn";

const PlayOnline = ({ user }) => {
  const [gamestate, setGamestate] = useState(JSON.parse(initialState))

  const navigate = useNavigate()
  const handleLoginClick = () => {
    navigate("/login")
  }

  const handleFindOpp = () => {
    console.log("find opp")
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