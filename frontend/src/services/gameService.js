import axios from 'axios'
// const baseUrl = 'http://localhost:3001'
const baseUrl = '/'

let userToken = null

const setUserToken = newToken => {
  userToken = `Bearer ${newToken}`
}

const getNewGame = async () => {
  console.log("in getNewGame")
  const config = {
    headers: { Authorization: userToken }
  }

  const response = await axios.get(`${baseUrl}/newgame`, config)
  return response.data
}

const getMove = async (gameID) => {
  const config = {
    headers: { Authorization: userToken }
  }

  const response = await axios.get(`${baseUrl}/game/${gameID}`, config)
  return response.data
}

const sendMove = async (gameID, { x, y }) => {
  console.log("in sendMove")
  const data = { move: { x, y } }
  console.log(data)
  const config = {
    headers: { Authorization: userToken }
  }

  const response = await axios.post(`${baseUrl}/game/${gameID}`, data, config)
  return response.data
}

export default { getMove, sendMove, getNewGame, setUserToken }