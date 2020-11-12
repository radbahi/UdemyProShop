// reducers take in 2 things: the initial state and the action. the action object gets dispatched to the reducer.
// actions can have types or payloads. types get evaluated in the reducer and the reducer does certain things according to the type.
// payload is data fetched from the server.
// the initial state for the reducer below is an empty products array.

export const productListReducer = (state = { products: [] }, action) => {
  switch (
    action.type // this is where the reducer does things according to each type.
  ) {
    case 'PRODUCT_LIST_REQUEST':
      return { loading: true, products: [] } //we send loading: true to let the component know it's fetching the data
    case 'PRODUCT_LIST_SUCCESS':
      return { loading: false, products: action.payload } //we send this once the data is fetched. remember that payload = data.
    case 'PRODUCT_LIST_FAIL':
      return { loading: false, error: action.payload }
    default:
      //always have a default
      return state
  }
}

// once the reducer is done, we add it to the store
