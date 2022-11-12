import React, { useState } from "react"; // Fragment
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import QRCode from "react-qr-code";

import "./addmerchant.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AddMerchant = () => {
  const [showQrCode, setShowQrCode] = useState(false);
  const [merchantName, setMerchantName] = useState("");
  const navigate = useNavigate();

  const onFormSubmit = (e) => {
    e.preventDefault();

    // TODO: save form data
    console.log("form pretend submitted");

    // don't show QR code

    // link user to merchant page
    navigate("/merchant/" + merchantName);
  };

  return (
    <div className="outer-addmerchant-container">
      <div className="addmerchant">
        <div className="header">
          <h1>Add Bitcoin Cash Merchant</h1>
        </div>

        <div className="addmerchant-form">
          <div className="form-group input-group-lg">
            <br />
            <label className="merchantSignupLabels">Enter merchant name:</label>
            <input
              type="text"
              placeholder="merchant name"
              className="form-control text-center"
              style={{ fontSize: "18px" }}
              onChange={(e) => setMerchantName(e.target.value)}
            />
            <br />

            {/* merchant xpub */}
            <label className="merchantSignupLabels">
              Enter BCH wallet identifying public key (xpub) for this merchant:
            </label>
            <input
              type="text"
              placeholder="merchant xpub"
              className="form-control text-center"
              style={{ fontSize: "18px" }}
            />
            <br />
            <br />

            {/* merchant prompt.cash public token */}
            <label className="merchantSignupLabels">
              (Optional) to speed up this process, sign up for a free{" "}
              <a href="prompt.cash">prompt.cash</a>, and go to their prompt.cash
              settings page for your account, and copy your prompt.cash public
              token. Once copied, you can paste your prompt.cash public token in
              the box below for immmediate access to payments. Otherwise, we can
              do it for you and it may take up to 3 days.
              <br />
              <br />
              (Optional) PROMPT.CASH Public Token
            </label>
            <input
              type="text"
              placeholder="Prompt.Cash public token"
              className="form-control text-center"
              style={{ fontSize: "18px" }}
            />
            <br />
            <br />

            {/* merchant location */}
            <label className="merchantSignupLabels">
              (Optional) enter merchant address or GPS coordinates and we'll add
              you to our map if you want customers to find you.
            </label>
            <input
              type="text"
              placeholder="merchant location"
              className="form-control text-center"
              style={{ fontSize: "18px" }}
            />
            <br />

            {/* merchant email */}
            <label className="merchantSignupLabels">
              (Optional) Enter email, in case we can't find your business
            </label>
            <input
              type="text"
              placeholder="merchant email"
              className="form-control text-center"
              style={{ fontSize: "18px" }}
            />
          </div>
          <br />
          <br />

          {showQrCode ? (
            <div>
              <div className="qr-code">
                <QRCode value={"/merchant/" + merchantName} />
              </div>
              {/* go to merchant page */}
              <div className="go-to-merchant-page">
                <Link to={"/merchant/" + merchantName}>
                  <button className="btn btn-primary btn-lg">
                    Click here or scan QR <br />
                    for merchant page
                  </button>
                </Link>
              </div>
              <br />
              <br />
              <br />
              {/* Link to page to print QR and instructions */}
              <div className="print-qr">
                <Link to={"/printqr/" + merchantName}>
                  <button className="btn btn-success btn-lg">
                    Click here to print QR code <br /> and instructions
                  </button>
                </Link>
              </div>
              <br />
            </div>
          ) : null}

          <button
            onClick={(e) => onFormSubmit(e)}
            className="btn btn-lg btn-block btn-primary"
          >
            Submit
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

export default AddMerchant;
