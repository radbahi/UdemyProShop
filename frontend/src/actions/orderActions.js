import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'ORDER_CREATE_REQUEST',
    })

    const {
      userLogin: { userInfo },
    } = getState() // we destructure two levels in to get userInfo, which is the logged in user's object

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    } //we want to send this as a header.

    const { data } = await axios.post(`/api/orders`, order, config) //pass the id into this route as well as the config and extract data

    dispatch({ type: 'ORDER_CREATE_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'ORDER_CREATE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'ORDER_DETAILS_REQUEST',
    })

    const {
      userLogin: { userInfo },
    } = getState() // we destructure two levels in to get userInfo, which is the logged in user's object

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    } //we want to send this as a header.

    const { data } = await axios.get(`/api/orders/${id}`, config) //pass the id into this route as well as the config and extract data

    dispatch({ type: 'ORDER_DETAILS_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'ORDER_DETAILS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: 'ORDER_PAY_REQUEST',
    })

    const {
      userLogin: { userInfo },
    } = getState() // we destructure two levels in to get userInfo, which is the logged in user's object

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    } //we want to send this as a header.

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    ) //pass the id into this route as well as the config and extract data

    dispatch({ type: 'ORDER_PAY_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'ORDER_PAY_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'ORDER_LIST_MY_REQUEST',
    })

    const {
      userLogin: { userInfo },
    } = getState() // we destructure two levels in to get userInfo, which is the logged in user's object

    const config = {
      headers: {
        // don't need content-type here
        Authorization: `Bearer ${userInfo.token}`,
      },
    } //we want to send this as a header.

    const { data } = await axios.get(`/api/orders/myorders`, config) //pass the id into this route as well as the config and extract data

    dispatch({ type: 'ORDER_LIST_MY_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'ORDER_LIST_MY_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}
