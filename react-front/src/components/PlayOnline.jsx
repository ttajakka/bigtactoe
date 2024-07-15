import Board from "./Board";
import RightColumn from "./RightColumn";

const PlayOnline = () => {
  return (
    <div>
      <Board />
      <RightColumn title={"Play online"} buttontext={"Find opponent"} />
    </div>
  )
}

export default PlayOnline