import React from "react"; // Fragment
import { Link, useNavigate } from "react-router-dom";

import "./pay.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Pay = () => {
  const navigate = useNavigate();
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
      <button
        onClick={() => navigate("/paybch")}
        className="btn btn-lg btn-block btn-default"
        style={{
          fontSize: "24px",
          backgroundColor: "#048c2c",
          color: "white",
          marginTop: "15px",
        }}
      >
        Bitcoin Cash (BCH)
      </button>
      <button
        onClick={() =>
          window.open(`https://www.venmo.com/davidhudman/`, "_blank")
        }
        className="btn btn-lg btn-block"
        style={{
          fontSize: "24px",
          backgroundColor: "#008CFF",
          color: "white",
          marginTop: "15px",
        }}
      >
        Venmo - @davidhudman
      </button>
      {/* cash app */}
      <button
        onClick={() => window.open(`https://cash.app/$payhudman`, "_blank")}
        className="btn btn-lg btn-block"
        style={{
          fontSize: "24px",
          backgroundColor: "#048c2c",
          color: "white",
          marginTop: "15px",
        }}
      >
        CashApp - $payhudman
      </button>
    </div>
  );
};

export default Pay;
