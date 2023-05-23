import React from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
} from "react-router-dom";

import "./payment.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Payment = () => {
  return (
    <div className="outer-payment-container">
      {/* breadcrumb links to higher pages */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Bitcoin Cash
          </li>
        </ol>
      </nav>

      <div className="payment">
        <h1>Bitcoin Cash</h1>
        <br />

        <div className="payment-links">
          <h3>Bitcoin Cash Merchants</h3>
          <hr />

          <button className="btn btn-lg btn-block btn-primary">
            <Link to="/add-merchant">Become One</Link>
          </button>
          <br />

          <button className="btn btn-lg btn-block btn-default">
            <Link to="/map">Map</Link>
          </button>
          <br />
          <br />

          <h3>Individuals</h3>
          <hr />

          <button className="btn btn-lg btn-block btn-default">
            <Link to="/agentpurchase">Buy stuff in BCH</Link>
            <div
              style={{
                marginTop: "-10px",
              }}
            ></div>
            <small
              className="form-text text-muted"
              style={{ fontSize: "12px" }}
            >
              At places like Cracker Barrel
            </small>
          </button>
          <br />

          <button className="btn btn-lg btn-block btn-primary">
            <Link to="/pay">Donate</Link>
          </button>
          <br />

          {/* Create a bitcoin wallet */}
          <button
            className="btn btn-lg btn-block btn-default"
            style={{ fontSize: "18px" }}
          >
            <Link to="/wallet">Get Started / Create a Bitcoin Wallet</Link>
          </button>
          <br />

          <br />
        </div>

        {/* footer */}
        <div className="footer">
          <p>&copy; {new Date().getFullYear()} David Hudman</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
