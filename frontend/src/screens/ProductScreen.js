import { useState, useEffect } from 'react' // useState hook is to use state in functional components since only class components have constructor
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductScreen = ({ match }) => {
  // A match object contains information about how a <Route path> matched the URL. https://reactrouter.com/web/api/match#:~:text=A%20match%20object%20contains%20information,was%20matched%20(no%20trailing%20characters)
  const [product, setProduct] = useState({}) // product is an object which is why we use braces here

  useEffect(() => {
    // better to use async await than .then. read this for why https://stackoverflow.com/a/54497100/13371788
    // can't directly call async on useEffect so we have to make a new variable
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`) // we added a proxy to frontend's package.json to prevent cors errors
      // id is a param from the url accessed by the match object
      // data is destructured above so we can call it directly for below instead of doing res.data all the time. this is optional.
      setProduct(data)
      // now we set that data to the state of this component
    }
    fetchProduct() // now just call it
  }, [match]) // this is an array of dependencies. anything u want to fire useEffect off when it changes gets put in there.

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
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
            <ListGroup.Item>Description: ${product.description}</ListGroup.Item>
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
              <ListGroup.Item>
                <Button
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
    </>
  )
}

export default ProductScreen
