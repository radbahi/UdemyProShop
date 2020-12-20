import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions.js'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const redirect = location.search ? location.search.split('=')[1] : '/' //location.search has the url query string. its brought in as a prop

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin) //grab userLogin which gets its data from userLoginReducer...

  const { loading, error, userInfo } = userLogin //...then deconstruct and get these from the state

  // check if user has logged in then redirects
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Alert variant='danger'>{error}</Alert>}
      {loading && <h1>Loading...</h1>}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      {<br></br>}
      <Row className='py-3'>
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
