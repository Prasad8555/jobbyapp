import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class HomePage extends Component {
  render() {
    return (
      <div className="jobby-app-home-bg-container">
        <Header />
        <div className="jobby-app-home-container">
          <h1 className="home-heading">
            Find The Job That
            <br />
            Fits Your Life
          </h1>
          <p className="description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="find-jobs-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default HomePage
