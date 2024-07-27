const InfoBox = ({ instruction, modeinfo}) => {
  if (!instruction && !modeinfo)
    return null

  return (
    <div id="information">
      <h3 id="instruction">{instruction}</h3>
      <div id="modeinfo">{modeinfo}</div>
    </div>
  )
}

export default InfoBox