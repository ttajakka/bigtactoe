import { useState } from 'react'
import loginService from "../services/login"

const LoginContainer = ({ user, handleLogin }) => {
  if (user)
    return (
      <form id="loginform">
        <button type="submit" id="loginsubmit">Logout</button>
      </form>
    )
  else
    return (
      <form id="loginform" onSubmit={handleLogin}>
        <div className="container" id="logincontainer">
          <input
            type="text"
            placeholder="Enter Username"
            id="uname"
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            id="psw"
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />

          <button type="submit" id="loginsubmit">Login</button>
        </div>
      </form>
    )
}

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging with', username, password);

    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (err) {
      console.log("Wrong credentials");
    }
  }

  return (
    <div className="box" id="loginbox">
      <form id="loginform" onSubmit={handleLogin}>
        {user
          ? <div className="container" id="logincontainer">
            <input type="text"/>
            <button type="submit" id="loginsubmit">Logout</button>
          </div>
          : <div className="container" id="logincontainer">
            <input
              type="text"
              placeholder="Enter Username"
              id="uname"
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password"
              id="psw"
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />

            <button type="submit" id="loginsubmit">Login</button>
          </div>}
      </form>
    </div>
  )
}

export default LoginForm