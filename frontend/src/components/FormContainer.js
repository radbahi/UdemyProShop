// made this component because a lot of forms on our app are going to have the samw style
import { Container, Row, Col } from 'react-bootstrap'

//just pass in the props.children in the return
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
