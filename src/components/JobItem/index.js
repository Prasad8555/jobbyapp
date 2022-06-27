import {Link} from 'react-router-dom'
import {BsStarFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {MdWork} from 'react-icons/md'

import './index.css'

const JobItem = props => {
  const {eachJobData} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJobData

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="job-item-container">
        <div className="app-info-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="company-name-rating-container">
            <h1 className="company-name">{title}</h1>
            <p>
              <BsStarFill className="rating-icon" /> {rating}
            </p>
          </div>
        </div>
        <div className="location-type-package-container">
          <div className="location-type-container">
            <p className="location">
              <GoLocation /> {location}
            </p>
            <p className="employ-type">
              <MdWork /> {employmentType}
            </p>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="bottom-section">
          <h1 className="description-h">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
