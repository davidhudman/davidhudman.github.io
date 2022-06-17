import React from "react"; // Fragment
import {
    Link,
  } from "react-router-dom";



import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    return (
        <div className="login">
          <h1>Login</h1>
          {/* email and password input */}
          <div className="login-input">
            <input

              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              id="email"
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              id="password"
            />
            <br />
            <button className="btn btn-lg btn-block btn-primary">
              Login
            </button>

            <br />
            <button className="btn btn-lg btn-block btn-default">
              <Link to="/register">Register</Link>
            </button>

          </div>


        </div>
      );
}

export default Login;