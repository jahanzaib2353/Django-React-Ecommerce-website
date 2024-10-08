import { createStore, combineReducers, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailReducer, productDeleteReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer'
import { userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducer'

import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducers'
// Placeholder for your reducers, you can add your reducers here
const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    userList:userListReducer,
    userDelete:userDetailsReducer,
    userUpdate:userUpdateReducer,
    productDelete:productDeleteReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

// Initial state
const initialState = {
  cart: {
      cartItems: cartItemsFromStorage,
      shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}
// Middleware
const middleware = [thunk]

// Create store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
