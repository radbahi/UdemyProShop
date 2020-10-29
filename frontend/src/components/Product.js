import { Card } from 'react-bootstrap'

// product is wrapped in curly braces below to pull the name directly from props, so you don't have to call props.product every time
const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as='div'>
          <div className='my-3'>
            {product.rating} from {product.numReviews} reviews
          </div>
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
