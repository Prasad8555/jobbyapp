import {GoLocation} from 'react-icons/go'
import {MdWork} from 'react-icons/md'
import {BsStarFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItem = props => {
  const {similarJobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobData

  return (
    <li className="similar-job-item-container">
      <div className="top-section">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-logo"
        />
        <div className="company-info">
          <h1 className="company-h">{title}</h1>
          <p className="rating">
            <BsStarFill className="rating-icon" />
            {rating}
          </p>
        </div>
      </div>
      <h1 className="similar-jobs-h">Description</h1>
      <p className="similar-jobs-description">{jobDescription}</p>
      <div className="similar-job-location-work-type-container">
        <div className="location-container">
          <GoLocation className="icon" />
          <p className="location">{location}</p>
        </div>
        <div className="work-type-container">
          <MdWork className="icon" />
          <p className="work-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
