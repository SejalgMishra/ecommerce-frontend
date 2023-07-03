export const TYPES = {
  AUTH: "AUTH",
  DATA: "DATA",
  USER :"USER",
  USER_ADDRESS: "USER_ADDRESS",
  LOGOUT:"LOGOUT"
};

export const login = (Data: any) => {
  return {
    type: "AUTH",
    payload: Data,
  };
};

export const logOut = () => {
  return {
    type: "LOGOUT",
  };
};

export const register = (Data: any) => {
  return {
    type: "DATA",
    payload: Data,
  };
};

export const userData = (Data: any) => {
  return {
    type: "USER",
    payload: Data,
  };
};

export const getUserAddress = (Data: any) => {
  return {
    type: "USER_ADDRESS",
    payload: Data,
  };
};

