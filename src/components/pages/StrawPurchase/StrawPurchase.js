import React, { useState, useEffect } from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
  useParams,
} from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

import "./strawpurchase.css";
import "bootstrap/dist/css/bootstrap.min.css";

const StrawPurchase = () => {
  const [whichTipPercentageChecked, setWhichTipPercentageChecked] =
    useState("option0");
  const [tipPercentage, setTipPercentage] = useState(0);
  const [isShowTip, setIsShowTip] = useState(true);
  const [tipCustomAmount, setTipCustomAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [formEnabled, setFormEnabled] = useState(true);
  const [showPromptCashPayButton, setShowPromptCashPayButton] = useState(false);
  const [showCustomTip, setShowCustomTip] = useState(true);
  const [showPercentageTip, setShowPercentageTip] = useState(false);
  const [email, setEmail] = useState("");
  const [qrCodeLink, setQrCodeLink] = useState("");
  const [refundAddress, setRefundAddress] = useState("");
  const [password, setPassword] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [customOrderId, setCustomOrderId] = useState(null);
  const [unlockParagraphClickCount, setUnlockParagraphClickCount] = useState(0);
  const [env, setEnv] = useState("production");
  const [invoiceError, setInvoiceError] = useState(null);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [cryptoPaymentStatus, setCryptoPaymentStatus] = useState(null);
  const [creditCardPaymentStatus, setCreditCardPaymentStatus] = useState(null);
  const [merchant, setMerchant] = useState("cracker barrel");
  const [viewStatusOfAnExistingOrder, setViewStatusOfAnExistingOrder] =
    useState(false);

  // useParams to get the id
  const { id } = useParams();

  // useEffect for id
  useEffect(() => {
    if (id && id.length > 0) {
      setFormEnabled(false);
      setPaymentStatus("loading");
      setCryptoPaymentStatus("loading");
      setCreditCardPaymentStatus("loading");
      console.log("StrawPurchase.js useEffect() id: ", id);
      // fetch the order from the prompt cash get-payment api
      fetch(
        `https://43o1h1vh40.execute-api.us-east-1.amazonaws.com/default/bchInvoice2?tx=${id}`,
        {
          method: "GET",
          // fix cors error
          // mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
            //   fix cors error
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
        .then((res) => {
          console.log("StrawPurchase.js useEffect() res: ", res);
          return res.json();
        })
        .then((data) => {
          console.log("StrawPurchase.js useEffect() data: ", data);
          // TODO: get the credit card and crypto payment status of the order - if pending, display the progress bar
          if (data.cryptoPaymentReceived) {
            setCryptoPaymentStatus(data.cryptoPaymentReceived);
          }
          if (data.creditCardPaymentStatus) {
            setCreditCardPaymentStatus(data.creditCardPaymentStatus);
          }
        })
        .catch((err) => {
          console.log("StrawPurchase.js useEffect() err: ", err);
        });
    }
  }, [id]);

  // useEffect for totalAmount
  useEffect(() => {
    // console.log("StrawPurchase.js id: ", id);
    console.log("totalAmount", totalAmount);
    // show prompt.cash QR code
    if (totalAmount > 0) {
      setShowPromptCashPayButton(true);
    }
    if (customOrderId) {
      setCustomOrderId(customOrderId);
    }
  }, [totalAmount, customOrderId]);

  const unlockParagraphClickHandler = (e) => {
    setUnlockParagraphClickCount(unlockParagraphClickCount + 1);
    if (unlockParagraphClickCount >= 3) {
      setFormEnabled(true);
    }
  };

  // setTimeout to update the progressBarValue by 1 every 300ms
  useEffect(() => {
    const interval = setInterval(() => {
      if (progressBarValue !== 99) {
        setProgressBarValue(progressBarValue + 1);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [progressBarValue]);

  const checkExistingOrderStatus = (e) => {
    e.preventDefault();
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setFormEnabled(false);
    setProgressBarValue(0);

    // build the payment request
    const paymentRequest = {
      merchant,
      tipCustomAmount,
      tipPercentage,
      email,
      qrCodeLink,
      refundAddress,
      password,
      // remove the dash from orderNumber
      orderNumber: orderNumber.replace(/-/g, ""),
    };

    // send the payment request to the server
    // local endpoint
    const invoiceApi = {
      local: "http://localhost:3001/invoice",
      local2:
        "https://43o1h1vh40.execute-api.us-east-1.amazonaws.com/default/bchInvoice2",
      production:
        "https://43o1h1vh40.execute-api.us-east-1.amazonaws.com/default/bchInvoice2",
    };

    // return null;

    fetch(invoiceApi[env], {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // access-control-allow-origin: *

        "Access-Control-Allow-Origin": "*", // this is the important part
      },
      body: JSON.stringify(paymentRequest),
    })
      .then((res) => res.json())
      .then(
        (data) => {
          console.log("data", data);
          setFormEnabled(false);
          setTotalAmount(data.totalAfterTip);
          setCustomOrderId(data.customOrderId);
          if (data.totalAfterTip > 0) {
            setShowPromptCashPayButton(true);
          }

          // if data.error is set, set the error message to invoiceError
          if (data.error) {
            switch (data.error) {
              case "Order number not found":
                setInvoiceError(
                  "Your order number was not found. If it was paid already, this is normal. If it was not paid, please check with the staff at the merchant to see if it has been paid."
                );
                break;
              case "no_email":
                setInvoiceError("Please enter an email.");
                break;
              case "no_refund_address":
                setInvoiceError("Please enter a refund address.");
                break;
              case "no_tip_percentage":
                setInvoiceError("Please enter a tip percentage.");
                break;
              case "no_tip_amount":
                setInvoiceError("Please enter a tip amount.");
                break;
              default:
                setInvoiceError(data.error);
                break;
            }
          }
        } // end of .then()
      ); // end of fetch()
  };

  const getTipForm = () => {
    return (
      <>
        {/* bill amount */}
        {/* <div className="form-group">
          <label htmlFor="bill-amount">Bill Amount Before Tip (optional)</label>
          <br />
          <small id="bill-amount-help" className="form-text text-muted">
            We will charge you based on the QR code you send, not the amount
            entered here. This is just so you can specify a tip.
          </small>
          <input
            type="number"
            className="form-control"
            id="bill-amount"
            placeholder="Enter Bill Amount"
          />
        </div> */}
        {/* tip percentage buttons */}
        {showPercentageTip ? (
          <div className="form-group">
            <label htmlFor="tip-percentage">Tip Percentage</label>
            <br />
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-secondary active">
                <input
                  type="radio"
                  name="options"
                  id="option0"
                  autoComplete="off"
                  defaultChecked
                  value="0"
                  onClick={tipPercentageClickHandler}
                />{" "}
                0%
              </label>
              <label className="btn btn-secondary">
                <input
                  type="radio"
                  name="options"
                  id="option15"
                  autoComplete="off"
                  value="15"
                  onClick={tipPercentageClickHandler}
                />{" "}
                15%
              </label>
              <label className="btn btn-secondary">
                <input
                  type="radio"
                  name="options"
                  id="option18"
                  autoComplete="off"
                  value="18"
                  onClick={tipPercentageClickHandler}
                />{" "}
                18%
              </label>
              <label className="btn btn-secondary">
                <input
                  type="radio"
                  name="options"
                  id="option20"
                  autoComplete="off"
                  value="20"
                  onClick={tipPercentageClickHandler}
                />{" "}
                20%
              </label>
              <label className="btn btn-secondary">
                <input
                  type="radio"
                  name="options"
                  id="optionother"
                  autoComplete="off"
                  value=""
                  onClick={tipPercentageClickHandler}
                />{" "}
                other
              </label>
            </div>
          </div>
        ) : null}

        {/* tip amount */}
        {showCustomTip ? (
          <div className="form-group">
            <label htmlFor="tip-amount">Tip Amount (in USD dollars)</label>
            <br />

            <input
              type="number"
              className="form-control"
              id="tip-amount"
              placeholder="Enter Tip Amount"
              onChange={(e) => setTipCustomAmount(e.target.value)}
            />
          </div>
        ) : null}
        {/* <small id="custom-tip-help" className="form-text text-muted">
            Enter any amount you want to tip
          </small> */}
        {/* total amount */}
        {/* <div className="form-group">
          <label htmlFor="total-amount">Total Amount (in dollars)</label>
          <h3 id="total-amount">${totalAmount}</h3>
        </div> */}
      </>
    );
  };

  const getAgentPurchaseForm = () => {
    if (formEnabled) {
      return (
        <>
          {/* form with text box for QR code link */}
          <div className="strawpurchase-form">
            <form>
              {/* restaurant select dropdown */}
              <div className="form-group">
                <label htmlFor="restaurant">Restaurant</label>
                <br />
                <small id="restaurant-help" className="form-text text-muted">
                  Select who you want to purchase from, more coming soon!
                </small>
                <select
                  className="form-control"
                  id="restaurant"
                  onChange={(e) => setMerchant(e.target.value)}
                >
                  <option value="cracker barrel">Cracker Barrel</option>
                </select>
              </div>
              {/* password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <br />
                <small id="password-help" className="form-text text-muted">
                  <a href="/waiting-list-agent-purchase">Click here</a> to be
                  placed on a waiting list
                </small>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* order number */}
              <div className="form-group">
                <label htmlFor="order-number">Order Number</label>
                <br />
                <small id="order-number-help" className="form-text text-muted">
                  Enter the order number on your check (bill)
                </small>
                <input
                  type="text"
                  className="form-control"
                  id="order-number"
                  placeholder="Enter Order Number"
                  onChange={(e) => setOrderNumber(e.target.value)}
                />
              </div>

              {/* email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <br />
                <small id="email-help" className="form-text text-muted">
                  To send you payment confirmation that we receive from the
                  restaurant
                  {/* View the confirmation email before leaving just in
                  case payment fails for some reason. Or just put your order
                  number into the restaurant{"'"}s website to see if it still
                  exists. */}
                </small>
                {/* add a "read more" link to read another paragraph */}

                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {unlockParagraphClickCount >= 3 ? (
                <div className="form-group">
                  <label htmlFor="qr-code-link">QR Code Link</label>
                  <input
                    type="text"
                    className="form-control"
                    id="qr-code-link"
                    placeholder="Enter QR Code Link"
                    onChange={(e) => setQrCodeLink(e.target.value)}
                  />
                </div>
              ) : null}
              {/* refund address */}
              <div className="form-group">
                <label htmlFor="refund-address">Refund Address</label>
                <br />
                {/* small italic text */}
                <small
                  id="refund-address-help"
                  className="form-text text-muted"
                >
                  If there's a problem with your payment, we'll refund this
                  bitcoin address
                </small>
                <input
                  type="text"
                  className="form-control"
                  id="refund-address"
                  placeholder="Enter Refund Address"
                  onChange={(e) => setRefundAddress(e.target.value)}
                />
              </div>

              {getTipForm()}

              {/* submit button */}
              <button
                type="submit"
                className="btn btn-lg btn-block btn-primary"
                style={{ fontSize: "18px" }}
                onClick={(e) => onFormSubmit(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  // tip percentage button click handler
  const tipPercentageClickHandler = (e) => {
    setShowCustomTip(e.target.value === "" ? true : false);

    // disable default checked for previously checked button
    console.log(`changing ${whichTipPercentageChecked} to ${e.target.id}`);

    document.getElementById(whichTipPercentageChecked).checked = false;
    document.getElementById(whichTipPercentageChecked).defaultChecked = false;
    // remove active class from previously checked button's label
    document
      .getElementById(whichTipPercentageChecked)
      .parentNode.classList.remove("active");

    // set new checked button
    setWhichTipPercentageChecked(e.target.id);
    document.getElementById(e.target.id).checked = true;
    document.getElementById(e.target.id).defaultChecked = true;

    // set its label to active
    document.getElementById(e.target.id).parentNode.classList.add("active");

    // set target to defaultChecked
    e.target.defaultChecked = true;

    // set tip percentage
    setTipPercentage(e.target.value);

    // // get the tip percentage
    // const tipPercentage = e.target.value;

    // // get the bill amount
    // const billAmount = document.getElementById("bill-amount").value;

    // // calculate the tip amount
    // const tip_amount = (billAmount * tipPercentage) / 100;

    // // calculate the total amount
    // const total_amount = parseFloat(billAmount) + parseFloat(tip_amount);

    // // display the tip amount
    // document.getElementById("tip-amount").value = tip_amount;

    // // display the total amount
    // document.getElementById("total-amount").value = total_amount;

    // setTotalAmount(total_amount);
  };

  const getPaymentStatusDiv = () => {
    return (
      <div className="outer-home-container">
        <div className="home">
          {/* orderID */}
          <h3>Order ID: {id}</h3>

          {/* crypto payment status */}
          <h3>
            Crypto Payment Status:
            {cryptoPaymentStatus === "PAID" && (
              <span style={{ color: "green", fontWeight: "bold" }}>PAID</span>
            )}
            {cryptoPaymentStatus === "UNPAID" && (
              <span style={{ color: "red", fontWeight: "bold" }}>UNPAID</span>
            )}
            {cryptoPaymentStatus === "loading" && (
              <span style={{ color: "grey", fontWeight: "bold" }}>LOADING</span>
            )}
          </h3>

          {/* credit card payment status */}
          <h3>
            Credit Card Payment Status:
            {creditCardPaymentStatus === "PAID" && (
              <span style={{ color: "green", fontWeight: "bold" }}>PAID</span>
            )}
            {creditCardPaymentStatus === "UNPAID" && (
              <span style={{ color: "red", fontWeight: "bold" }}>UNPAID</span>
            )}
            {creditCardPaymentStatus === "loading" && (
              <span style={{ color: "grey", fontWeight: "bold" }}>LOADING</span>
            )}
          </h3>

          {/* progress bar */}
          {(cryptoPaymentStatus === "loading" ||
            creditCardPaymentStatus === "loading") && (
            <div>
              <h3>Loading Payment Status</h3>
              <p>May take up to 30 seconds.</p>
              <div>
                <ProgressBar
                  now={progressBarValue}
                  label={`${progressBarValue}%`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const checkExistingOrderStatusForm = () => {
    return (
      <div className="outer-home-container">
        <div className="home">
          <h3>Check Status of an Existing Order</h3>
          <p>
            <small>
              <a
                href="#"
                onClick={(e) => setViewStatusOfAnExistingOrder(false)}
              >
                or submit a new order
              </a>
            </small>
          </p>
          <form onSubmit={checkExistingOrderStatus}>
            <div className="form-group">
              <label htmlFor="order-numbrer">Order Number</label>
              <input
                type="text"
                className="form-control"
                id="order-number"
                aria-describedby="order-number"
                placeholder="Enter Order Number"
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Check Status
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="outer-home-container">
      <div className="home">
        <h1>Agent Purchases</h1>
        <strong>
          Send a QR-enabled receipt & crypto. We pay the restaurant.
        </strong>

        {viewStatusOfAnExistingOrder ? checkExistingOrderStatusForm() : null}

        <br />
        <br />
        <h3>Submit Your Order to be Paid Below</h3>
        {/* small text */}
        <p>
          <small onClick={(e) => setViewStatusOfAnExistingOrder(true)}>
            <a href="#">or view status of an existing order</a>
          </small>
        </p>

        <div>
          <hr />

          {paymentStatus !== null ? getPaymentStatusDiv() : null}

          {/* Error Message Display Div */}
          {invoiceError ? (
            <div id="error-message" className="alert alert-danger" role="alert">
              <strong>Error!</strong> {invoiceError}
            </div>
          ) : null}

          {!showPromptCashPayButton &&
          !formEnabled &&
          !invoiceError &&
          !totalAmount &&
          !creditCardPaymentStatus ? (
            <>
              <div
                id="loading-message"
                className="alert alert-info"
                role="alert"
              >
                <strong>
                  If you are not shown the payment button within 30 seconds,
                  please refresh the page and try again.
                </strong>
              </div>
              {/* create a loading spinner with inline css */}
              <ProgressBar now={progressBarValue} animated />
            </>
          ) : null}
        </div>

        {getAgentPurchaseForm()}
        {showPromptCashPayButton ? (
          <div>
            <form
              name="prompt-cash-form"
              action="https://prompt.cash/pay"
              method="get"
            >
              <input type="hidden" name="token" value="608-eiDIZuKh" />
              <input
                type="hidden"
                name="tx_id"
                value={customOrderId + "-" + orderNumber.replace(/-/g, "")}
              />
              <input type="hidden" name="amount" value={totalAmount} />
              <input type="hidden" name="currency" value="USD" />
              <input
                type="hidden"
                name="desc"
                value={orderNumber.replace(/-/g, "")}
              />
              {env === "production" ? (
                <>
                  <input
                    type="hidden"
                    name="return"
                    value={
                      "https://davidhudman.com/order-received/" +
                      customOrderId +
                      "-" +
                      orderNumber.replace(/-/g, "")
                    }
                  />
                </>
              ) : (
                <>
                  <input
                    type="hidden"
                    name="return"
                    value={
                      "http://localhost:3000/agent/" +
                      customOrderId +
                      "-" +
                      orderNumber.replace(/-/g, "")
                    }
                  />
                </>
              )}
              <input
                type="hidden"
                name="callback"
                value="https://43o1h1vh40.execute-api.us-east-1.amazonaws.com/default/bchInvoice2"
              />
              <button type="submit" className="btn btn-primary">
                Pay ${totalAmount.toFixed(2)} with BitcoinCash (BCH)
              </button>
              <hr />
              {/* display red warning text below */}
              <p style={{ color: "red", maxWidth: "600px" }}>
                <strong>
                  <ol>
                    <li>On the next page, you will send your payment</li>
                    <li>
                      After you make your payment, wait for the green checkmark
                      confirmation
                    </li>
                    <li>
                      If there is no green checkmark within 30 seconds, refresh
                      the page
                    </li>
                    <li>
                      Once you see it turn green, your order is paid. You will
                      then be taken back to our site and see confirmation.
                    </li>
                  </ol>
                </strong>
              </p>
            </form>
          </div>
        ) : null}

        <hr />
        <p>
          More restaurants coming soon! Suggest restaurants who have QR code
          payment receipts by <a href="/new-restaurant-agent">clicking here</a>.
        </p>
        <hr />

        <p>
          Agent purchases (or proxy purchases) are a way to pay for your meal at
          a restaurant that has QR code payments on their bill. You can pay for
          your meal by asking for your bill and scanning it with your phone.
          Then you can send the order number to us, and we will request the
          equivalent amount of crypto from you. Once we receive right amount of
          crypto from you, we will pay the restaurant bill on your behalf.
        </p>
        <br />
        <p onClick={unlockParagraphClickHandler}>
          The restaurant will not know that you paid with crypto, and you will
          not have to give them your credit card or cash. If they ask, just say
          that you paid through the QR code on the receipt.
        </p>
        <p>
          If you have suggestions for restaurants that we should add to our list
          who accept QR code payment receipts, let us know by{" "}
          <a href="/new-restaurant-agent">clicking here</a>.
        </p>
        <br />

        {/* footer */}
        <div className="footer">
          <p>&copy; {new Date().getFullYear()} David Hudman</p>
        </div>
      </div>
    </div>
  );
};

export default StrawPurchase;
