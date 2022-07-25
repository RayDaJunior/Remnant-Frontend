export const RETRIVE_TOKEN = val => {
    return {
      type: 'RETRIVE_TOKEN',
      TOKEN: val,
    };
  };
export const LOGIN = val => {
    return {
      type: 'LOGIN',
      TOKEN: val,
    };
  };
export const LOGOUT = val => {
    return {
      type: 'LOGOUT',
      TOKEN: null,
    };
  };
export const REGISTER = val => {
    return {
      type: 'REGISTER',
      TOKEN: val,
    };
  };
 