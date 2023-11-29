import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoRenderer from "./layout/LogoRenderer";
import { loginWithEmailAndPassword } from "../../redux/actions/LoginActions";
import * as actionTypes from "../../redux/actions";
import isEmpty from "lodash/isEmpty";
import WebContext from "../context/WebContext";
import RoundedIconButton from "../utilities/RoundedIconButton";
import Tooltip from "../utilities/Tooltip";
import SvgIconRenderer from "../utilities/SvgIconRenderer";
import EyeIcon from "../../assets/svgIcons/eye.svg";
import EyeSlashIcon from "../../assets/svgIcons/eye-slash.svg";

export function SignInPage({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, error, loading } = useSelector((state) => state.login);
  const { organization, copyrightYear, name, description, page } = product;
  const { version } = useContext(WebContext);

  useEffect(() => {
    document.title = `${name} - ${description}`;
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (!isEmpty(error)) {
      setTimeout(
        () =>
          dispatch({
            type: actionTypes.LOGIN_ERROR,
            payload: ""
          }),
        5000
      );
    } else if (success) {
      navigate(`/${page.base}/${page.landingPage}`, { replace: true });
    }
  }, [success, error, navigate]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        onSubmit();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const [formdata, setformdata] = useState({ email: "admin", password: "S3cret" });

  const { email, password } = formdata;
  const [show, setshow] = useState(false);
  const pass = useRef();
  const change = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const onSubmit = useCallback(() => dispatch(loginWithEmailAndPassword(formdata)), [formdata, dispatch]);

  const showpassword = () => {
    setshow(!show);
    pass.current.type = show ? "password" : "text";
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div
      className="flex bg-cover bg-center h-screen w-full select-none"
      style={{ backgroundImage: "url('/assets/img/bg.jpg')", backgroundColor: "#001A38" }}
    >
      <div className="flex w-1/2 h-screen items-center justify-end">
        <div className="max-w-sm transform duration-[300ms] hover:scale-110 cursor-pointer items-center justify-center">
          <div className="flex flex-col justify-center items-center space-y-5">
            <LogoRenderer className="h-36 w-36" />
            <div className="flex flex-col space-y-2 items-center">
              <div className="cursor-pointer text-5xl text-slate-50 tracking-normal font-semibold">{name}</div>
              <div className="cursor-pointer text-2xl text-slate-200 tracking-tighter font-semibold">{description}</div>
              <div className="cursor-pointer text-lg text-slate-200 tracking-tighter font-semibold">{`version: ${product.version}`}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/2 h-screen items-center justify-center">
        <div
          className="py-4 px-10 max-w-7xl items-center justify-center backdrop-blur-sm bg-white/10 p-5 rounded shadow-md"
          style={{ border: "1.5px solid #475569" }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-3xl text-white font-display font-semibold text-left xl:text-3xl xl:text-bold">Sign In</h2>
          </div>
          <div className="mt-8 w-60 text-white">
            <label htmlFor="username" className="placeholder-white block mt-2 text-sm font-medium">
              Username/e-mail
            </label>
            <input
              id="#/properties/username"
              className="block h-9 w-full rounded-md mt-2 text-sm font-light bg-color-0900/10 backdrop-blur-sm"
              type="email"
              value={email}
              placeholder="Enter Username/Email"
              name="email"
              onChange={change}
            />
            <label className="placeholder-white block mt-5 text-sm font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="#/properties/password"
                ref={pass}
                className="block h-9 z-10 w-full rounded-md mt-2 text-sm font-light bg-color-0900/10 backdrop-blur-sm"
                type="password"
                placeholder="Enter Password"
                value={password}
                name="password"
                onChange={change}
              />
              <div className="absolute z-20" style={{ top: "25%", right: "5%", color: "#719dcc" }}>
                <SvgIconRenderer handleClick={showpassword} size="w-5">
                  {show ? <EyeIcon /> : <EyeSlashIcon />}
                </SvgIconRenderer>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-center">
              <button
                id="signin-btn"
                type="submit"
                onClick={onSubmit}
                className={`${
                  loading ? "cursor-not-allowed" : "cursor-pointer"
                } w-full text-center inline-flex items-center justify-center p-2 text-base font-semibold font-display leading-6 text-white transition duration-150 ease-in-out rounded bg-gradient-to-b from-color-0500 to-color-0700 hover:from-color-0400 hover:to-color-0700 shadow-lg`}
              >
                {loading && (
                  <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                {loading ? "Loading..." : "Sign In"}
              </button>
            </div>
            <p className="mt-2 h-6 text-red-500 w-full text-center">{error}</p>
          </div>
        </div>
        <div
          id="copy-right"
          build-number={version?.buildNumber}
          className="absolute bottom-0 cursor-pointer text-sm text-slate-400 tracking-tighter mb-2"
        >
          &copy;
          {`Copyright ${copyrightYear} ${organization.name} | All rights reserved ${
            version?.buildNumber > 0 ? "| Build Number : " + version?.buildNumber : ""
          }`}
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
