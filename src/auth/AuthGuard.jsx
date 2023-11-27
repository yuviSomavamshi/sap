import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../redux/actions";

axios.defaults.withCredentials = true;

const tokens = {};

function AuthGuard({ product, children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { jwtToken: token } = useSelector((state) => state.login);

  const [authenticated, setAuthenticated] = useState(false);

  const redirectRoute = () => {
    if (authenticated) {
      navigate(location?.pathname, { redirectUrl: location?.pathname });
    }
  };

  const redirectToLogin = () => {
    localStorage.clear();
    navigate(`/${product?.page.base}/login`, { replace: true });
  };

  const updateRequestInterceptor = () => {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("jwt_token");
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
          config.headers["X-CSRF-Token"] = localStorage.getItem("csrfToken");
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  };

  const cancelRequest = (originalRequest) => {
    console.log("Cancelling requests");
    const controller = new AbortController();
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    originalRequest.cancelToken = source.token;
    originalRequest.signal = controller.signal;
    source.cancel("Operation canceled by the user.");
    redirectToLogin();
  };

  useEffect(() => {
    dispatch({
      type: actionTypes.LOGIN_TOKEN,
      payload: {
        jwtToken: localStorage.getItem("jwt_token")
      }
    });

    updateRequestInterceptor();
  }, []);

  useEffect(() => {
    if (token) {
      updateRequestInterceptor();
      axios.interceptors.response.use(
        (response) => response,
        (error) => {
          const originalRequest = error.config;
          if (!localStorage.getItem("jwt_token")) {
            return cancelRequest(originalRequest);
          }
          // Prevent infinite loops
          if (error.response && error.response.status === 401 && originalRequest.url === "/api/v1/accounts/refresh-token") {
            //alert("Your Session Has Expired, Please Login again");
            console.log("Refresh token not available.");
            redirectToLogin();
            return Promise.reject(error);
          }

          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken && error.response?.status === 401) {
            console.log("Calling Refresh token:", refreshToken);
            return axios
              .post(
                "/api/v1/accounts/refresh-token",
                {
                  refreshToken: localStorage.getItem("refreshToken")
                },
                {
                  withCredentials: true,
                  headers: {
                    "X-CSRF-Token": localStorage.getItem("csrfToken"),
                    Authorization: "Bearer " + localStorage.getItem("jwt_token")
                  }
                }
              )
              .then((response) => {
                if (tokens[refreshToken] || response.status == 200) {
                  if (!tokens[refreshToken]) {
                    tokens[refreshToken] = {
                      ...response.data,
                      ...jwtDecode(response.data)
                    };
                  }

                  localStorage.setItem("jwt_token", payload.jwtToken);
                  localStorage.setItem("refreshToken", payload.refreshToken);
                  localStorage.setItem("csrfToken", payload.csrfToken);

                  updateRequestInterceptor();

                  dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    payload: tokens[refreshToken]
                  });

                  originalRequest.headers["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
                  originalRequest.headers["X-CSRF-Token"] = localStorage.getItem("csrfToken");
                  return axios(originalRequest);
                } else {
                  cancelRequest(originalRequest);
                  return Promise.reject();
                }
              })
              .catch((e) => console.error(e));
          } else if (error.response?.status === 403) {
            cancelRequest(originalRequest);
          }
          return Promise.reject(error);
        }
      );
      setAuthenticated(true);
      redirectRoute();
    } else {
      delete axios.defaults.headers.common["Authorization"];
      delete axios.defaults.headers.common["X-CSRF-Token"];
      axios.interceptors.request.use(
        (config) => {
          delete config.headers["Authorization"];
          delete config.headers["X-CSRF-Token"];
          return config;
        },
        (error) => {
          Promise.reject(error);
        }
      );

      setAuthenticated(false);
      redirectToLogin();
    }
  }, [token]);

  return <Fragment>{children}</Fragment>;
}

export default AuthGuard;
