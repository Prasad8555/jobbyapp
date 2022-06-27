import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
  }

  onChangeUserName = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({
      errorMsg,
      showErrorMsg: true,
    })
  }

  sendLoginRequest = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userData = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      this.onSuccessLogin(fetchedData.jwt_token)
    } else {
      this.onFailureLogin(fetchedData.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state
    const {history} = this.props
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      history.replace('/')
    }

    return (
      <div className="jobby-app-login-container">
        <div className="jobby-app-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </div>
          <div className="jobby-app-form-container">
            <form className="login-form" onSubmit={this.sendLoginRequest}>
              <label htmlFor="username" className="username-label">
                USERNAME
              </label>
              <input
                type="input"
                id="username"
                placeholder="Username"
                value={username}
                className="username"
                onChange={this.onChangeUserName}
              />
              <label htmlFor="password" className="password-label">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                id="password"
                placeholder="Password"
                className="password"
                onChange={this.onChangePassword}
              />
              <button type="submit" className="login-btn">
                Login
              </button>
              {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
