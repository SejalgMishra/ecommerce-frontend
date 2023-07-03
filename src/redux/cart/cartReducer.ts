export const cartInitialValue = {
    loading: false,
    error: null,
    cart: [],
  };
  
  export  const cartReducer =  (state = cartInitialValue, action: any ) => {
    switch (action.type) {
  
      case "LOAD_CART_SUCCESS":
        return { ...state, loading: false, cart: action.payload };
  
      case "ADD_CART_SUCCESS":
        return { ...state, loading: false, cart: [...state.cart, action.payload] };
  
      case "UPDATE_CART_SUCCESS": {
        const index = state.cart.findIndex((x) => x.id === action.payload.id);
        return {
          ...state,
          loading: false,
          cart: [
            ...state.cart.slice(0, index),
            action.payload,
            ...state.cart.slice(index + 1),
          ],
        };
      }
      case "DELETE_CART_SUCCESS": {
        const index = state.cart.findIndex((x) => x.id === action.payload.id);
        return {
          ...state,
          loading: false,
          cart: [...state.cart.slice(0, index), ...state.cart.slice(index + 1)],
        };
      }
      // case "CLEAR_CART_SUCCESS":
      //   return { ...state, loading: false, cart: [] };
  
      // case "LOAD_CART_FAIL":
      // case "ADD_CART_FAIL":
      // case "UPDATE_CART_FAIL":
      // case "DELETE_CART_FAIL":
      // // case "CLEAR_CART_FAIL":
      //   return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  