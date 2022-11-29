import EmptyCartView from '../EmptyCartView'
import CartContext from '../../context/CartContext'
import CartView from '../CartView'
import Header from '../Header'
import Footer from '../Footer'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <>
          <Header />
          {cartList.length === 0 ? <EmptyCartView /> : <CartView />}
          <Footer />
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
