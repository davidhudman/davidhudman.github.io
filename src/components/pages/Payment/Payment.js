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
      <div className="payment">
        <h1>Payment</h1>

        <div className="payment-links">
          <button className="btn btn-lg btn-block btn-default">
            <Link to="/pay">Donate / Pay Me</Link>
          </button>
          <br />

          <button className="btn btn-lg btn-block btn-primary">
            <Link to="/add-merchant">Create Merchant Page</Link>
          </button>
          <br />

          <button className="btn btn-lg btn-block btn-default">
            <Link to="/map">See Merchant Map</Link>
          </button>
          <br />

          <button className="btn btn-lg btn-block btn-primary">
            <Link to="/strawpurchase">Agent Purchase Merchants</Link>
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
