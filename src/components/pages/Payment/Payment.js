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
      <div className="breadcrumbDiv">
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
      </div>

      <div className="payment">
        <h1>Bitcoin Cash</h1>
        <br />

        <div className="payment-links">
          <h3>Bitcoin Cash Merchants</h3>
          <hr />

          <a className="btn btn-lg btn-block btn-primary" href="/add-merchant">
            Become One
          </a>
          <br />

          <a href="/map" className="btn btn-lg btn-block btn-default">
            Map
          </a>
          <br />
          <br />

          <h3>Individuals</h3>
          <hr />

          <a href="/agentpurchase" className="btn btn-lg btn-block btn-default">
            <div
              style={{
                marginBottom: "-10px",
                fontSize: "20px",
              }}
            >
              Buy Cracker Barrel in BCH
            </div>
            <small
              className="form-text text-muted"
              style={{ fontSize: "12px" }}
            >
              Will need camera access to scan QR code
            </small>
          </a>
          <br />

          <a className="btn btn-lg btn-block btn-primary" href="/pay">
            Donate
          </a>
          <br />

          {/* Create a bitcoin wallet */}
          <a
            className="btn btn-lg btn-block btn-default"
            style={{ fontSize: "18px" }}
            href="/wallet"
          >
            Get Started / Create a Bitcoin Wallet
          </a>
          <br />

          {/* a third party service for holding your money stable in dollars */}
          {/* https://app.bchbull.com/ */}
          <a
            href="https://app.bchbull.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-primary"
            style={{ fontSize: "18px" }}
          >
            Stabilize your crypto's value in dollars
          </a>

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
