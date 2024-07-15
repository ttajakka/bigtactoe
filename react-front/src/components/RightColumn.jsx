const RightColumn = ({ title, buttontext }) => {
  return (
    <div id="right-col">
      <div className="newgamebuttons" id="newgamebuttons">
        <h3>{title}</h3>
        <button id="newgame">{buttontext}</button>
        {/* <button id="newreversegame">Reversed</button> */}
      </div>
    </div>
  )
}

export default RightColumn