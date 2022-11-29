import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import MagicSliderDots from 'react-magic-slider-dots'
import 'react-magic-slider-dots/dist/magic-dots.css'

import './index.css'

class Carousel extends Component {
  state = {carouselData: []}

  componentDidMount() {
    this.getImagesData()
  }

  getImagesData = async () => {
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    this.setState({carouselData: data.offers})
  }

  render() {
    const {carouselData} = this.state
    console.log(carouselData)
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      adaptiveHeight: true,

      appendDots: dots => (
        <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />
      ),
    }

    return (
      <div className="container">
        <ul className="un-list">
          <Slider {...settings} className="slider">
            {carouselData.map(each => (
              <li key={each.id}>
                <img
                  src={each.image_url}
                  className="carousel-image"
                  alt="offer"
                />
              </li>
            ))}
          </Slider>
        </ul>
      </div>
    )
  }
}

export default Carousel
