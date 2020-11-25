import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions.js'

const LoginScreen = ({ location }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const redirect = location.search ? location.search.split('=')[1] : '/' //location.search has the url query string. its brought in as a prop
  const submitHandler = (e) => {
    e.preventDefault()
    //DISPATCH LOGIN
  }
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={email}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      {<br></br>}
      <Row>
        <Col>
          New Customer?{' '}
          <Link
            style={{ color: 'blue' }}
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
