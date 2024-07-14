import { updateState } from "./gamelogic"

export const makeClickHandler = (gamestate, move) => () => {
  return updateState(gamestate, move)
}
