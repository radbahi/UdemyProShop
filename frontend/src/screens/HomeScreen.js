import products from '../products'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'

const HomeScreen = () => {
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
