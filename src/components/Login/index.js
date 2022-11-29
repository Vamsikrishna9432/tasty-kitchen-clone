import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showError: false}

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.setState({showError: true, errorMsg: data.error_msg})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="Login-page-container">
        <div className="main-login">
          <div className="Login-container">
            <img
              className="logo"
              src="https://res.cloudinary.com/uvamsi-ccbp-tech/image/upload/v1669220614/Frame_274_1_yeq8tm.svg"
              alt="website logo"
            />
            <h1 className="logo-name">Tasty Kitchens</h1>
            <h1 className="login">Login</h1>
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <label className="label-text" htmlFor="username">
                USERNAME
              </label>
              <input
                className="input-box"
                id="username"
                onChange={this.onChangeUsername}
                value={username}
                type="text"
              />
              <label className="label-text" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="input-box"
                onChange={this.onChangePassword}
                value={password}
              />
              <button type="submit" className="login-btn">
                Login
              </button>
              {showError && <p className="error">*{errorMsg}</p>}
            </form>
          </div>
        </div>
        <div className="image-container">
          <img
            className="image"
            alt="website login"
            src="https://res.cloudinary.com/uvamsi-ccbp-tech/image/upload/v1669264316/website_login_hed55w.png"
          />
        </div>
      </div>
    )
  }
}

export default Login
