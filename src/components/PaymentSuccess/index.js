import {Link} from 'react-router-dom'

import CartContext from '../../context/CartContext'

import './index.css'

const PaymentSuccess = () => (
  <CartContext.Consumer>
    {value => {
      const {removeAllItems} = value

      const clearCart = () => {
        removeAllItems()
      }

      return (
        <>
          <div className="payment-container">
            <div className="payment-card">
              <img
                src="https://res.cloudinary.com/dleaoaoxz/image/upload/v1640589400/check-circle.1_1_j1sf56.jpg"
                alt="success"
                className="payment-image"
              />
              <h1 className="payment-heading">Payment Successful</h1>
              <p className="payment-text">
                Thank you for ordering Your payment is successfully completed.
              </p>
              <Link to="/">
                <button type="button" className="home-btn" onClick={clearCart}>
                  Go To Home Page
                </button>
              </Link>
            </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default PaymentSuccess
