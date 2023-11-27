import axios, { CanceledError } from "axios";
// action - state management
import * as actionTypes from "../actions";
import { jwtDecode } from "jwt-decode";

const Roles = ["admin", "tester"];

export const logoutUser = () => async (dispatch) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const jwtToken = localStorage.getItem("jwt_token");
  try {
    await axios.post(
      "/api/v1/accounts/revoke-token",
      {
        refreshToken
      },
      {
        withCredentials: true,
        headers: {
          "X-CSRF-Token": localStorage.getItem("csrfToken"),
          Authorization: "Bearer " + jwtToken
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
  dispatch({
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      jwtToken: null,
      refreshToken: null,
      user: null,
      success: false
    }
  });
  localStorage.clear();
};

export const loginWithEmailAndPassword =
  ({ email, password }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.LOGIN_LOADING
    });
    const payload = {
      id: "1700822075245",
      refreshToken: "db08dc1b3ee1670a188f2f0214c3259c",
      jwtToken:
        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDA5Mjk2NTcsImlkIjoxNzAwODIyMDc1MjQ1LCJuYW1lIjoiQWRtaW5zdHJhdG9yIiwiZW1haWwiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiJ9.1m6oRqcNNq70GfNiSdcK03OY5G26dhUoIl_V20S6qIkyVasibFvk5K5UFnpWcETs6dkKSyco-O3XsFI7Ff6cEg",
      user: {
        exp: 1700929657,
        id: 1700822075245,
        name: "Adminstrator",
        email: "sapadmin@rakuten.com",
        role: "sysadmin"
      }
    };

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload
    });
    /*
  axios
         .post(
           "/api/v1/accounts/authenticate",
           {
             email,
             password
           },
           {
             withCredentials: true,
             headers: {
               "Access-Control-Allow-Origin": "*",
               "Content-Type": "application/json"
             }
           }
         )
         .then((res) => {
           if (res.status === 200) {
             const user = jwtDecode(res.data.jwtToken);
             if (user instanceof CanceledError) {
               return dispatch({
                 type: actionTypes.LOGIN_ERROR,
                 payload: "Request Timeout"
               });
             } else if (user.role && Roles.includes(user.role)) {
               return dispatch({
                 type: actionTypes.LOGIN_SUCCESS,
                 payload: {
                   user,
                   ...res.data
                 }
               });
             } else {
               return dispatch({
                 type: actionTypes.LOGIN_ERROR,
                 payload: "Unauthorized Access"
               });
             }
           } else {
             dispatch({
               type: actionTypes.LOGIN_ERROR,
               payload: res.data.error
             });
           }
         })
         .catch((e) =>
           dispatch({
             type: actionTypes.LOGIN_ERROR,
             payload: e.message
           })
         );
      */
  };

export function forgotPassword(body) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOGIN_LOADING
    });

    axios
      .post("/api/v1/accounts/forgot-password", body)
      .then((res) => {
        if (res?.data) {
          dispatch({
            type: actionTypes.RESET_PASSWORD,
            payload: res.data
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.RESET_PASSWORD_ERROR,
          payload: error.response.data
        });
      });
  };
}

export function resetPassword(body) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOGIN_LOADING
    });

    axios
      .post("/api/v1/accounts/reset-password", body)
      .then((res) => {
        if (res?.data) {
          dispatch({
            type: actionTypes.RESET_NEW_PASSWORD,
            payload: res.data
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.RESET_NEW_PASSWORD_ERROR,
          payload: error.response.data
        });
      });
  };
}

export function changePassword(body) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOGIN_LOADING
    });

    axios
      .post("/api/v1/accounts/change-password", body)
      .then((res) => {
        if (res?.data) {
          dispatch({
            type: actionTypes.CHANGE_PASSWORD,
            payload: res.data
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.CHANGE_PASSWORD_ERROR,
          payload: error.response.data
        });
      });
  };
}

export function otpVerification(body) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOGIN_LOADING
    });

    axios
      .post("/api/v1/accounts/validate-reset-token", body)
      .then((res) => {
        if (res?.data)
          if (res.status === 200) {
            dispatch({
              type: actionTypes.OTP_VERIFY_EMAIL,
              payload: res.data
            });
          } else {
            dispatch({
              type: actionTypes.OTP_VERIFY_EMAIL_ERROR,
              payload: res.data
            });
          }
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.OTP_VERIFY_EMAIL_ERROR,
          payload: error.response.data
        });
      });
  };
}
