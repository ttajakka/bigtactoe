const RightColumn = ({ title, buttontext, handleClick }) => {
  return (
    <div id="right-col">
      <div className="newgamebuttons" id="newgamebuttons">
        <h3>{title}</h3>
        <button id="newgame" onClick={handleClick}>{buttontext}</button>
        {/* <button id="newreversegame">Reversed</button> */}
      </div>
    </div>
  )
}

export default RightColumn