import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsStarFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {MdWork} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import SkillItem from '../SkillItem'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const requestStatusConst = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    requestStatus: 'LOADING',
  }

  componentDidMount = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      requestStatus: 'LOADING',
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      this.onSuccess(data)
    } else {
      this.onFailure()
    }
  }

  renderLifeAtCompany = lifeAtCompany => {
    const updatedLifeAtCompanyData = {
      description: lifeAtCompany.description,
      imageUrl: lifeAtCompany.image_url,
    }
    const {description, imageUrl} = updatedLifeAtCompanyData

    return (
      <>
        <div className="description-container">
          <h1 className="description-h">Life at Company</h1>
          <p className="job-description">{description}</p>
        </div>
        <img
          src={imageUrl}
          alt="life at company"
          className="life-at-company-img"
        />
      </>
    )
  }

  renderLoadingView = () => (
    <div className="job-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobData

    return (
      <>
        <Header />
        <p className="jobDetails-bg-container">
          <p className="jobDetails-job-container-top-section">
            <div className="jobDetails-top-section-logo-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="job-details-company-log"
              />
              <div className="jobDetails-company-name-rating">
                <h1 className="company-name">{title}</h1>
                <p className="rating">
                  <BsStarFill className="rating-icon" /> {rating}
                </p>
              </div>
            </div>
            <p className="jobDetails-location-type-package-container">
              <div className="location-work-type-container">
                <div className="location-container">
                  <GoLocation className="icon" />
                  <p className="location">{location}</p>
                </div>
                <div className="work-type-container">
                  <MdWork className="icon" />
                  <p className="work-type">{employmentType}</p>
                </div>
              </div>
              <p className="jobDetails-package">{packagePerAnnum}</p>
            </p>
          </p>
          <hr className="line" />
          <div className="jobDetails-job-description-container">
            <h1 className="jobDetails-description">Description</h1>
            <a href={companyWebsiteUrl} className="link">
              <div className="link-container">
                <p className="visit-link">Visit</p>
                <FiExternalLink className="visit-icon" />
              </div>
            </a>
          </div>
          <p className="jobDetails-description">{jobDescription}</p>
          <h1 className="jobDetails-skills-h">Skills</h1>
          <div className="skills-container">
            <ul className="jobDetails-skills-container">
              {skills.map(eachSkill => (
                <SkillItem skillData={eachSkill} key={eachSkill.id} />
              ))}
            </ul>
          </div>
          <div className="jobDetails-life-at-company-container">
            {this.renderLifeAtCompany(lifeAtCompany)}
          </div>
        </p>
        <div>
          <h1 className="jobDetails-similar-jobs-container-h">Similar Jobs</h1>
          <ul className="jobDetails-similar-jobs-container">
            {similarJobsData.map(eachSimilarJobData => (
              <SimilarJobItem
                similarJobData={eachSimilarJobData}
                key={eachSimilarJobData.id}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <>
      <Header />
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-img"
        />
        <h1 className="failure-view-h">Oops! Something Went Wrong</h1>
        <p className="failure-view-description">
          We cannot seem to find the page you are looking for
        </p>
        <button
          type="button"
          onClick={this.getJobDetails}
          className="retry-btn"
        >
          Retry
        </button>
      </div>
    </>
  )

  getUpdatedJobDetails = jobDetails => ({
    companyLogoUrl: jobDetails.company_logo_url,
    companyWebsiteUrl: jobDetails.company_website_url,
    employmentType: jobDetails.employment_type,
    jobDescription: jobDetails.job_description,
    lifeAtCompany: jobDetails.life_at_company,
    location: jobDetails.location,
    packagePerAnnum: jobDetails.package_per_annum,
    rating: jobDetails.rating,
    skills: jobDetails.skills,
    title: jobDetails.title,
  })

  getUpdatedSimilarJobDetails = jobDetails => ({
    id: jobDetails.id,
    companyLogoUrl: jobDetails.company_logo_url,
    employmentType: jobDetails.employment_type,
    jobDescription: jobDetails.job_description,
    location: jobDetails.location,
    rating: jobDetails.rating,
    title: jobDetails.title,
  })

  onSuccess = data => {
    console.log(data)
    const updatedJobData = this.getUpdatedJobDetails(data.job_details)
    const updatedSimilarJobsData = data.similar_jobs.map(eachSimilarJob =>
      this.getUpdatedSimilarJobDetails(eachSimilarJob),
    )
    this.setState({
      jobData: updatedJobData,
      similarJobsData: updatedSimilarJobsData,
      requestStatus: 'SUCCESS',
    })
  }

  onFailure = () =>
    this.setState({
      requestStatus: 'FAILURE',
    })

  render() {
    const {requestStatus} = this.state
    switch (requestStatus) {
      case requestStatusConst.loading:
        return this.renderLoadingView()
      case requestStatusConst.success:
        return this.renderSuccessView()
      case requestStatusConst.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default JobDetails
