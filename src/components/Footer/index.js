import {Component} from 'react'
import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer-section">
        <div className="footer-head">
          <img
            className="fotter-logo"
            alt="website-footer-logo"
            src="https://res.cloudinary.com/uvamsi-ccbp-tech/image/upload/v1669466833/Frame_275_qj41ex.svg"
          />
          <h1 className="foot-head">Tasty Kitchens</h1>
        </div>
        <p className="foot-para">
          The only thing we are serious about is food.
          <br /> Contact us on
        </p>
        <div className="foot-icons-container">
          <FaPinterestSquare
            className="social-icon"
            testid="pintrest-social-icon"
          />
          <FaInstagram className="social-icon" testid="instagram-social-icon" />
          <FaTwitter className="social-icon" testid="twitter-social-icon" />
          <FaFacebookSquare
            className="social-icon"
            testid="facebook-social-icon"
          />
        </div>
      </div>
    )
  }
}

export default Footer
