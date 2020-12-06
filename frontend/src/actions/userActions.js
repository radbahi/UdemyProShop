import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_LOGIN_REQUEST',
    })

    const config = { headers: { 'Content-Type': 'application/json' } } //we want to send this as a header.

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    ) //pass all these arguments in and then extract data from the response

    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data)) //save the userinfo to localstorage. we stringify it cuz localstorage only saves strings. we later parse it back to JSON to use with javascript.
    //we take the localstorage userinfo data in the initial state in store.js
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo') // whats the point of using both localStorage and redux state???
  dispatch({ type: 'USER_LOGOUT' })
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_REGISTER_REQUEST',
    })

    const config = { headers: { 'Content-Type': 'application/json' } } //we want to send this as a header.

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    ) //pass all these arguments in and then extract data from the response

    dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data })

    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data }) //we want the user to be immediately logged in if registration is successful

    localStorage.setItem('userInfo', JSON.stringify(data)) //save the userinfo to localstorage. we stringify it cuz localstorage only saves strings. we later parse it back to JSON to use with javascript.
    //we take the localstorage userinfo data in the initial state in store.js
  } catch (error) {
    dispatch({
      type: 'USER_REGISTER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'USER_DETAILS_REQUEST',
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

    const { data } = await axios.get(`/api/users/${id}`, config) //pass the id into this route as well as the config and extract data

    dispatch({ type: 'USER_DETAILS_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'USER_DETAILS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'USER_UPDATE_PROFILE_REQUEST',
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

    const { data } = await axios.put(`/api/users/profile`, user, config) //pass the id into this route as well as the config and extract data

    dispatch({ type: 'USER_UPDATE_PROFILE_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'USER_UPDATE_PROFILE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}
