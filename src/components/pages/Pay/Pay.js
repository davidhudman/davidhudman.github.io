import React from "react"; // Fragment
import { Link } from "react-router-dom";

import "./pay.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Pay = () => {
  return (
    <div className="pay">
      {/* breadcrumb links to higher pages */}
      <nav aria-label="breadcrumb" style={{ width: "100%", textAlign: "left" }}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/bitcoin">Bitcoin Cash</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Donate or Pay
          </li>
        </ol>
      </nav>
      <h1>Payment Methods</h1>
      <a
        href="/paybch"
        className="btn btn-lg btn-block btn-default"
        style={{ fontSize: "18px" }}
      >
        Bitcoin Cash (BCH)
      </a>
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
};

export default Pay;
