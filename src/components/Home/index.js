import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFilterRight} from 'react-icons/bs'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Carousel from '../Carousel'
import Header from '../Header'
import Restarents from '../Restarents'
import Footer from '../Footer'
import './index.css'

const apiConstarnts = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}
const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    apiStatus: apiConstarnts.initial,
    restaurentList: [],
    sortOption: sortByOptions[1].value,
    activePage: 1,
  }

  componentDidMount() {
    this.getRestaurentDetails()
  }

  getRestaurentDetails = async () => {
    this.setState({apiStatus: apiConstarnts.inprogress})
    const {sortOption, activePage} = this.state
    const limit = 9
    const offset = (activePage - 1) * limit
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortOption}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.restaurants.map(each => ({
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnlineDelivary: each.has_online_delivery,
        hasTableBooking: each.has_table_booking,
        id: each.id,
        imageUrl: each.image_url,
        isDeliveringNow: each.is_delivering_now,
        location: each.location,
        menuType: each.menu_type,
        name: each.name,
        opensAt: each.opens_at,
        ratingText: each.user_rating.rating_text,
        ratingColor: each.user_rating.rating_color,
        totalReviews: each.user_rating.total_reviews,
        rating: each.user_rating.rating,
      }))

      this.setState({
        restaurentList: updatedData,
        apiStatus: apiConstarnts.success,
      })
    } else {
      this.setState({apiStatus: apiConstarnts.failure})
    }
  }

  onChangeFilter = event => {
    this.setState({sortOption: event.target.value}, this.getRestaurentDetails)
  }

  onClickLeftButton = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prev => ({activePage: prev.activePage - 1}),
        this.getRestaurentDetails,
      )
    }
  }

  onClickRightButton = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prev => ({activePage: prev.activePage + 1}),
        this.getRestaurentDetails,
      )
    }
  }

  renderSuccessView = () => {
    const {restaurentList, activePage, sortOption} = this.state
    return (
      <>
        <Carousel />
        <div className="items">
          <div className="heading-container">
            <h1 className="popular-heading">Popular Restaurants</h1>
            <div className="bottom-heading">
              <p className="description">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>
              <div className="filter-container">
                <BsFilterRight className="icon" />
                <p className="sort">Sort By</p>
                <select
                  onChange={this.onChangeFilter}
                  className="select-container"
                  value={sortOption}
                >
                  {sortByOptions.map(each => (
                    <option value={each.value} key={each.id} className="option">
                      {each.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <hr className="line" />
          <ul className="restaurent-items">
            {restaurentList.map(each => (
              <Restarents each={each} key={each.id} />
            ))}
          </ul>
          <div className="forword-container">
            <div className="fbcon">
              <button
                className="btn"
                type="button"
                onClick={this.onClickLeftButton}
              >
                <AiOutlineLeft className="i" />
              </button>
              <p className="i-num">
                <span>{activePage}</span> of 4
              </p>
              <button
                className="btn"
                type="button"
                onClick={this.onClickRightButton}
              >
                <AiOutlineRight className="i" />
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  renderLoadigView = () => (
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

  renderFinalView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstarnts.inprogress:
        return this.renderLoadigView()
      case apiConstarnts.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        {this.renderFinalView()}
        <Footer />
      </div>
    )
  }
}

export default Home
