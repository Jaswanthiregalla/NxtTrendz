// Write your code here
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Payment from '../Payment'
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
          <Popup
            modal
            trigger={
              <button type="button" className="button">
                Checkout
              </button>
            }
          >
            {close => (
              <>
                <Payment />
                <div className="button-container">
                  <button
                    type="button"
                    className="trigger-button"
                    onClick={() => close()}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </Popup>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
