import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import CartContext from '../../context/CartContext'

import './index.css'

class FoodItem extends Component {
  state = {quantity: 0}

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addCartItem,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
          } = value
          const {each} = this.props
          const {quantity} = this.state
          const {cost, id, imageUrl, name, rating} = each

          const onClickAdd = () => {
            this.setState(
              prev => ({quantity: prev.quantity + 1}),
              addCartItem({...each, quantity: quantity + 1}),
            )
          }

          const onDecreaseQuantity = () => {
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
            decrementCartItemQuantity(id)
          }

          const onIncreaseQuantity = () => {
            this.setState(prevState => ({quantity: prevState.quantity + 1}))
            incrementCartItemQuantity(id)
          }

          return (
            <li className="single-food-item">
              <img className="food-image" alt="food item" src={imageUrl} />
              <div className="single-content">
                <h1 className="s-head">{name}</h1>
                <div className="money-container">
                  <BiRupee className="r-s-s" />
                  <p className="money-s">{cost}</p>
                </div>
                <div className="money-container1">
                  <AiFillStar className="gold-star" />
                  <p className="mo-rating">{rating}</p>
                </div>
                {quantity === 0 ? (
                  <button
                    className="add-btn"
                    type="button"
                    onClick={onClickAdd}
                  >
                    Add
                  </button>
                ) : (
                  <div className="cart-btn-qty-cont">
                    <button
                      type="button"
                      className="decrement-count"
                      onClick={onDecreaseQuantity}
                    >
                      <BsDashSquare className="icon-btn" />
                    </button>
                    <p className="active-count">{quantity}</p>
                    <button
                      type="button"
                      className="increment-count"
                      onClick={onIncreaseQuantity}
                    >
                      <BsPlusSquare className="icon-btn" />
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default FoodItem
