import { useState, useEffect } from 'react' // useState hook is to use state in functional components since only class components have constructor
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../components/Rating'
// import axios from 'axios'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'

const ProductScreen = ({ history, match }) => {
  // history used to redirect url
  const [qty, setQty] = useState(1) //component level state for quantity selection of the product to purchase
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails) //name this variable as the same part of state you want for consistency. go to store.js and look at the combineReducers.
  const { loading, error, product } = productDetails //destructuring all possible things from this state to evaluate later in this component.

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // A match object contains information about how a <Route path> matched the URL. https://reactrouter.com/web/api/match#:~:text=A%20match%20object%20contains%20information,was%20matched%20(no%20trailing%20characters)
  // const [product, setProduct] = useState({}) // product is an object which is why we use braces here

  // useEffect(() => {
  //   // better to use async await than .then. read this for why https://stackoverflow.com/a/54497100/13371788
  //   // can't directly call async on useEffect so we have to make a new variable
  //   const fetchProduct = async () => {
  //     const { data } = await axios.get(`/api/products/${match.params.id}`) // we added a proxy to frontend's package.json to prevent cors errors
  //     // id is a param from the url accessed by the match object
  //     // data is destructured above so we can call it directly for below instead of doing res.data all the time. this is optional.
  //     setProduct(data)
  //     // now we set that data to the state of this component
  //   }
  //   fetchProduct() // now just call it
  // }, [match]) // this is an array of dependencies. anything u want to fire useEffect off when it changes gets put in there.

  useEffect(() => {
    if (successProductReview) {
      alert('Review submitted')
      setComment('')
      setRating(0)
      dispatch({ type: 'PRODUCT_CREATE_REVIEW_RESET' })
    }
    dispatch(listProductDetails(match.params.id)) // match.params.id takes the id part of the current url and we pass it in here as an argument to get that specific product
  }, [dispatch, match, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(match.params.id, { rating, comment }))
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid></Image>
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {/* Array constructor below to list out quantity */}
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add to cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <h5>No reviews</h5>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a customer review</h2>
                  {errorProductReview && <h4>{errorProductReview}</h4>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <h6>
                      Please{' '}
                      <Link style={{ color: 'blue' }} to='/login'>
                        Login
                      </Link>{' '}
                      to write a review
                    </h6>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
