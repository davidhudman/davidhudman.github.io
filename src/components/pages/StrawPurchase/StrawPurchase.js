import React, { useState, useEffect, useRef } from "react"; // Fragment
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
  const steps = [
    "orderNum",
    "tipEtc",
    "confirmation",
    "payment",
    "orderReceived",
  ];
  const [whichTipPercentageChecked, setWhichTipPercentageChecked] =
    useState("option0");
  const [tipPercentage, setTipPercentage] = useState(0);
  const [isShowTip, setIsShowTip] = useState(true);
  const [tipCustomAmount, setTipCustomAmount] = useState(null);
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
  const [env, setEnv] = useState(process.env.REACT_APP_STAGE);
  const [invoiceError, setInvoiceError] = useState(null);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [cryptoPaymentStatus, setCryptoPaymentStatus] = useState(null);
  const [creditCardPaymentStatus, setCreditCardPaymentStatus] = useState(null);
  const [merchant, setMerchant] = useState("cracker barrel");
  const [checkIfOrderExistsButtonEnabled, setCheckIfOrderExistsButtonEnabled] =
    useState(true);
  const [paymentIframeEnabled, setPaymentIframeEnabled] = useState(true);
  const [waitIHaventPaidButtonEnabled, setWaitIHaventPaidButtonEnabled] =
    useState(true);
  const [paymentStatusChecked, setPaymentStatusChecked] = useState(false);
  const [step, setStep] = useState(steps[0]); // change back to steps[0] - alt steps[3]
  const [showEmailConfirmInfoText, setShowEmailConfirmInfoText] =
    useState(false);
  const [showRefreshOrderStatusInfoText, setShowRefreshOrderStatusInfoText] =
    useState(false);
  const [bucketImageKey, setBucketImageKey] = useState(null);
  // const [haveSetCryptoPaymentLoading, setHaveSetCryptoPaymentLoading] =
  //   useState(false);
  // const [haveSetCreditCardPaymentLoading, setHaveSetCreditCardPaymentLoading] =
  //   useState(false);

  // useParams to get the id
  const { id } = useParams();

  // let creditCardPaymentStatus = useRef();
  // let cryptoPaymentStatus = useRef();
  let haveSetCryptoPaymentLoading = useRef();
  let haveSetCreditCardPaymentLoading = useRef();
  // create check payment status method
  const checkPaymentStatus = (customOrderId, orderNumber) => {
    console.log(
      "checkPaymentStatus() creditCardPaymentStatus: ",
      creditCardPaymentStatus,
      " cryptoPaymentStatus: ",
      cryptoPaymentStatus
    );
    if (cryptoPaymentStatus != "PAID") {
      console.log("checkPaymentStatus() cryptoPaymentStatus is not PAID");
    }
    if (creditCardPaymentStatus != "PAID") {
      console.log("checkPaymentStatus() creditCardPaymentStatus is not PAID");
    } else {
      console.log("checkPaymentStatus() creditCardPaymentStatus is PAID");
      return;
    }
    let _fullOrderNum =
      customOrderId && orderNumber
        ? customOrderId + "-" + orderNumber.replace(/-/g, "")
        : id
        ? id
        : null;

    if (id) {
      console.log("found id - need to go diretly to step 3");
      setStep(steps[3]);
    }

    if (!_fullOrderNum) {
      console.log("useEffect() _fullOrderNum is null, return");
      return;
    }
    setFormEnabled(false);
    console.log("useEffect() _fullOrderNum: ", _fullOrderNum);
    // fetch the order from the prompt cash get-payment api
    fetch(
      `https://43o1h1vh40.execute-api.us-east-1.amazonaws.com/default/bchInvoice2?tx=${_fullOrderNum}`,
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
        console.log("useEffect() res: ", res);
        return res.json();
      })
      .then((data) => {
        console.log("useEffect() data: ", data);
        // TODO: get the credit card and crypto payment status of the order - if pending, display the progress bar
        if (data.cryptoPaymentReceived) {
          console.log(
            "setting cryptoPaymentReceived: ",
            data.cryptoPaymentReceived
          );
          if (data.cryptoPaymentReceived != cryptoPaymentStatus) {
            setCryptoPaymentStatus(data.cryptoPaymentReceived);
          }
          if (data.cryptoPaymentReceived == "PAID") {
            setWaitIHaventPaidButtonEnabled(false);
            setPaymentIframeEnabled(false);
          }
          if (id) {
            console.log("found id - need to set total amount");
            data.totalAfterTip && setTotalAmount(data.totalAfterTip);
          }
        }
        if (data.creditCardPaymentStatus) {
          // fix refreshing everytime setInterval is called
          if (data.creditCardPaymentStatus != creditCardPaymentStatus) {
            console.log(
              "setting creditCardPaymentStatus data.creditCardPaymentStatus: ",
              data.creditCardPaymentStatus,
              " creditCardPaymentStatus: ",
              creditCardPaymentStatus,
              " paymentStatus: ",
              paymentStatus
            );
            setCreditCardPaymentStatus(data.creditCardPaymentStatus);
            setBucketImageKey(data.bucketImageKey);
          }
        }
        if (id) {
          data.customOrderId && setCustomOrderId(data.customOrderId);
          setOrderNumber(id);
        }
      })
      .catch((err) => {
        console.log("useEffect() err: ", err);
      });
  };

  // useEffect for id
  useEffect(() => {
    if (id && id.length > 0) {
      checkPaymentStatus(id);
    }
  }, [id]);

  // useEffect for step is 3, formEnabled is true, showPromptCashPayButton is true, customOrderId is not empty, and orderNumber is not empty
  let myIntervalRef = useRef();
  useEffect(() => {
    if (step === steps[3] && customOrderId && paymentStatusChecked === false) {
      setPaymentStatusChecked(true);
      console.log("check payment status for order: ", orderNumber);
      // check payment status every 5 seconds
      checkPaymentStatus(customOrderId, orderNumber);
      if (creditCardPaymentStatus != "PAID") {
        setCryptoPaymentStatus("loading");
        setPaymentStatus("loading");
        setCreditCardPaymentStatus("loading");
        myIntervalRef.current = setInterval(
          (customOrderId, orderNumber) => {
            checkPaymentStatus(customOrderId, orderNumber);

            // TODO - if we can figure out how to pass in parameters to setInterval, we can clearInterval when the paymentStatus is PAID
          },
          5000,
          customOrderId,
          orderNumber
        );
      }
      // clear interval after 180 seconds
      setTimeout(() => {
        if (myIntervalRef) {
          clearInterval(myIntervalRef.current);
          // TODO: update 40 seconds to longer period for user to pay

          // TODO: when timer ends, show a button to ask the user if they want us to keep checking for payment
        }
      }, 180000);
    } else {
      console.log(
        "step: ",
        step,
        " customOrderId: ",
        customOrderId,
        " paymentStatusChecked: ",
        paymentStatusChecked
      );
      if (creditCardPaymentStatus == "PAID") {
        console.log("creditCardPaymentStatus is PAID - clear interval");
        if (myIntervalRef) {
          console.log("clearing interval");
          clearInterval(myIntervalRef.current);
        }
      }
    }
  }, [customOrderId, creditCardPaymentStatus]);

  // useEffect for totalAmount
  useEffect(() => {
    // console.log("id: ", id);
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
      if (progressBarValue !== 100) {
        setProgressBarValue(progressBarValue + 1);
      }
    }, 800);
    return () => clearInterval(interval);
  }, [progressBarValue]);

  const checkExistingOrderStatus = (e) => {
    e.preventDefault();
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setFormEnabled(false);
    setProgressBarValue(0);
    setStep(steps[3]);

    // build the payment request
    const paymentRequest = {
      merchant,
      // remove dollar sign and commas from tipCustomAmount
      tipCustomAmount: tipCustomAmount
        ? tipCustomAmount.replace(/[$,]/g, "")
        : 0,
      tipPercentage,
      email,
      // qrCodeLink,
      refundAddress,
      password,
      // remove the dash from orderNumber
      orderNumber: orderNumber.replace(/-/g, ""),
    };

    // send the payment request to the server
    // local endpoint
    const invoiceApi = {
      local: "http://localhost:3001/invoice",
      dev: "https://43o1h1vh40.execute-api.us-east-1.amazonaws.com/default/bchInvoice2",
      prod: "https://43o1h1vh40.execute-api.us-east-1.amazonaws.com/default/bchInvoice2",
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
                if (data?.error?.details?.[0]?.message) {
                  setInvoiceError(data.error.details[0].message);
                } else {
                  setInvoiceError(data.error);
                }
                break;
            }
          } else {
            setTotalAmount(data.totalAfterTip);
            setCustomOrderId(data.customOrderId);
            if (data.totalAfterTip > 0) {
              setShowPromptCashPayButton(true);
            }
          }
        } // end of .then()
      ); // end of fetch()
  };

  const getTipForm = () => {
    return (
      <>
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
              value={tipCustomAmount}
              onChange={(e) => setTipCustomAmount(e.target.value)}
            />
          </div>
        ) : null}
      </>
    );
  };

  // check if order exists in the database; if it doesn't exist, take the user to step 2; if it does exist, take the user to the confirmation page
  const checkIfOrderExists = () => {
    // disable checkIfOrderExistsButton to prevent multiple clicks
    setCheckIfOrderExistsButtonEnabled(false);
    setProgressBarValue(0);

    // query API to see if order exists
    const orderApi = {
      local: "http://localhost:3001/order",
      dev: "https://43o1h1vh40.execute-api.us-east-1.amazonaws.com/default/bchInvoice2",
      prod: "https://43o1h1vh40.execute-api.us-east-1.amazonaws.com/default/bchInvoice2",
    };

    // fetch GET request to check if order exists
    fetch(orderApi[env] + `/?tx=${orderNumber}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
    })
      .then((res) => res.json())
      .then(
        (data) => {
          console.log("data", data);
          setCheckIfOrderExistsButtonEnabled(true);
          if (data.cryptoPaymentReceived === "PAID") {
            // if order exists, redirect user to /agent/${orderNumber}
            if (env === "prod") {
              window.location.href = `https://davidhudman.com/agent/${orderNumber}`;
            } else {
              window.location.href = `http://localhost:3000/agent/${orderNumber}`;
              // TODO: try going to step 3
            }
          } else {
            // if order doesn't exist, set step to 2
            setStep(steps[1]);
          }
        } // end of .then()
      ); // end of fetch()
  };

  const getPaymentIframe = () => {
    return (
      <div hidden={!paymentIframeEnabled}>
        <p>
          Click the "Pay in Wallet" button to open your wallet or copy the
          address below the QR code and paste it into your wallet.
        </p>
        <br />
        <iframe
          id="prompt-frame"
          scrolling="no"
          style={{ overflow: "hidden" }}
          width="360"
          height="800"
          src={
            "https://prompt.cash/pay-frame?token=608-eiDIZuKh&currency=USD&tx_id=" +
            customOrderId +
            "-" +
            orderNumber.replace(/-/g, "") +
            "&amount=" +
            totalAmount +
            "&desc=" +
            orderNumber.replace(/-/g, "") +
            "&callback=" +
            "https://43o1h1vh40.execute-api.us-east-1.amazonaws.com/default/bchInvoice2"
          }
        ></iframe>
      </div>
    );
  };

  const getAgentPurchaseForm = () => {
    if (formEnabled) {
      console.log("env: ", env);
      return (
        <>
          {step === steps[0] ? (
            <>
              <h1>Agent Purchases</h1>
              <strong>
                Send a QR-enabled receipt & crypto. We pay the restaurant.
              </strong>
              <br />
              <hr />
            </>
          ) : null}
          {/* form with text box for QR code link */}
          <div className="strawpurchase-form">
            <form>
              {step === steps[0] ? (
                <>
                  {/* restaurant select dropdown */}
                  <div className="form-group">
                    <label htmlFor="restaurant">Restaurant</label>
                    <br />
                    <small
                      id="restaurant-help"
                      className="form-text text-muted"
                    >
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

                  {/* order number */}
                  <div className="form-group">
                    <label htmlFor="order-number">Order Number</label>
                    <br />
                    <small
                      id="order-number-help"
                      className="form-text text-muted"
                    >
                      The order number on your check. Or enter it here to check
                      the status
                    </small>
                    <input
                      type="text"
                      className="form-control"
                      id="order-number"
                      placeholder="Enter Order Number"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                    />
                  </div>
                  {/* create next button */}
                  <br />
                  <button
                    type="button"
                    id="checkIfOrderExistsButton"
                    disabled={!checkIfOrderExistsButtonEnabled}
                    className="btn btn-primary btn-lg btn-block"
                    onClick={() => checkIfOrderExists()}
                  >
                    Next
                  </button>
                  {/* progress bar */}
                  <div hidden={checkIfOrderExistsButtonEnabled}>
                    <ProgressBar now={progressBarValue} animated />
                  </div>
                </>
              ) : null}
              {step === steps[1] ? (
                <>
                  {/* password */}
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <br />
                    <small id="password-help" className="form-text text-muted">
                      Required for early access.{" "}
                      <a href="/waiting-list-agent-purchase">Click here</a> to
                      be placed on a waiting list
                    </small>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {/* email */}
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <br />
                    <small id="email-help" className="form-text text-muted">
                      To send you payment confirmation that we receive from the
                      restaurant...once we fix the bug causing that to not work
                      :)
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
                      value={email}
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
                        value={qrCodeLink}
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
                      bitcoin cash address
                    </small>
                    <input
                      type="text"
                      className="form-control"
                      id="refund-address"
                      placeholder="Enter Refund Address"
                      value={refundAddress}
                      onChange={(e) => setRefundAddress(e.target.value)}
                    />
                  </div>

                  {getTipForm()}

                  {/* create button to go back to step[0] */}
                  <br />
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg btn-block"
                    onClick={() => setStep(steps[0])}
                  >
                    Go Back
                  </button>
                  <br />
                  <br />

                  {/* submit button */}
                  <button
                    type="submit"
                    className="btn btn-lg btn-block btn-primary"
                    onClick={(e) => onFormSubmit(e)}
                  >
                    Pay
                  </button>
                </>
              ) : null}

              {/* show warning text before showing user the payment button */}
              {step === steps[2] ? (
                <>
                  <hr />
                  {/* display red warning text below */}
                  <h3>Read All Of This</h3>
                  <h4>
                    especially the
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      &nbsp;red text&nbsp;
                    </span>
                    in point 3
                  </h4>
                  <br />
                  <ol>
                    <li>On the next page, you will send your payment</li>
                    <li>
                      After you make your payment, wait for the green checkmark
                      confirmation
                    </li>
                    <li style={{ color: "red", fontWeight: "bold" }}>
                      On the next page if there is no green checkmark within 30
                      seconds of payment, refresh the page until you see the
                      green checkmark confirmation
                    </li>
                    <li>
                      Once you see it turn green, your order is paid. You will
                      then be taken back to our site and see confirmation.
                    </li>
                  </ol>
                  {/* back and next buttons */}
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg btn-block"
                    onClick={() => setStep(steps[1])}
                  >
                    Go Back
                  </button>

                  <br />
                  <br />

                  {/* submit button */}
                  <button
                    type="submit"
                    className="btn btn-lg btn-block btn-primary"
                    onClick={(e) => onFormSubmit(e)}
                  >
                    I Understand, Submit
                  </button>
                </>
              ) : null}
            </form>
          </div>
        </>
      );
    } else {
      // form is no longer enabled so show pay button, payment status, etc
      return (
        <>
          {/* show payment button */}
          {step === steps[3] ? (
            <>
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

              {showPromptCashPayButton && customOrderId && orderNumber ? (
                <div>
                  {/* <p>
                    iframe src:{" "}
                    {"https://prompt.cash/pay-frame?token=608-eiDIZuKh&currency=USD&tx_id=" +
                      customOrderId +
                      "-" +
                      orderNumber.replace(/-/g, "") +
                      "&amount=" +
                      totalAmount +
                      "&desc=" +
                      orderNumber.replace(/-/g, "") +
                      "&callback=" +
                      "https://43o1h1vh40.execute-api.us-east-1.amazonaws.com/default/bchInvoice2"}
                  </p> */}

                  {/* button for "wait, I still need to pay" */}

                  {paymentIframeEnabled ? getPaymentIframe() : null}
                  <br />
                  <br />
                  <form
                    name="prompt-cash-form"
                    action="https://prompt.cash/pay"
                    method="get"
                    hidden={!paymentIframeEnabled}
                  >
                    <input type="hidden" name="token" value="608-eiDIZuKh" />
                    <input
                      type="hidden"
                      name="tx_id"
                      value={
                        customOrderId + "-" + orderNumber.replace(/-/g, "")
                      }
                    />
                    <input type="hidden" name="amount" value={totalAmount} />
                    <input type="hidden" name="currency" value="USD" />
                    <input
                      type="hidden"
                      name="desc"
                      value={orderNumber.replace(/-/g, "")}
                    />
                    {env === "prod" ? (
                      <>
                        <input
                          type="hidden"
                          name="return"
                          value={
                            "https://davidhudman.com/agent/" +
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
                    <br />
                    <p>If barcode to pay doesn't load, click here</p>
                    <button type="submit" className="btn btn-primary">
                      Pay ${totalAmount.toFixed(2)} BitcoinCash
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  <h3>Loading Payment Button</h3>
                </>
              )}
            </>
          ) : null}
        </>
      );
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
          <h3>
            Order ID:{" "}
            {id ? id.slice(-9) : orderNumber ? orderNumber : "unknown"}
          </h3>

          {/* crypto payment status */}
          <h4 style={{ marginBottom: "-5px" }}>Crypto Payment Status:</h4>
          {/* small text */}
          <small className="form-text text-muted">(from you to us)</small>
          <br />
          <span style={{ fontSize: "24px" }}>
            {cryptoPaymentStatus == "PAID" && (
              <span style={{ color: "green", fontWeight: "bold" }}>PAID</span>
            )}
            {cryptoPaymentStatus == "UNPAID" && (
              <span style={{ color: "red", fontWeight: "bold" }}>UNPAID</span>
            )}
            {cryptoPaymentStatus != "PAID" &&
              cryptoPaymentStatus != "UNPAID" && (
                <span style={{ color: "grey", fontWeight: "bold" }}>
                  PENDING
                </span>
              )}
          </span>
          <br />
          {/* text to float left */}
          <h4 style={{ marginBottom: "-5px" }}>Credit Card Payment Status:</h4>
          {/* small text */}
          <small className="form-text text-muted">(from us to merchant)</small>
          {/* credit card payment status */}
          <br />
          <span style={{ fontSize: "24px" }}>
            {creditCardPaymentStatus == "PAID" && (
              <>
                <span style={{ color: "green", fontWeight: "bold" }}>PAID</span>
                {bucketImageKey && (
                  <>
                    <br />
                    <hr />
                    <a
                      href={
                        "https://s3.amazonaws.com/bch-invoice-public/" +
                        bucketImageKey
                      }
                      target="_blank"
                    >
                      <img
                        src={
                          "https://s3.amazonaws.com/bch-invoice-public/" +
                          bucketImageKey
                        }
                        width="100%"
                        height="auto"
                        alt="My Image"
                      />
                      <br />
                      Click to Download Confirmation Image
                    </a>
                    <hr />
                  </>
                )}
              </>
            )}
            {creditCardPaymentStatus == "UNPAID" && progressBarValue >= 99 && (
              <span style={{ color: "red", fontWeight: "bold" }}>UNPAID</span>
            )}
            {(creditCardPaymentStatus == "loading" ||
              (creditCardPaymentStatus != "PAID" && progressBarValue < 99)) && (
              <span style={{ color: "grey", fontWeight: "bold" }}>PENDING</span>
            )}
          </span>

          {/* div that is below the float left and float right text */}
          <div style={{ clear: "both" }}>&nbsp;</div>

          {/* progress bar */}
          {(cryptoPaymentStatus == "loading" ||
            creditCardPaymentStatus == "loading" ||
            creditCardPaymentStatus == "PENDING" ||
            creditCardPaymentStatus == "UNPAID") && (
            <div>
              <h3>Loading Payment Status</h3>
              <div>
                <ProgressBar
                  now={progressBarValue}
                  label={`${progressBarValue}%`}
                />
              </div>
            </div>
          )}

          <br />
          <br />
          <button
            type="button"
            className="btn btn-xs btn-block btn-secondary"
            style={{ fontSize: "18px" }}
            onClick={() =>
              setShowEmailConfirmInfoText(!showEmailConfirmInfoText)
            }
          >
            &#9660;&nbsp;No email confirmation?&nbsp;&#9660;
          </button>
          <br />
          <br />
          {showEmailConfirmInfoText && (
            <>
              <p>
                If you don't receive an email confirmation after you pay us,
                just ask the cashier to check your order number on your check to
                ensure your order was paid. If payment failed for some reason,
                we will refund you to the email or crypto address you provided.
              </p>
              <br />
            </>
          )}

          <button
            type="button"
            className="btn btn-xs btn-block btn-secondary"
            style={{ fontSize: "18px" }}
            onClick={() =>
              setShowRefreshOrderStatusInfoText(!showRefreshOrderStatusInfoText)
            }
          >
            &#9660;&nbsp;Recheck order status?&nbsp;&#9660;
          </button>
          <br />
          <br />
          {showRefreshOrderStatusInfoText && (
            <>
              <p>
                If your order status doesn't load and you want to check again,
                you can refresh the page and enter your order number again to
                check the status.
              </p>
              <br />
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="outer-home-container">
      <div className="home">
        <div>
          {/* Error Message Display Div */}
          {invoiceError ? (
            <div id="error-message" className="alert alert-danger" role="alert">
              <strong>Error!</strong> {invoiceError}
            </div>
          ) : null}
        </div>

        {/* get payment status div */}
        {step === steps[3] &&
        cryptoPaymentStatus &&
        creditCardPaymentStatus &&
        !paymentIframeEnabled
          ? getPaymentStatusDiv()
          : null}

        {getAgentPurchaseForm()}

        {step === steps[0] ? (
          <>
            <hr />
            {/* "Want to Join?" button - click to expand and see text */}
            <button
              class="btn btn-secondary btn-xs btn-block"
              type="button"
              data-toggle="collapse"
              data-target="#collapse1"
              style={{ lineHeight: 1 }}
            >
              Signup
              <br />
              <small
                className="form-text text-muted"
                style={{
                  fontSize: "14px",
                }}
              >
                required for early access
              </small>
            </button>
            <div class="collapse" id="collapse1">
              <div class="well">
                If you want to join our beta release as a customer, please fill
                out the{" "}
                <span style={{ fontWeight: "bold" }}>
                  <a href="/wait">waiting list form here.</a>
                </span>
              </div>
            </div>
            <br />
            {/* suggest restaurant button */}
            <button
              class="btn btn-secondary btn-xs btn-block"
              type="button"
              data-toggle="collapse"
              data-target="#collapse2"
            >
              Suggest a Restaurant
            </button>
            <div class="collapse" id="collapse2">
              <div class="well">
                More restaurants coming soon! Suggest restaurants who have QR
                code payment receipts by{" "}
                <a href="/new-restaurant-agent">clicking here</a>.
              </div>
            </div>
            <br />

            {/* agent purchases button */}
            <button
              class="btn btn-secondary btn-xs btn-block"
              type="button"
              data-toggle="collapse"
              data-target="#collapse3"
            >
              What are Agent Purchases?
            </button>
            <div class="collapse" id="collapse3">
              <div class="well">
                <p>
                  Agent purchases (or proxy purchases) are a way to pay for your
                  meal at a restaurant that has QR code payments on their bill.
                  You can pay for your meal by asking for your bill and scanning
                  it with your phone. Then you can send the order number to us,
                  and we will request the equivalent amount of crypto from you.
                  Once we receive right amount of crypto from you, we will pay
                  the restaurant bill on your behalf.
                </p>
                <br />
                <p onClick={unlockParagraphClickHandler}>
                  The restaurant will not know that you paid with crypto, and
                  you will not have to give them your credit card or cash. If
                  they ask, just say that you paid through the QR code on the
                  receipt.
                </p>
                <p>
                  If you have suggestions for restaurants that we should add to
                  our list who accept QR code payment receipts, let us know by{" "}
                  <a href="/new-restaurant-agent">clicking here</a>.
                </p>
              </div>
            </div>
            <br />
          </>
        ) : null}

        {/* footer */}
        {/* <div className="footer">
          <p>&copy; {new Date().getFullYear()} David Hudman</p>
        </div> */}
      </div>
    </div>
  );
};

export default StrawPurchase;
