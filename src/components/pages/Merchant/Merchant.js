import React, { useState, useEffect } from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
  useParams,
} from "react-router-dom";
import QRCode from "react-qr-code";

import "./merchant.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Merchant() {
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);
  const [showPayButton, setShowPayButton] = useState(false);
  const [forWhat, setForWhat] = useState("");
  const { merchantId } = useParams();
  const [showPrintQr, setShowPrintQr] = useState(false);
  const [hasPromptCashPublicToken, setHasPromptCashPublicToken] =
    useState(false);
  const [promptCashPublicToken, setPromptCashPublicToken] = useState("");
  const [merchantData, setMerchantData] = useState({});

  // GET the merchant's data from the server
  const getMerchantData = async () => {
    const response = await fetch(
      `https://j8tmnngcj5.execute-api.us-east-1.amazonaws.com/default/bchMerchant01?merchantId=${merchantId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setMerchantData(data);
  };

  // GET the merchant's data from the server
  useEffect(() => {
    getMerchantData();
  }, [merchantId]);

  const changeInvoiceAmount = (e) => {
    if (isNaN(e.target.value) || e.target.value <= 0) {
      // show error message
      setShowPayButton(false);
    } else {
      setInvoiceAmount(e.target.value);
      setShowPayButton(true);
    }
  };

  const changeTipAmount = (e) => {
    if (isNaN(e.target.value) || e.target.value < 0) {
      // show error message
    } else {
      setTipAmount(e.target.value);
      document.getElementById("tipAmount").value = parseFloat(
        e.target.value
      ).toFixed(2);
    }
  };

  const getTotalAmount = () => {
    if (isNaN(tipAmount) || tipAmount < 0) {
      return parseFloat(invoiceAmount).toFixed(2);
    } else {
      return (parseFloat(invoiceAmount) + parseFloat(tipAmount)).toFixed(2);
    }
  };

  const showHideTipSection = (e) => {
    if (document.getElementById("tipSection").style.display === "block") {
      document.getElementById("tipSection").style.display = "none";
    } else {
      document.getElementById("tipSection").style.display = "block";
    }
  };

  const getShowHideTipButton = () => {
    return (
      <button className="btn btn-block" onClick={showHideTipSection}>
        <div className="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-caret-down"
            viewBox="0 0 16 16"
          >
            <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
          </svg>
        </div>
        <div className="btn">
          <label className="lb-lg" style={{ fontSize: "24px" }}>
            Tip
          </label>
        </div>
        <div className="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-caret-down"
            viewBox="0 0 16 16"
          >
            <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
          </svg>
        </div>
      </button>
    );
  };

  const getPrintQrPage = () => {
    return (
      <div className="Merchant">
        {/* Title */}
        <h1>Crypto Merchant: {merchantId}</h1>
        <br />

        {/* link to payment page */}
        <div>
          <br />
          <div className="btn-group btn-block">
            <button
              className="btn btn-block btn-sm btn-info"
              onClick={() => setShowPrintQr(false)}
              style={{ fontSize: "12px" }}
            >
              Show Payment Page
            </button>
          </div>
          <br />
          <br />
        </div>

        {merchantData.promptCashPublicToken &&
        merchantData.promptCashPublicToken.length > 6 ? null : (
          <div>
            <h1 style={{ color: "red" }}>
              Payments will be available within 72 hours of processing
            </h1>
            <p>
              To speed up this process, sign up for a free{" "}
              <a href="prompt.cash">prompt.cash</a>, and go to their prompt.cash
              Dashboard Page for your account, go to the Account Page, and copy
              your prompt.cash "public token" found near the bottom of the page.
              It's roughly 10-15 characters long and looks similar to this
              "608-eiDIZuKh". Once copied, you can sign up here again and
              provide us with your prompt.cash public token for immmediate
              access to payments. Otherwise, we can do it for you and it may
              take up to 3 days.
            </p>
            <br />
            <br />
          </div>
        )}

        {/* QR Code */}
        <div className="qr-code">
          {/* full link text */}
          <div className="qr-code-text">
            <label className="lb-lg" style={{ fontSize: "24px" }}>
              davidhudman.com/merchant/{merchantId}
            </label>
          </div>
          <QRCode value={"/merchant/" + merchantId} />
        </div>

        {/* Instructions */}
        <h2>Instructions</h2>
        <div className="instructions">
          <p>
            1. <b>STAFF</b>: scan this QR code with your phone.
          </p>

          <p>
            2. <b>STAFF</b>: on the webpage, enter the amount of crypto owed by
            the customer. They can also enter a tip amount.
          </p>

          <p>
            3. <b>STAFF</b>: A new barcode will be generated for payment to show
            to the customer. Please leave your phone on this screen while the
            customer scans it with their crypto wallet app and confirms payment.
          </p>

          <p>
            4. <b>CUSTOMER</b>: confirm/send the amount of crypto requested
          </p>

          <p>
            5. <b>STAFF</b>: look for the green checkmark on your screen after
            the customer pays
          </p>
        </div>
      </div>
    );
  };

  const getMerchantPage = () => {
    // useEffect(() => {
    //   const getMerchant = async () => {
    //     const merchantFromServer = await fetchMerchant(merchantId);
    //     setMerchant(merchantFromServer);
    //   };
    // }, []);
    return (
      <div className="Merchant">
        {/* Title */}
        <h1>Pay Merchant: {merchantData.merchantName}</h1>
        <br />

        {/* link to print merchant page */}
        <div>
          <br />
          <div className="btn-group btn-block">
            <button
              className="btn btn-block btn-sm btn-info"
              onClick={() => setShowPrintQr(true)}
              style={{ fontSize: "12px" }}
            >
              Managers: Click for Printable Merchant Display Page
            </button>
          </div>
          <br />
          <br />
        </div>

        {/* Amount owed input */}
        <div className="form-group input-group-lg">
          <input
            type="number"
            onChange={(e) => changeInvoiceAmount(e)}
            placeholder="Enter amount owed"
            className="form-control text-center"
            style={{ fontSize: "24px" }}
          />
        </div>

        {/* Show / Hide Tip Button */}
        {getShowHideTipButton()}

        {/* Tip Button Section */}
        <br />
        <div id="tipSection" style={{ display: "none" }}>
          <div className="btn-group btn-group-justified" role="group">
            {[0, 0.15, 0.18, 0.2, 0.25].map((num, i) => {
              return (
                <div className="btn-group" role="group" key={i}>
                  <button
                    className="btn btn-default btn-lg"
                    onClick={(e) => changeTipAmount(e)}
                    value={parseFloat(invoiceAmount) * num}
                  >
                    {num * 100}%
                  </button>
                </div>
              );
            })}
          </div>
          <br />

          {/* Tip Input Section */}
          <div className="form-group input-group-lg">
            <input
              id="tipAmount"
              type="number"
              onChange={(e) => changeTipAmount(e)}
              className="form-control text-center"
              placeholder="Or enter custom tip (USD)"
            />
          </div>
          <br />
          <br />
        </div>

        {/* Description Input Section */}
        <div className="form-group input-group-lg">
          <label
            className="lb-lg"
            htmlFor="whatForInput"
            style={{ fontSize: "24px" }}
          >
            Description: &nbsp;
          </label>
          <br />
          <input
            id="whatForInput"
            type="text"
            onChange={(e) => setForWhat(e.target.value)}
            placeholder="order number, pizza, etc"
            className="form-control text-center"
            style={{ fontSize: "24px" }}
          />
        </div>
        <br />

        {/* Total Amuont Section */}
        {/* <br />
      <h4>Total amount: ${getTotalAmount()}</h4>
      <br /> */}

        {/* Pay Button Section */}
        {merchantData.promptCashPublicToken &&
        merchantData.promptCashPublicToken.length > 6 ? (
          <form
            name="prompt-cash-form"
            action="https://prompt.cash/pay"
            method="get"
          >
            <input
              type="hidden"
              name="token"
              value={merchantData.promptCashPublicToken}
            />
            <input type="hidden" name="tx_id" value={Date.now()} />
            <input type="hidden" name="amount" value={getTotalAmount()} />
            <input type="hidden" name="currency" value="USD" />
            <input type="hidden" name="desc" value={forWhat} />
            {/* <input type="hidden" name="return" value="http://pay.flylert.com" /> */}
            {/* <input
            type="hidden"
            name="callback"
            value="http://your-store.com/api/v1/update-payment"
          /> */}
            <button
              type="submit"
              className={
                showPayButton
                  ? "btn btn-block btn-lg btn-success payBtn"
                  : "btn btn-block btn-lg btn-warning payBtn"
              }
              disabled={!showPayButton}
              style={{ fontSize: "36px" }}
            >
              Pay ${getTotalAmount()}
            </button>
          </form>
        ) : (
          <div>
            <h3 style={{ color: "red", fontWeight: "bold" }}>
              Missing Prompt Cash Public Token
            </h3>
            <p>
              Payments will be disabled until the prompt cash token is added.
            </p>
            <p>
              If you provided your xpub without a prompt cash public token, this
              is normal. It will be added manually by our team within 72 hours.
            </p>
          </div>
        )}
      </div>
    );
  };

  return showPrintQr ? getPrintQrPage() : getMerchantPage();
}
