// reducers take in 2 things: the initial state and the action. the action object gets dispatched to the reducer.
// actions can have types or payloads. types get evaluated in the reducer and the reducer does certain things according to the type.
// payload is data fetched from the server.
// the initial state for the reducer below is an empty cartItems array.

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      //existItem added to check if the item is already in the cart
      const existItem = state.cartItems.find(
        (x) => x.product === action.payload.product
      )
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? action.payload : x
          ), //don't understand this. this is practically the same logic as existItem. come back to this.
        }
      } else {
        return { ...state, cartItems: [...state.cartItems, action.payload] }
      }
    case 'CART_REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload), //filter keeps in any product that doesn't match payload
      }
    case 'CART_SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        shippingAddress: action.payload,
      }
    default:
      return state
  }
}
