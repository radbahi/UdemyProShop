import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions.js'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [confirmPassword, setConfirmPassword] = useState('')

  const [message, setMessage] = useState(null)

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password })) //this is the user object we want to pass into the reducer
    }
  }

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails) //grab userDetails which gets its data from userDetailsReducer...
  const { loading, error, user } = userDetails //...then deconstruct and get these from the state

  const userLogin = useSelector((state) => state.userLogin) //grab userLogin which gets its data from userLoginReducer...
  const { userInfo } = userLogin //...then deconstruct and get these from the state. We bring this in to check if user is logged in

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile) //grab userUpdateProfile which gets its data from userUpdateProfileReducer...
  const { success } = userUpdateProfile //...then deconstruct and get these from the state. We bring this in to check if user is logged in

  useEffect(() => {
    if (!userInfo) {
      //if user not logged in, redirect to login page
      history.push('/login')
    } else if (!user.name) {
      //if no user details in state, get the details
      dispatch(getUserDetails('profile'))
    } else {
      setName(user.name)
      setEmail(user.email)
    }
  }, [dispatch, history, userInfo, user.name, user.email])

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && (
          <h2 style={{ color: 'red', backgroundColor: 'yellow' }}>{message}</h2>
        )}
        {error && (
          <h2 style={{ color: 'red', backgroundColor: 'yellow' }}>{error}</h2> //NEED TO MAKE THESE MESSAGES TIME OUT
        )}
        {success && (
          <h2 style={{ color: 'darkgreen', backgroundColor: 'lightgreen' }}>
            Profile updated
          </h2>
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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
