import * as actionType from '../constants/actionTypes';
// store the data in the reducer

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      // create a local storage for jwt
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      // return the state and populate the state with the auth object
      return { ...state, authData: action.data, loading: false, errors: null };
      // logging out
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;
