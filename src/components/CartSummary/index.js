// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalPrice = cartList.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      )
      const cartItemsCount = cartList.length
      return (
        <div className="cart-summary-container">
          <h1 className="total-price">
            <span className="order-total">Order Total:</span>{' '}
            {`Rs ${totalPrice}/-`}
          </h1>
          <p className="items-count-details">{cartItemsCount} Items in cart</p>

          <button type="button" className="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
