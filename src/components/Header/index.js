import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="h89">
            <img
              className="logo"
              alt="website logo"
              src="https://res.cloudinary.com/uvamsi-ccbp-tech/image/upload/v1669220614/Frame_274_1_yeq8tm.svg"
            />
          </Link>
          <p className="logo-text">Tasty Kitchens</p>
        </div>

        <ul className="tabs-container">
          <Link to="/" className="h">
            <li className="list-item">Home</li>
          </Link>
          <Link to="/cart" className="h">
            <li className="list-item">Cart</li>
          </Link>
          <button
            className="logout-btn"
            type="button"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
        </ul>
      </div>
    )
  }
}

export default withRouter(Header)
