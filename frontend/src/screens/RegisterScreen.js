import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions.js'

//REDIRECT BUG WHEN REGISTERING, SIGNING OUT, THEN SIGNING BACK IN

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [confirmPassword, setConfirmPassword] = useState('')

  const [message, setMessage] = useState(null)

  const redirect = location.search ? location.search.split('=')[1] : '/' //location.search has the url query string. its brought in as a prop

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister) //grab userRegister which gets its data from userRegisterReducer...

  const { loading, error, userInfo } = userRegister //...then deconstruct and get these from the state

  // check if user has logged in then redirects
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && (
        <h2 style={{ color: 'red', backgroundColor: 'yellow' }}>{message}</h2>
      )}
      {error && (
        <h2 style={{ color: 'red', backgroundColor: 'yellow' }}>{error}</h2>
      )}
      {loading && <h1>Loading...</h1>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>
      {<br></br>}
      <Row>
        <Col>
          Have an Account?{' '}
          <Link
            style={{ color: 'blue' }}
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
