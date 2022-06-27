import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutUser = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header">
      <div className="website-logo-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-website-logo"
          />
        </Link>
      </div>
      <ul className="nav-items-container">
        <div className="home-jobs-container">
          <Link to="/" className="link">
            <li className="nav-item">Home</li>
          </Link>
          <Link to="/jobs" className="link">
            <li className="nav-item">Jobs</li>
          </Link>
        </div>
        <li className="logout-btn-container">
          <button type="button" className="logout-btn" onClick={logoutUser}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
