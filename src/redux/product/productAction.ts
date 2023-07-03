export const TYPES = {
    LOAD_PRODUCT_REQUEST : "LOAD_PRODUCT_REQUEST",
    LOAD_PRODUCT_SUCCESS:"LOAD_PRODUCT_SUCCESS",
    LOAD_PRODUCT_FAIL: "LOAD_PRODUCT_FAIL",
    LOAD_PRODUCT_SINGLE:"LOAD_PRODUCT_SINGLE"
  };
  
  
  
  export const getProduct = (Data : any) => {
    return {
      type: "LOAD_PRODUCT_SUCCESS",
      payload : Data,
    };
  };
  
  export const getAllProduct = (Data : any) => {
    return {
      type: "LOAD_PRODUCT_SUCCESS",
      payload : Data,
    };
  };
  
  export const getOneProduct = (Data : any) => {
    return {
      type: "LOAD_PRODUCT_SINGLE",
      payload : Data,
    };
  };
  
  