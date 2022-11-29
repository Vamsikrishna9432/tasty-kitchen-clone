import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'

import './index.css'

class Header extends Component {
  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const cartCount = cartList.length > 0 ? cartList.length : ''

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
                  <li className="list-item">
                    Cart{' '}
                    {cartCount > 0 ? (
                      <span className="cart-count">{cartCount}</span>
                    ) : (
                      ''
                    )}
                  </li>
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
        }}
      </CartContext.Consumer>
    )
  }
}

export default withRouter(Header)
