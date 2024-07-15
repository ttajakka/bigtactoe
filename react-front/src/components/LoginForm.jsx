import { useState } from 'react'

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging with', username, password);
    
  }

  return (
    <div className="box" id="loginbox">
        <form id="loginform" onSubmit={handleLogin}>
          <div className="container" id="logincontainer">
            {/* <label for="uname"><b>Username</b></label> */}
            <input
              type="text"
              placeholder="Enter Username"
              id="uname"
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />

            {/* <label for="psw"><b>Password</b></label> */}
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
      </div>
  )
}

export default LoginForm