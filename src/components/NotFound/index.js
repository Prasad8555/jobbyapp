import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="failure-img"
    />
    <h1 className="not-found-h">Page Not Found</h1>
    <p className="not-found-description">
      we&apos;re sorry, the page you requested could not be found
    </p>
  </>
)

export default NotFound
