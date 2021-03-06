import axios from 'axios'

export const listProducts = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  //listProducts gets fired off in homescreen component
  try {
    dispatch({ type: 'PRODUCT_LIST_REQUEST' }) //this calls in the reducer to set loading: true and products: []
    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    )
    dispatch({ type: 'PRODUCT_LIST_SUCCESS', payload: data }) //once the data comes in, dispatch it as payload with success type. products then gets set as payload.
  } catch (error) {
    dispatch({
      type: 'PRODUCT_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  // this takes in an id as params
  try {
    dispatch({ type: 'PRODUCT_DETAILS_REQUEST' }) //this calls in the reducer to set loading: true and products: []
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({ type: 'PRODUCT_DETAILS_SUCCESS', payload: data }) //once the data comes in, dispatch it as payload with success type. product then gets set as payload.
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DETAILS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'PRODUCT_DELETE_REQUEST',
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

    await axios.delete(`/api/products/${id}`, config)

    dispatch({ type: 'PRODUCT_DELETE_SUCCESS' })
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DELETE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'PRODUCT_CREATE_REQUEST',
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

    const { data } = await axios.post(`/api/products/`, {}, config) // we send an emptu object because we're making a post request but not actually sending any data

    dispatch({ type: 'PRODUCT_CREATE_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'PRODUCT_CREATE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'PRODUCT_UPDATE_REQUEST',
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
      `/api/products/${product._id}`,
      product,
      config
    ) // we send an emptu object because we're making a post request but not actually sending any data

    dispatch({ type: 'PRODUCT_UPDATE_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'PRODUCT_UPDATE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}

export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: 'PRODUCT_CREATE_REVIEW_REQUEST',
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

    await axios.post(`/api/products/${productId}/reviews`, review, config) // we send an emptu object because we're making a post request but not actually sending any data

    dispatch({ type: 'PRODUCT_CREATE_REVIEW_SUCCESS' })
  } catch (error) {
    dispatch({
      type: 'PRODUCT_CREATE_REVIEW_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_TOP_REQUEST' }) //this calls in the reducer to set loading: true and products: []
    const { data } = await axios.get(`/api/products/top`)
    dispatch({ type: 'PRODUCT_TOP_SUCCESS', payload: data }) //once the data comes in, dispatch it as payload with success type. products then gets set as payload.
  } catch (error) {
    dispatch({
      type: 'PRODUCT_TOP_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message
  }
}
