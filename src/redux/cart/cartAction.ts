export const TYPES = {
  LOAD_CART_REQUEST: "LOAD_CART_REQUEST",
  ADD_CART_SUCCESS: "ADD_CART_SUCCESS",
  UPDATE_CART_REQUEST: "UPDATE_CART_REQUEST",
   DELETE_CART_REQUEST: "DELETE_CART_REQUEST",
};

export const addToCart = (Data : any) => {
    return {
      type: "ADD_CART_SUCCESS",
      payload : Data,
    };
  };

  export const getCart = (Data : any) => {
    return {
      type: "LOAD_CART_SUCCESS",
      payload : Data,
    };
  };

  export const deleteCart = () => {
    return {
      type: "DELETE_CART_REQUEST",
    };
  };

  export const updateCart = (Data : any) => {
    return {
      type: "UPDATE_CART_REQUEST",
      payload : Data,
    };
  };