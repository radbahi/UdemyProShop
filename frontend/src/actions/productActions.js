import axios from 'axios'

export const listProducts = () => async (dispatch) => {
  //listProducts gets fired off in homescreen component
  try {
    dispatch({ type: 'PRODUCT_LIST_REQUEST' }) //this calls in the reducer to set loading: true and products: []
    const { data } = await axios.get('/api/products')
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
  //listProducts gets fired off in homescreen component
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