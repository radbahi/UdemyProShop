import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' //anytime you're dealing with redux state in a component, you bring these in
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from 'react-bootstrap'

//we're using match to get product id, location to get quantity, history to redirect
const CartScreen = ({ match, location, history }) => {
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

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
    //this url contains logic. if theyre logged in, redirect to shipping.
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <h2>
            Your cart is empty.{' '}
            <Link to='/' style={{ color: 'blue' }}>
              Go back.
            </Link>
          </h2>
        ) : (
          <ListGroup variant='flush'>
            {/* remember that the key for the ListGroupItem below has item.product because the .product is an id */}
            {cartItems.map((item) => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {/* Array constructor below to list out quantity */}
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={2}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroupItem>
              {/* reduce is used to add up the quantity of all the items in the cart */}
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              {/* toFixed adds two decimals */}$
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroupItem>
            <ListGroupItem>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
