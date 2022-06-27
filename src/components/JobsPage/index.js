import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import Profile from '../Profile'
import TypeCategoryItem from '../TypeCategoryItem'
import SalaryTypeCategoryItem from '../SalaryRangeCategoryItem'
import JobsContainer from '../JobsContainer'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsPage extends Component {
  state = {
    jobsData: [],
    employmentType: '',
    searchInput: '',
    minimumPackage: '',
    requestStatus: '',
  }

  componentDidMount = () => {
    this.getJobItems()
  }

  onSalaryRangeCategoryItem = id => {
    this.setState(
      {
        minimumPackage: id,
      },
      this.getJobItems,
    )
  }

  onChangeSearchbarInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  getJobItemsBySearchInput = () => {
    this.getJobItems()
  }

  onClickTypeCategoryItem = id => {
    const {employmentType} = this.state
    let updatedState
    if (employmentType === '') {
      updatedState = id
    } else {
      updatedState = `${employmentType},${id}`
    }
    this.setState(
      {
        employmentType: updatedState,
      },
      this.getJobItems,
    )
  }

  onSuccessRequest = jobs => {
    this.setState({
      jobsData: jobs,
      requestStatus: 'SUCCESS',
    })
  }

  onFailureRequest = () => {
    this.setState({
      requestStatus: 'FAILURE',
    })
  }

  getUpdatedData = jobDetails => ({
    id: jobDetails.id,
    companyLogoUrl: jobDetails.company_logo_url,
    employmentType: jobDetails.employment_type,
    jobDescription: jobDetails.job_description,
    location: jobDetails.location,
    packagePerAnnum: jobDetails.package_per_annum,
    rating: jobDetails.rating,
    title: jobDetails.title,
  })

  getJobItems = async () => {
    this.setState({
      requestStatus: 'LOADING',
    })
    const {employmentType, minimumPackage, searchInput} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const {jobs} = fetchedData
      const UpdatedData = jobs.map(each => this.getUpdatedData(each))
      this.onSuccessRequest(UpdatedData)
    } else {
      this.onFailureRequest()
    }
  }

  render() {
    const {
      jobsData,
      minimumPackage,
      employmentType,
      searchInput,
      requestStatus,
    } = this.state

    return (
      <div className="jobby-app-bg-container">
        <Header />
        <div className="jobby-app-jobs-container">
          <div className="profile-category-container">
            <Profile />
            <hr className="line" />
            <h1 className="category-h">Type of Employment</h1>
            <ul className="category-container">
              {employmentTypesList.map(eachEmploymentType => (
                <TypeCategoryItem
                  eachEmploymentType={eachEmploymentType}
                  key={eachEmploymentType.label}
                  onClickTypeCategoryItem={this.onClickTypeCategoryItem}
                />
              ))}
            </ul>
            <hr className="line" />
            <h1 className="category-h">Salary Range</h1>
            <div className="category-container">
              {salaryRangesList.map(eachSalaryRange => (
                <SalaryTypeCategoryItem
                  eachSalaryRange={eachSalaryRange}
                  key={eachSalaryRange.salaryRangeId}
                  onSalaryRangeCategoryItem={this.onSalaryRangeCategoryItem}
                />
              ))}
            </div>
          </div>
          <div className="jobby-app-jobs-container">
            <div className="jobs-container">
              <div className="search-bar-container">
                <input
                  type="search"
                  className="search-bar"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchbarInput}
                />
                <button
                  type="button"
                  testid="searchButton"
                  onClick={this.getJobItemsBySearchInput}
                >
                  <BsSearch type="button" className="search-icon" />
                </button>
              </div>
              <JobsContainer
                employmentType={employmentType}
                minimumPackage={minimumPackage}
                jobItems={jobsData}
                getJobs={this.getJobItems}
                requestStatus={requestStatus}
              />
            </div>
          </div>
          )
        </div>
      </div>
    )
  }
}

export default JobsPage
