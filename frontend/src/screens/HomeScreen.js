import { useState, useEffect } from 'react' // useState hook is to use state in functional components since only class components have constructor
// whatever is in useEffect runs as soon as the component loads. good for api fetches
import products from '../products'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios' // powerful library for fetches

const HomeScreen = () => {
  const [product, setProducts] = useState([])

  useEffect(() => {
    // better to use async await than .then. read this for why https://stackoverflow.com/a/54497100/13371788
    // can't directly call async on useEffect so we have to make a new variable
    const fetchProducts = async () => {
      const { data } = await axios.get('api/products') // we added a proxy to frontend's package.json to prevent cors errors
      // data is destructured above so we can call it directly for below instead of doing res.data all the time. this is optional.
      setProducts(data)
      // now we set that data to the state of this component
    }
    fetchProducts() // now just call it
  }, []) // this is an array of dependencies. anything u want to fire useEffect off when it changes gets put in there. don't need anything here, though.

  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4}>
            <Product product={product} />
            {/* pass in product as props above. the product variable is coming from the map method above */}
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
