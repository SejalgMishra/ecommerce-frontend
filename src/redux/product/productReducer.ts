
export const productInitialState = {
  products: [],
  productBycategory:[],
  loading: false,
  error: null,
  product:{}
};

export const productReducer = (state=productInitialState, action: any) => {


  switch (action.type) {
    case "LOAD_PRODUCT_REQUEST":
      return { ...state, loading: true };
    case "LOAD_PRODUCT_SUCCESS":
      return { ...state, loading: false, products: action.payload ,productBycategory: action.payload };
      case "LOAD_PRODUCT_SINGLE":
      return { ...state, loading: false, product: action.payload  };
    case "LOAD_PRODUCT_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
