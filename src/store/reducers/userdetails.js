const initial = {
    user: null
};
  
  const userDetails = (state = initial, action) => {
    switch (action.type) {
      case 'UPDATE_USER':
        return (state = {
          user: action.payload,
        });
      default:
        return state;
    }
  };
  
  export default userDetails;