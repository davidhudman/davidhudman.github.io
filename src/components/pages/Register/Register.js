import React from "react"; // Fragment
import {
    Link,
  } from "react-router-dom";

import "./register.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
    return (
        <div className="register">
          <h1>Register</h1>
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
              Create Account
            </button>

            <br />
            <button className="btn btn-lg btn-block btn-default">
              <Link to="/login">Already Have An Account</Link>
            </button>

          </div>


        </div>
      );
}

export default Register;