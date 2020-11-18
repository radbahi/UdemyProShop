import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' //anytime you're dealing with redux state in a component, you bring these in
import { addToCart } from '../actions/cartActions'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

//we're using match to get product id, location to get quantity, history to redirect
export const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  // whatever is after the ? in the url is going to be in location.search. when adding to cart, this will be the quantity
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  //we use the split method here to get the exact quantity in the url. so it'll split "?qty=1" into an array using the = and now "?qty" would be the first index of that array and "1" would be the second, then we grab the second element.
  //we use Number() to turn it into an integer since grabbing it directly from the url doesn't make it an integer type

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return <div>Cart</div>
}
