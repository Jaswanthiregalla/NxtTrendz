import {useState, useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const paymentOptionsList = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisabled: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisabled: true,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isDisabled: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isDisabled: false,
  },
]
const Payment = close => {
  const {cartList} = useContext(CartContext)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const updatePaymentMethod = event => {
    const {id} = event.target
    setPaymentMethod(id)
  }

  const onPlaceOrder = () => setIsOrderPlaced(true)

  const getTotalPrice = () =>
    cartList.reduce((acc, item) => acc + item.quantity * item.price, 0)

  const renderPaymentInputMethod = () => (
    <ul className="payment-method-container">
      {paymentOptionsList.map(eachMethod => (
        <li key={eachMethod.id} className="each-payment-method-container">
          <input
            type="radio"
            className="payment-input-method"
            id={eachMethod.id}
            name="paymentmethod"
            onChange={updatePaymentMethod}
            disabled={eachMethod.isDisabled}
          />
          <label htmlFor={eachMethod.id} className="payment-method-label">
            {eachMethod.displayText}
          </label>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="payments-container">
      {isOrderPlaced ? (
        <p className="success-message">
          Your order has been placed successfully
        </p>
      ) : (
        <>
          <h1 className="payments-heading">Payment Details</h1>
          <p className="payment-sub-heading">Payment Method</p>
          {renderPaymentInputMethod()}
          <div className="order-details">
            <p className="payments-sub-heading">Order details:</p>
            <p>
              Quantity:{' '}
              <span className="details-in-bold">{cartList.length}</span>
            </p>
            <p>
              Total Price:{' '}
              <span className="details-in-bold">RS {getTotalPrice()}/-</span>
            </p>
          </div>
          <div>
            <button
              disabled={paymentMethod !== 'CASH ON DELIVERY'}
              type="button"
              className="confirm-order-button"
              onClick={onPlaceOrder}
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  )
}
export default Payment
