const initial = {
  isLoading: true,
  TOKEN: null,
};

const loginToken = (state = initial, action) => {
  switch (action.type) {
    case 'RETRIVE_TOKEN':
      return (state = {
        isLoading: false,
        TOKEN: action.TOKEN,
      });
    case 'LOGIN':
      return (state = {
        isLoading: false,
        TOKEN: action.TOKEN,
      });
    case 'LOGOUT':
      return (state = {
        isLoading: false,
        TOKEN: null,
      });
    case 'REGISTER':
      return (state = {
        isLoading: false,
        TOKEN: action.TOKEN,
      });
    default:
      return state;
  }
};

export default loginToken;
