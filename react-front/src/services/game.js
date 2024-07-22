import axios from 'axios'
const baseUrl = 'http://localhost:3001'

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
  console.log("in getMove, gameID: ", gameID)
  const config = {
    headers: { Authorization: userToken }
  }

  const response = await axios.get(`${baseUrl}/game/${gameID}`, config)
  return response.data
} 

export default { getMove, getNewGame, setUserToken }