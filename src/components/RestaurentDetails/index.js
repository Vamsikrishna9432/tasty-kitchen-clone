import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import FoodItem from '../FoodItem'

import './index.css'
import Footer from '../Footer'

const apiConstrants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class RestaurentDetails extends Component {
  state = {RestDetails: {}, foodItems: [], apiStatus: apiConstrants.initial}

  componentDidMount() {
    this.getSpecificRestaurent()
  }

  getSpecificRestaurent = async () => {
    this.setState({apiStatus: apiConstrants.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedResData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }
      const updatedFoodItemsData = data.food_items.map(each => ({
        cost: each.cost,
        foodType: each.food_type,
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
        rating: each.rating,
      }))

      this.setState({
        apiStatus: apiConstrants.success,
        RestDetails: updatedResData,
        foodItems: updatedFoodItemsData,
      })
    } else {
      this.setState({apiStatus: apiConstrants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader
        type="TailSpin"
        height="80"
        width="80"
        color="#ffcc00"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
      />
    </div>
  )

  renderBanner = () => {
    const {RestDetails} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = RestDetails
    return (
      <div className="container-black">
        <div className="banner-content">
          <img className="banner-image" alt="restaurant" src={imageUrl} />
          <div className="content-container">
            <h1 className="b-head">{name}</h1>
            <p className="b-p">{cuisine}</p>
            <p className="b-p1">{location}</p>
            <div className="ratings-container">
              <div className="rating-con">
                <div className="top">
                  <AiFillStar className="i1" />
                  <p className="ra">{rating}</p>
                </div>
                <p className="re">{reviewsCount}+ Ratings</p>
              </div>
              <div className="rating-con1">
                <div className="top">
                  <BiRupee className="i1" />
                  <p className="ra">{costForTwo}</p>
                </div>
                <p className="re">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderFoodItems = () => {
    const {foodItems} = this.state
    console.log(foodItems)
    return (
      <div className="food-items-container">
        <ul className="f-items">
          {foodItems.map(each => (
            <FoodItem foodItems={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderSuccess = () => (
    <>
      {this.renderBanner()}
      {this.renderFoodItems()}
    </>
  )

  renderFinalView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstrants.success:
        return this.renderSuccess()
      case apiConstrants.inprogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="specific-hotel-container">
        <Header />
        {this.renderFinalView()}
        <Footer />
      </div>
    )
  }
}

export default RestaurentDetails
