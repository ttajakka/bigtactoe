import { getActiveSquares, isLegal, squareWon, updateState } from '../gamelogic/gamelogic'

const BoardNode = ({ row, col, gamestate, statesetter }) => {
  const clickHandler = () => {
    const move = { x: row, y: col }
    if (!isLegal(gamestate, move)) {
      return null;
    }

    statesetter(updateState(gamestate, { x: row, y: col }))
  }

  const hor = col % 3 === 0 ? " td-left" : col % 3 === 1 ? "" : " td-right"
  const vert = row % 3 === 0 ? " td-top" : row % 3 === 1 ? "" : " td-bottom"

  let tdcls = "td" + hor + vert

  const nodevalue = gamestate.bigstate[row][col]
  const symbol = nodevalue == 0 ? "" : nodevalue == 1 ? "X" : "O"

  let tddivcls = "tddiv"
  tddivcls += nodevalue == 0 ? "" : nodevalue == 1 ? " cross" : " naught"

  let tdbgcls = "tdbg"

  if (gamestate.moves.length > 0) {
    const lastmove = gamestate.moves[gamestate.moves.length - 1]
    if (lastmove.x == row && lastmove.y == col)
      tdbgcls += " last"
  }

  return (
    <td id={`td${row}${col}`} className={tdcls} onClick={clickHandler}>
      <div className={tddivcls} id={`tddiv${row}${col}`}>{symbol}</div>
      <div className={tdbgcls} id={`tdbg${row}${col}`}></div>
    </td>
  )
}

const SmallRow = ({ row, firstcol, gamestate, statesetter }) => {
  let vert = null;
  if (row % 3 === 0)
    vert = "top";
  if (row % 3 === 2)
    vert = "bottom";

  return (
    <tr>
      {[0, 1, 2].map(i => <BoardNode key={i} row={row} col={firstcol + i} vert={vert} gamestate={gamestate} statesetter={statesetter} />)}
    </tr>
  )
}

const SmallSquare = ({ row, col, gamestate, statesetter }) => {
  let tdcls = "maintd"
  if (getActiveSquares(gamestate)[row][col]) {
    tdcls += " active"
  }

  let bgcls = "bg"
  const sqwon = squareWon(gamestate, { xsmall: row, ysmall: col })
  if (sqwon) {
    bgcls += sqwon == 1 ? " cross" : " naught"
  }

  return (
    <td id={`maintd${row}${col}`} className={tdcls}>
      <div className={bgcls} id={`bg${row}${col}`} />
      <div className="square">
        <table className="table">
          <tbody>
            {[0, 1, 2].map(i => <SmallRow key={i} row={3 * row + i} firstcol={3 * col} gamestate={gamestate} statesetter={statesetter} />)}
          </tbody>
        </table>
      </div>
      <div className="tdborder" />
    </td>
  )
}

const BigRow = ({ row, gamestate, statesetter }) => (
  <tr>
    {[0, 1, 2].map(i => <SmallSquare key={i} row={row} col={i} gamestate={gamestate} statesetter={statesetter} />)}
  </tr>
)

const OverlayNode = ({ row, col, gamestate }) => {
  const won = squareWon(gamestate, { xsmall: row, ysmall: col })
  const symbol = !won ? "" : (won == 1 ? "X" : "O")

  let cls = "oltd"
  cls += !won ? "" : (won == 1 ? " cross" : " naught")
  return (<td className={cls} id={`oltd${row}${col}`}>{symbol}</td>)
}

const OverlayRow = ({ row, gamestate }) => {
  return (
    <tr>
      {[0, 1, 2].map(i => <OverlayNode row={row} col={i} gamestate={gamestate} key={i} />)}
    </tr>
  )
}

const OverlayTable = ({ gamestate }) => {
  return (
    <table className="overlaytable">
      <tbody>
        {[0, 1, 2].map(i => <OverlayRow row={i} gamestate={gamestate} key={i} />)}
      </tbody>
    </table>
  )
}

const Board = ({gamestate, setGamestate}) => {

  return (
    <div id="box" className="box">
      <table id="maintable">
        <tbody>
          {[0, 1, 2].map(i => <BigRow row={i} gamestate={gamestate} statesetter={setGamestate} key={i} />)}
        </tbody>
      </table>
      <OverlayTable gamestate={gamestate} />
    </div>
  )
}

export default Board