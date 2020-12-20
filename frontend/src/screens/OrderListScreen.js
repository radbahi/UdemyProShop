import { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin // MIGHT BE A PROBLEM WITH THE WAY WE HAVE THE USER REDUCER LABELED

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Orders</h1>
        </Col>
        <Col className='text-right'></Col>
      </Row>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Paid At</th>
              <th>Delivered At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                {/* createdAt comes directly from mongodb */}
                <td>${order.totalPrice}</td>
                <td>
                  {order.paidAt ? order.paidAt.substring(0, 10) : 'Not paid'}
                </td>
                <td>
                  {order.deliveredAt
                    ? order.deliveredAt.substring(0, 10)
                    : 'Not delivered'}
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
    </>
  )
}

export default OrderListScreen
