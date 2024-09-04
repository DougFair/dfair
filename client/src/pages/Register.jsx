import React, { useState } from "react";
import axios from 'axios'

import "./auth.css";

const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // const hash = window.location.search.slice(1)
  const handleSubmit = (evt) => {
   
    evt.preventDefault();

    if (password !== password2) {
      alert("Passwords don't match. Please re-enter");
      return;
    } else {
      const register = async () => {
    
        const user = { firstName, lastName, email, password };
        await axios
          .post("/api/registerUser", user)
          .then((response) => {
            console.log("backend" + JSON.stringify(response));
          })
          .catch((err) => {
            alert("There was an issue logging in - try again");
          });
      };
      register();
    }
  }

  let pageDisplay = "";

    pageDisplay = (
      <form onSubmit={handleSubmit} className="authForm">
      

        <div className="labelField">
          <label htmlFor="firstName" className="loginFormLabel">
            First Name
          </label>
          <input
            type="text"
            onChange={(evt) => setFirstName(evt.target.value)}
            name="firstName"
            value={firstName}
            className="loginForm"
            placeholder="Enter first name"
          />
        </div>

        <div className="labelField">
          <label htmlFor="lastName" className="loginFormLabel">
            Last Name
          </label>
          <input
            type="text"
            onChange={(evt) => setLastName(evt.target.value)}
            name="lastName"
            value={lastName}
            className="loginForm"
            placeholder="Enter last name"
          />
        </div>


        <div className="labelField">
          <label htmlFor="username" className="loginFormLabel">
            Email
          </label>
          <input
            type="email"
            onChange={(evt) => setEmail(evt.target.value.toLowerCase())}
            name="username"
            value={email}
            className="loginForm"
            placeholder="Enter email address"
          />
        </div>


        <div className="labelField">
          <label htmlFor="username" className="loginFormLabel">
            Email
          </label>
          <input
            type="email"
            onChange={(evt) => setEmail(evt.target.value.toLowerCase())}
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
        <div className="labelField">
          <label htmlFor="password" className="loginFormLabel">
            Password Repeat
          </label>
          <input
            type="password"
            onChange={(evt) => setPassword2(evt.target.value)}
            name="password2"
            value={password2}
            className="loginForm"
            placeholder="Enter password again"
          />
        </div>

        <button type="submit" className="loginFormButton">
          Register
        </button>
      </form>
    );
 

  return (
    <div className="authFormContainer">

      <h1 className="loginHeading2">Registration</h1>
      {pageDisplay}
    </div>
  );
};

export default Register
