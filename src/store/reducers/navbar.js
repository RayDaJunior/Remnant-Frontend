import {ActionSheetIOS} from 'react-native';

const initial = {
  pageno: 1,
};

const pageno = (state = initial, action) => {
  switch (action.type) {
    case 'UPDATE_PAGE':
      return (state = {
        pageno: action.payload,
      });
    default:
      return state;
  }
};

export default pageno;
