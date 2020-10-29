import { Container, Row, Col } from 'react-bootstrap' // also go to index.css for custom styles

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; ProShop</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

// racfe is the snippet command to quickly make this component
