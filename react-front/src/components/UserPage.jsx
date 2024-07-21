import { useNavigate } from "react-router-dom"

const UserPage = ({ user, setUser }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.setItem(
      'loggedBTTuser', null
    )
    setUser(null)
    navigate("/login")
  }

  return (
    <div>
      <div className="box">
        <div>
          Stats, paginated list of played games etc.
        </div>
      </div>
      <div className="right-col" >
        <button id="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default UserPage
