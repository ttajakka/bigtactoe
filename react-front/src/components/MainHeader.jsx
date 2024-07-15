import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import PlayOnline from './PlayOnline'
import Study from './Study'
import About from './About'
import LoginForm from './LoginForm'

const MainHeader = () => {
  return (
    <div className="header" id="mainheader">
      <span id="maintitle">BIG TAC TOE</span>
      <Router>
        <div className="menu" id="mainmenu">
          <li><Link id="playonline" to="/">Play online</Link></li>
          <li><Link id="study" to="/study">Study</Link></li>
          <li><Link id="about" to="/about">About</Link></li>
          <li><Link id="login" to="/login">Login</Link></li>
        </div>

        <Routes>
          <Route path="/" element={<PlayOnline />} />
          <Route path="/study" element={<Study />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </div>
  )
}

export default MainHeader