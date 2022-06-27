import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const requestStatusCon = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILED',
}

class Profile extends Component {
  state = {
    profileData: {},
    requestStatus: 'LOADING',
  }

  componentDidMount = () => {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({
      requestStatus: 'LOADING',
    })
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      const profileDetails = fetchedData.profile_details
      const updatedProfileData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileData: updatedProfileData,
        requestStatus: 'SUCCESS',
      })
    } else {
      this.setState({
        requestStatus: 'FAILED',
      })
    }
  }

  renderLoader = () => (
    <div className="profile-loader-container" testid="loader">
      <Loader
        type="ThreeDots"
        className="loader"
        height={50}
        width={50}
        color="#4f46e5"
      />
    </div>
  )

  renderSuccessView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="user-name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <button type="button" onClick={this.getProfileData} className="retry-btn">
        Retry
      </button>
    </div>
  )

  render() {
    const {requestStatus} = this.state
    switch (requestStatus) {
      case requestStatusCon.loading:
        return this.renderLoader()
      case requestStatusCon.success:
        return this.renderSuccessView()
      case requestStatusCon.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default Profile
