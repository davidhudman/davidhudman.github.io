import React from "react"; // Fragment
import {
    Link,
  } from "react-router-dom";



import "./pay.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Pay = () => {
    return (
        <div className="pay">
          <h1>Payment Methods</h1>
          <button className="btn btn-lg btn-block btn-default">
            <Link to="/paybch">Crypto</Link>
          </button>
          <br />
          <a
            href="https://www.venmo.com/davidhudman/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-primary"
          >
            Venmo
          </a>
          <br /> 
          {/* cash app */}
            <a
            href="https://cash.app/$payhudman"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-default"
            >
            Cash App
            </a>
            <br />


        </div>
      );
}

export default Pay;