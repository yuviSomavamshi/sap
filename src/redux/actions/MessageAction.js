import * as actionTypes from "../actions";

export const Severity = {
  DANGER: "danger",
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning"
};

let timer;
export const closeMessage = () => (dispatch) => {
  if (timer) clearTimeout(timer);
  dispatch({
    type: actionTypes.TOGGLE_SNACKBAR_CLOSE,
    payload: {
      message: null,
      toggleSnackbar: false,
      snackbarMessage: null
    }
  });
};

export const showMessage = (severity, message) => (dispatch) => {
  if (timer) clearTimeout(timer);
  dispatch({
    type: actionTypes.TOGGLE_SNACKBAR_CLOSE,
    payload: {
      severity,
      message,
      toggleSnackbar: true
    }
  });

  timer = setTimeout(() => {
    dispatch(closeMessage());
  }, 3000);
};
