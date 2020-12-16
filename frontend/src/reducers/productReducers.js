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

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (
    action.type // this is where the reducer does things according to each type.
  ) {
    case 'PRODUCT_DETAILS_REQUEST':
      return { loading: true, ...state } //pass in whatever's currently in the state. not sure if we really need to do this but whatever
    case 'PRODUCT_DETAILS_SUCCESS':
      return { loading: false, product: action.payload } //we send this once the data is fetched. remember that payload = data.
    case 'PRODUCT_DETAILS_FAIL':
      return { loading: false, error: action.payload }
    default:
      //always have a default
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (
    action.type // this is where the reducer does things according to each type.
  ) {
    case 'PRODUCT_DELETE_REQUEST':
      return { loading: true }
    case 'PRODUCT_DELETE_SUCCESS':
      return { loading: false, success: true }
    case 'PRODUCT_DELETE_FAIL':
      return { loading: false, error: action.payload }
    default:
      //always have a default
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (
    action.type // this is where the reducer does things according to each type.
  ) {
    case 'PRODUCT_CREATE_REQUEST':
      return { loading: true }
    case 'PRODUCT_CREATE_SUCCESS':
      return { loading: false, success: true, product: action.payload }
    case 'PRODUCT_CREATE_FAIL':
      return { loading: false, error: action.payload }
    case 'PRODUCT_CREATE_RESET':
      return {}
    default:
      //always have a default
      return state
  }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (
    action.type // this is where the reducer does things according to each type.
  ) {
    case 'PRODUCT_UPDATE_REQUEST':
      return { loading: true }
    case 'PRODUCT_UPDATE_SUCCESS':
      return { loading: false, success: true, product: action.payload }
    case 'PRODUCT_UPDATE_FAIL':
      return { loading: false, error: action.payload }
    case 'PRODUCT_UPDATE_RESET':
      return { product: {} }
    default:
      //always have a default
      return state
  }
}

export const productReviewCreateReducer = (state = {}, action) => {
  switch (
    action.type // this is where the reducer does things according to each type.
  ) {
    case 'PRODUCT_CREATE_REVIEW_REQUEST':
      return { loading: true }
    case 'PRODUCT_CREATE_REVIEW_SUCCESS':
      return { loading: false, success: true }
    case 'PRODUCT_CREATE_REVIEW_FAIL':
      return { loading: false, error: action.payload }
    case 'PRODUCT_CREATE_REVIEW_RESET':
      return {}
    default:
      //always have a default
      return state
  }
}
// once the reducer is done, we add it to the store
