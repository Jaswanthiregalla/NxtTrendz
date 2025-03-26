import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachCart => eachCart.id !== id),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCart => {
        if (eachCart.id === id) {
          return {...eachCart, quantity: eachCart.quantity + 1}
        }
        return eachCart
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList.map(eachCart => {
        if (eachCart.id === id) {
          return {...eachCart, quantity: eachCart.quantity - 1}
        }
        return eachCart
      })
      const filteredCartList = updatedCartList.filter(item => item.quantity > 0)
      return {cartList: filteredCartList}
    })
  }

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem
    this.setState(prevState => {
      const productExists = prevState.cartList.find(
        eachProduct => eachProduct.title === product.title,
      )
      if (productExists) {
        return {
          cartList: prevState.cartList.map(item =>
            item.title === product.title
              ? {
                  ...item,
                  quantity: item.quantity + product.quantity,
                }
              : item,
          ),
        }
      }
      return {
        cartList: [...prevState.cartList, product],
      }
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
