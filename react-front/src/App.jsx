import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import gameService from "./services/gameService"

import PlayOnline from './components/PlayOnline'
import Analyze from './components/Analyze'
import About from './components/About'
import LoginForm from './components/LoginForm'
import UserPage from './components/UserPage'

const App = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBTTuser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      gameService.setUserToken(user.token)
    }
  }, [])

  return (
    <Router>
      <div className="container">
        <div className="header" id="mainheader">
          <span id="maintitle">BIG TAC TOE</span>
          <div className="menu" id="mainmenu">
            <li><Link id="playonline" to="/">Play online</Link></li>
            <li><Link id="analyze" to="/analyze">Analyze</Link></li>
            <li><Link id="about" to="/about">About</Link></li>
            {!user && <li><Link id="login" to="/login">Login</Link></li>}
            {user && <li><Link id="user" to={`/user/${user.username}`}>{user.username}</Link></li>}
          </div>
        </div>

          <Routes>
            <Route path="/" element={<PlayOnline user={user} />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginForm user={user} setUser={setUser} />} />
            <Route path="/user/:username" element={<UserPage user={user} setUser={setUser} />} />
          </Routes>
      </div>
    </Router>
  )
}

export default App
