import React, { useState } from "react"; // Fragment
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
        <h1>BCH Merchant: {merchantId}</h1>
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

        {!hasPromptCashPublicToken ? (
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
        ) : null}

        {/* QR Code */}
        <div className="qr-code">
          <QRCode value={"/merchant/" + merchantId} />
        </div>

        {/* Instructions */}
        <div className="instructions">
          <h2>Instructions</h2>
          <p>1. Have staff members scan this QR code with their phone.</p>

          <p>
            2. They will be taken to a page where they can enter the amount of
            BCH owed by the customer. They can also enter a tip amount.
          </p>

          <p>
            3. A new barcode will be generated for payment. The employee should
            leave their phone on this screen while the customer scans it with
            their BCH wallet app and confirms payment.
          </p>

          <p>
            4. The customer will be asked to confirm the amount of BCH to be
            paid.
          </p>

          <p>
            5. After the customer confirms the payment, the merchant will see a
            green checkmark if they left their phone on the screen they asked
            the customer to scan.
          </p>
        </div>
      </div>
    );
  };

  const getMerchantPage = () => {
    return (
      <div className="Merchant">
        {/* Title */}
        <h1>Pay Merchant: {merchantId}</h1>
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
        <form
          name="prompt-cash-form"
          action="https://prompt.cash/pay"
          method="get"
        >
          <input type="hidden" name="token" value="608-eiDIZuKh" />
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
      </div>
    );
  };

  return showPrintQr ? getPrintQrPage() : getMerchantPage();
}
