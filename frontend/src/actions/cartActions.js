import axios from 'axios'

//getState is a redux method to get the current state
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: 'CART_ADD_ITEM',
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) //save the cart to localstorage. we stringify it cuz localstorage only saves strings. we later parse it back to JSON to use with javascript.
  //we take the localstorage cart items data in the initial state in store.js
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: 'CART_REMOVE_ITEM',
    payload: id,
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: 'CART_SAVE_SHIPPING_ADDRESS',
    payload: data,
  })
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}
