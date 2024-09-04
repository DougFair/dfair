import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import {Audio} from "react-loader-spinner";
import {AuthContext} from "../pages/AuthContext";
import "./auth.css";
import { useNavigate } from "react-router-dom";

const AuthLogin = () => {
  const { auth, setAuth } = useContext(AuthContext);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(auth.token);;


  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const user = { email, password };
   axios
   .post("/api/login", {email, password})
   .then(response =>{
    setAuth({token: response.data.token, userId: response.data.userId})
   setLoggedIn(true)
  })
};



  useEffect(() => {
    if (auth.token) {
      axios
        .post("/tokenIsValid", null, { headers: { "x-auth-token": token } })
        .then((response) => {
          if (response.data) {
            setLoading(false);
          } else {
            alert(
              "Your previous session has expired - you will need to login again"
            );
            setLoading(false);
          }
        });
    } else {
      setLoading(false);
    }
  }, []);

 
  let pageDisplay = "";
  if (loading) {
    pageDisplay = (
      <div className="loaderContainer">
  <Audio
  height="80"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
        <h1 className="loaderLabel">Loading Data...</h1>
      </div>
    );
  } else if (!loggedIn) {
    pageDisplay = (
      <>
        <form onSubmit={handleSubmit} className="authForm">
          <h4 className="formHeading">LOGIN</h4>
          <div className="labelField">
            <label htmlFor="username" className="loginFormLabel">
              Email
            </label>
            <input
              type="email"
              onChange={(evt) => setEmail(evt.target.value)}
              name="username"
              value={email}
              className="loginForm"
              placeholder="Enter email address"
            />
          </div>

          <div className="labelField">
            <label htmlFor="password" className="loginFormLabel">
              Password
            </label>
            <input
              type="password"
              onChange={(evt) => setPassword(evt.target.value)}
              name="password"
              value={password}
              className="loginForm"
              placeholder="Enter password"
            />
          </div>
÷

          <button type="submit" className="loginFormButton">
            Login
          </button>
          {/* <a
            href="https://pip.onjcri.org.au/forgotPasswordSendLink"
            className="forgotPasswordLink"
          >
            Forgot Password?
          </a> */}
        </form>
      </>
    );
  } else if (loggedIn ) {
navigate("/")
  }

  return (
    <div className="authFormContainer">

      {pageDisplay}
    </div>
  );
};

export default AuthLogin;
