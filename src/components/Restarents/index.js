import {Component} from 'react'
import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import './index.css'

class Restarents extends Component {
  render() {
    const {each} = this.props
    const {imageUrl, name, cuisine, rating, totalReviews, id} = each
    return (
      <Link to={`/restaurant/${id}`} className="link-item">
        <li className="res-item">
          <img className="res-image" alt="restaurant" src={imageUrl} />
          <div className="res-content">
            <h1 className="res-head">{name}</h1>
            <p className="res-para">{cuisine}</p>
            <div className="res-rating">
              <AiFillStar className="star" />
              <p className="rating">
                {rating}
                <span className="ra">({totalReviews} ratings)</span>
              </p>
            </div>
          </div>
        </li>
      </Link>
    )
  }
}

export default Restarents
