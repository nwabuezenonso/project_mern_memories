import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

// dispatch function for sending data
export const signin = (formData, router) => async (dispatch) => {
  try {
    // get the data from the signin and dispatch
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

// export the function for data 
export const signup = (formData, router) => async (dispatch) => {
  try {
    // get the data from the signup and dispatch it
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};
