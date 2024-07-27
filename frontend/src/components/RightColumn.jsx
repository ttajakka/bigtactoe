import InfoBox from "./InfoBox"

const RightColumn = ({ title, buttontext, handleClick, modeinfo, instruction }) => {
  return (
    <div id="right-col">
      <div className="newgamebuttons" id="newgamebuttons">
        <h3>{title}</h3>
        <button id="newgame" onClick={handleClick}>{buttontext}</button>
        {/* <button id="newreversegame">Reversed</button> */}
      </div>
      <InfoBox modeinfo={modeinfo} instruction={instruction} />
    </div>
  )
}

export default RightColumn