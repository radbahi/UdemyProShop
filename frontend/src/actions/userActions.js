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
