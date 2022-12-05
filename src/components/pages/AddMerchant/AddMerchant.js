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
  const [xPub, setXPub] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [promptCashPublicToken, setPromptCashPublicToken] = useState("");
  const [merchantNameAvailable, setMerchantNameAvailable] = useState(null);
  const navigate = useNavigate();

  const getMerchantNameAvailableLabel = () => {
    return (
      <>
        {merchantNameAvailable === false && (
          <>
            {/* show red text if merchant name not available */}
            <div className="merchantNameNotAvailable">
              <p>Merchant name not available</p>
            </div>
          </>
        )}

        {merchantNameAvailable === true && (
          <>
            {/* show green text if merchant name is available */}
            <div className="merchantNameAvailable">
              <p>Merchant name available</p>
            </div>
          </>
        )}

        {merchantNameAvailable === null && (
          <>
            {/* placeholder */}
            <div>
              <p>&nbsp;</p>
            </div>
          </>
        )}
      </>
    );
  };

  const handleBlur = (e) => {
    // check if merchant name is available
    // make a GET request to see if merchantId exists
    const merchantNameNoSpaces = merchantName.replace(/[^a-zA-Z0-9]/g, "");
    // if merchant name is not blank
    if (merchantNameNoSpaces !== "") {
      fetch(
        `https://j8tmnngcj5.execute-api.us-east-1.amazonaws.com/default/bchMerchant01?merchantId=${merchantNameNoSpaces}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("finished GET request");
          console.log("data: ", data);
          console.log("data.id: ", data.id);
          console.log("data.version: ", data.version);
          if (data.merchantId === merchantNameNoSpaces) {
            console.log("merchant exists");
            setMerchantNameAvailable(false);
          }

          if (data.merchantId !== merchantNameNoSpaces) {
            console.log("merchant does not exist");
            setMerchantNameAvailable(true);
          }
        });
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    console.log("form submit start");

    // get current date and time in milliseconds
    const now = new Date().getTime();

    // remove spaces and special characters from merchant name
    const merchantNameNoSpaces = merchantName.replace(/[^a-zA-Z0-9]/g, "");

    let merchantId = merchantNameNoSpaces;
    if (merchantNameAvailable !== true) {
      // generate a unique unique merchant id
      merchantId = merchantNameNoSpaces + now + Math.floor(Math.random() * 100);
    }

    // log form data
    console.log("merchantName: ", merchantName);
    console.log("xPub: ", xPub);
    console.log("location: ", location);
    console.log("email: ", email);
    console.log("promptCashPublicToken: ", promptCashPublicToken);

    fetch(
      "https://j8tmnngcj5.execute-api.us-east-1.amazonaws.com/default/bchMerchant01",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merchantName,
          xPub,
          location,
          email,
          promptCashPublicToken,
          merchantId,
          merchantNameNoSpaces,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        console.log("data.id: ", data.id);
        console.log("data.version: ", data.version);
      });

    // link user to merchant page
    navigate("/merchant/" + merchantId);
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
              onBlur={(e) => handleBlur()}
            />
            {/* {getMerchantNameAvailableLabel()} */}
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
              onChange={(e) => setXPub(e.target.value)}
            />
            <br />
            <br />

            {/* merchant prompt.cash public token */}
            <label className="merchantSignupLabels">
              (Optional) to speed up this process, sign up for a free{" "}
              <a href="prompt.cash">prompt.cash</a>, and go to their prompt.cash
              Dashboard Page for your account, go to the Account Page, and copy
              your prompt.cash "public token" found near the bottom of the page.
              It's roughly 10-15 characters long and looks similar to this
              "608-eiDIZuKh". Once copied, you can paste your prompt.cash public
              token in the box below for immmediate access to payments.
              Otherwise, we can do it for you and it may take up to 3 days.
              <br />
              <br />
              (Optional) PROMPT.CASH Public Token
            </label>
            <input
              type="text"
              placeholder="Prompt.Cash public token"
              className="form-control text-center"
              style={{ fontSize: "18px" }}
              onChange={(e) => setPromptCashPublicToken(e.target.value)}
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
              onChange={(e) => setLocation(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
