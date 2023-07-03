import { TYPES } from "./authAction";

interface AuthState {
  
}

const initialState: AuthState = {
  userDetails: []
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case  TYPES.AUTH:
      return {
       token :   action.payload
      }
      case  TYPES.DATA:
        return {
         data : action.payload
        }
        case  TYPES.USER:
          return {
           data : action.payload
          }
          case  TYPES.USER_ADDRESS:
          return {
           data : action.payload
          }
          case  TYPES.LOGOUT:
          return {





            
           data : [] 
          }
    default:
      return state;
  }
};

export default authReducer;
