import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginService from "../services/login"

const LoginForm = ({ user, setUser }) => {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBTTuser', JSON.stringify(user)
      )
      // gameService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      navigate("/")
    } catch (err) {
      console.log("Wrong credentials");
    }
  }

  return (
    <div className="box" id="loginbox">
      <form id="loginform" onSubmit={handleLogin}>
        <div className="container" id="logincontainer">
            <input
              type="text"
              placeholder="Enter Username"
              id="uname"
              name="Username"
              value={username}
              onChange={({ target }) => {setUsername(target.value)}}
            />

            <input
              type="password"
              placeholder="Enter Password"
              id="psw"
              name="Password"
              value={password}
              onChange={({ target }) => {setPassword(target.value)}}
            />

            <button type="submit" id="loginsubmit">Login</button>
          </div>
      </form>
    </div>
  )
}

export default LoginForm