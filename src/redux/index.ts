import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import { productReducer } from "./product/productReducer";
import { cartReducer } from "./cart/cartReducer";

export const rootReducer = combineReducers({
    auth : authReducer,
    product : productReducer,
    cart : cartReducer
  });

export type RootState = ReturnType<typeof rootReducer>;  


