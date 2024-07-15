import Board from "./Board";
import RightColumn from "./RightColumn";

const Study = () => {
  return (
    <div>
      <Board />
      <RightColumn title={"Practice board"} buttontext={"Clear board"} />
    </div>
  )
}

export default Study