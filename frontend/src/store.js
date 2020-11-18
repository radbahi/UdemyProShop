// this file is where we connect our reducers and middlwares and things like that. we installed redux, react-redux, redux-thunk, and react-devtools-extensions
//A store holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action on it.
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' //a middleware that lets you call action creators that return a function instead of an action object.
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers.js'

const reducer = combineReducers({
  // A reducer is a function that determines changes to an application’s state. It uses the action it receives to determine this change.
  productList: productListReducer, //the productList part of the state then gets the data from productListReducer...
  productDetails: productDetailsReducer, //...as well as anything else passed in here
  cart: cartReducer,
})

//we get cart items from localstorage below...
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

//...then pass to initial state
const initialState = { cart: { cartItems: cartItemsFromStorage } }

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
