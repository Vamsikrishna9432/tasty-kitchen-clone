import {Component} from 'react'
import {FaRupeeSign} from 'react-icons/fa'

import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import PaymentSuccess from '../PaymentSuccess'
import './index.css'

class CartView extends Component {
  state = {orderPlaced: false}

  onClickOrderPlaced = () => {
    this.setState(prev => ({orderPlaced: !prev.orderPlaced}))
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          let totalAmount = null
          cartList.forEach(element => {
            totalAmount += element.cost * element.quantity
          })
          const {orderPlaced} = this.state
          return orderPlaced ? (
            <PaymentSuccess />
          ) : (
            <div className="cart-items-container">
              <div className="top-headings">
                <p className="item-head">Item</p>
                <div className="second-part">
                  <p className="item-head">Quantity</p>
                  <p className="item-head">Price</p>
                </div>
              </div>
              {cartList.map(each => (
                <CartItem cartItem={each} key={each.id} />
              ))}
              <hr className="cart-hori" />
              <div className="summary-container">
                <h1 className="order-total">Order Total:</h1>
                <div className="total-amount-container">
                  <p className="money-total">
                    <FaRupeeSign size={18} />
                    {totalAmount}
                  </p>
                  <button
                    className="place-order-btn"
                    type="button"
                    onClick={this.onClickOrderPlaced}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartView
