import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authFail = err => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};

export const authLogout = () => {
  localStorage.removeItem('idToken');
  localStorage.removeItem('expiresIn');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authCheckTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};
export const authStore = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBQ8kYSvDtI6IXtJJ3fTGhKUZtEvjg5irY';
    if (!isSignup) {
      url =
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBQ8kYSvDtI6IXtJJ3fTGhKUZtEvjg5irY';
    }
    axios
      .post(url, authData)
      .then(res => {
        const expiresionDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem('idToken', res.data.idToken);
        localStorage.setItem('expiresIn', expiresionDate);
        localStorage.setItem('userId', res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(authCheckTimeout(res.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('idToken');
    if (!token) {
      // dispatch(authLogout());
    } else {
      const expiresionDate = new Date(localStorage.getItem('expiresIn'));
      if (expiresionDate >= new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(
          authCheckTimeout(
            (expiresionDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        // dispatch(authLogout());
      }
    }
  };
};
