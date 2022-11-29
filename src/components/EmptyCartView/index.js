import {Link} from 'react-router-dom'
import './index.css'

const EmptyCartView = () => (
  <div className="empty-container">
    <img
      className="empty-image"
      alt="empty cart"
      src="https://res.cloudinary.com/uvamsi-ccbp-tech/image/upload/v1669567294/Layer_2_bnjt5u.jpg"
    />
    <h1 className="empty-heading">No Orders Yet!</h1>
    <p className="empty-para">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/" className="hide-link">
      <button className="order-btn" type="button">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
