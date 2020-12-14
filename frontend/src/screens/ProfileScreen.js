import { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions.js'
import { listMyOrders } from '../actions/orderActions.js'

const ProfileScreen = ({ history }) => {
  // removed location from props
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

  const orderListMy = useSelector((state) => state.orderListMy) //grab orderListMy which gets its data from orderListMyReducer...
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy //...then deconstruct and get these from the state

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
      dispatch(listMyOrders())
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
        {loadingOrders ? (
          <h3>Loading orders...</h3>
        ) : errorOrders ? (
          <h3>{errorOrders}</h3>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
