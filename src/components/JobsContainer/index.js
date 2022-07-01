import {Component} from 'react'
import Loader from 'react-loader-spinner'
import JobItem from '../JobItem'
import './index.css'

const RequestStatusConst = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobsContainer extends Component {
  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader
        type="ThreeDots"
        className="loader"
        color="#4f46e4"
        height={50}
        width={50}
      />
    </div>
  )

  renderSuccessView = jobsData => (
    <>
      {jobsData.length === 0 ? (
        <div className="no-results-found-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-img"
          />
          <h1 className="no-jobs-h">No Jobs Found</h1>
          <p className="no-jobs-description">
            We could not find any jobs. Try other filters
          </p>
        </div>
      ) : (
        <ul className="job-itemsList">
          {jobsData.map(eachJobData => (
            <JobItem eachJobData={eachJobData} key={eachJobData.id} />
          ))}
        </ul>
      )}
    </>
  )

  renderFailureView = () => {
    const {getJobs} = this.props

    return (
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-view-img"
        />
        <h1 className="failure-view-h">Oops! Something Went Wrong</h1>
        <p className="failure-view-description">
          We cannot seem to find the page you are looking for
        </p>
        <button type="button" className="retry-btn" onClick={getJobs}>
          Retry
        </button>
      </div>
    )
  }

  render() {
    const {requestStatus, jobItems} = this.props

    switch (requestStatus) {
      case RequestStatusConst.loading:
        return this.renderLoadingView()
      case RequestStatusConst.success:
        return this.renderSuccessView(jobItems)
      case RequestStatusConst.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default JobsContainer
