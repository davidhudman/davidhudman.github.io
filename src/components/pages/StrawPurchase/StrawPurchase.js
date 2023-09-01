import React, { useState, useEffect, useRef } from "react"; // Fragment
import QRCodeScanner from "./QRCodeScanner";
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
  useParams,
} from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

// import Yup for form validation
import { object, string, number, date, InferType } from "yup";

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
  const [password, setPassword] = useState("shane95smi");
  const [orderNumber, setOrderNumber] = useState("");
  const [customOrderId, setCustomOrderId] = useState(null);
  const [unlockParagraphClickCount, setUnlockParagraphClickCount] = useState(0);
  const [env, setEnv] = useState(process.env.REACT_APP_MY_CUSTOM_ENV_NAME);
  const [invoiceError, setInvoiceError] = useState(null);
  const [invoiceErrorDetails, setInvoiceErrorDetails] = useState(null);
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
  const [formErrors, setFormErrors] = useState(null);
  const [showCameraPrompt, setShowCameraPrompt] = useState(true);
  const [finalStepFirstTime, setFinalStepFirstTime] = useState(true);
  const [host, setHost] = useState(null);
  const [isCameraPermissionGranted, setIsCameraPermissionGranted] =
    useState(false);
  const [preCheck, setPreCheck] = useState(null);
  const [showFullReceipt, setShowFullReceipt] = useState(false);
  const [totalToPay, setTotalToPay] = useState(0);
  // const [haveSetCryptoPaymentLoading, setHaveSetCryptoPaymentLoading] =
  //   useState(false);
  // const [haveSetCreditCardPaymentLoading, setHaveSetCreditCardPaymentLoading] =
  //   useState(false);

  // useParams to get the id
  const { id } = useParams();

  const setHostname = () => {
    // set host name
    if (process.env.REACT_APP_STAGE_URL) {
      setHost(process.env.REACT_APP_STAGE_URL);
    } else {
      setHost("http://localhost:3000");
    }
  };

  // let creditCardPaymentStatus = useRef();
  // let cryptoPaymentStatus = useRef();
  let haveSetCryptoPaymentLoading = useRef();
  let haveSetCreditCardPaymentLoading = useRef();

  const isiOS = () => {
    const userAgent = navigator.userAgent;
    return (
      userAgent.includes("iPhone") ||
      userAgent.includes("iPad") ||
      userAgent.includes("iPod") ||
      (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
    );
  };

  const isSafariOniOS = () => {
    const userAgent = navigator.userAgent;
    return (
      userAgent.includes("Safari") &&
      userAgent.includes("iPhone") &&
      !userAgent.includes("CriOS") &&
      !userAgent.includes("FxiOS")
    );
  };

  const requestCameraPermission = async () => {
    setShowCameraPrompt(false);
    try {
      setIsCameraPermissionGranted(true);
    } catch (err) {
      console.error(err);
      // Handle the error, e.g. show an error message to the user
    }
  };
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
    fetch(`${process.env.REACT_APP_STAGE_INVOICE_API}?tx=${_fullOrderNum}`, {
      method: "GET",
      // fix cors error
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        //   fix cors error
        "Access-Control-Allow-Origin": "*",
      },
    })
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
    setHostname();
    if (id && id.length > 0) {
      checkPaymentStatus(id);
    }
  }, [id]);

  // useEffect for step is 3, formEnabled is true, showPromptCashPayButton is true, customOrderId is not empty, and orderNumber is not empty
  let myIntervalRef = useRef();
  useEffect(() => {
    // if (step === steps[3]) {
    //   if (finalStepFirstTime) {
    //     setFinalStepFirstTime(false);
    //     setProgressBarValue(1);
    //   }
    // }
    if (step === steps[3] && customOrderId && paymentStatusChecked === false) {
      setPaymentStatusChecked(true);
      console.log("check payment status for order: ", orderNumber);
      // check payment status every 5 seconds
      checkPaymentStatus(customOrderId, orderNumber);
      if (creditCardPaymentStatus != "PAID") {
        // TODO: change this right back after testing
        // setCryptoPaymentStatus("loading");
        setPaymentStatus("loading");
        // setCreditCardPaymentStatus("loading");
        myIntervalRef.current = setInterval(
          (customOrderId, orderNumber) => {
            checkPaymentStatus(customOrderId, orderNumber);

            // TODO - if we can figure out how to pass in parameters to setInterval, we can clearInterval when the paymentStatus is PAID
          },
          1500,
          customOrderId,
          orderNumber
        );
      }
      // clear interval after 180 seconds
      setTimeout(() => {
        if (myIntervalRef) {
          clearInterval(myIntervalRef.current);
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
    if (progressBarValue > 0) {
      const interval = setInterval(() => {
        if (progressBarValue !== 100) {
          setProgressBarValue(progressBarValue + 1);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [progressBarValue]);

  const checkExistingOrderStatus = (e) => {
    e.preventDefault();
  };

  // validate form with Yup
  const validate = async (values) => {
    // create a Yup schema to validate each form field
    let formSchema = object({
      merchant: string().required("merchant is required"),
      // tip amount must be a number
      tipCustomAmount: number()
        .typeError("Tip must be a number, even if it's 0")
        .min(0, "Tip must be at least 0")
        .max(40, "Tip must be less than 40")
        .required("tip amount is required"),
      tipPercentage: number().optional(),
      email: string()
        .required("Email is required")
        .test("len", "Must not be blank", (val) => val.length > 0), // force email behavior later - .email("Invalid email address")
      refundAddress: string().required("Refund Address is required"),
      password: string().required("Password is required"),
      orderNumber: string().required("Order Number is required"),
    });

    // validate the form - new way
    const errors = {};
    try {
      await formSchema.validate(values, { abortEarly: false });
      setFormErrors({});
    } catch (err) {
      console.log("err: ", err);
      // list all keys in the err object
      Object.keys(err).forEach((key) => {
        console.log("key: ", key);
      });
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setFormErrors(errors);
    }

    return errors;
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setFormEnabled(false);

    // validate the form - move this down below paymentRequest later
    let paymentRequest = {
      merchant,
      // remove dollar sign and commas from tipCustomAmount
      tipCustomAmount,
      tipPercentage,
      email,
      // qrCodeLink,
      refundAddress,
      password,
      // remove the dash from orderNumber
      orderNumber: orderNumber.replace(/-/g, ""),
    };

    const validateErrors = await validate(paymentRequest);

    // TODO: remove this but just test validate for now
    if (Object.keys(validateErrors).length > 0) {
      console.log("validateErrors: ", validateErrors);
      setFormEnabled(true);
      return null;
    } else {
      console.log("no errors");
    }

    setProgressBarValue(1);
    setStep(steps[3]);

    // edit commas and dollar signs from tip amount
    paymentRequest.tipCustomAmount = tipCustomAmount
      ? tipCustomAmount.replace(/[$,]/g, "")
      : 0;

    console.log("paymentRequest: ", paymentRequest);

    // send the payment request to the server

    // return null;

    fetch(process.env.REACT_APP_STAGE_INVOICE_API, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
                  setInvoiceErrorDetails(
                    "Please check the order number above to ensure it matches the order number on the receipt."
                  );
                } else {
                  setInvoiceError(data.error);
                  setInvoiceErrorDetails(
                    "Please check the order number above to ensure it matches the order number on the receipt."
                  );
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
            {/* add error text for formErrors.tipCustomAmount */}
            {formErrors && formErrors.tipCustomAmount ? (
              <span className="text-danger">
                <b>{formErrors.tipCustomAmount}</b>
              </span>
            ) : null}

            <input
              type="number"
              className="form-control"
              id="tip-amount"
              placeholder="6.50"
              value={tipCustomAmount}
              onChange={(e) => setTipCustomAmount(e.target.value)}
            />
          </div>
        ) : null}
      </>
    );
  };

  // check if order exists in the database; if it doesn't exist, take the user to step 2; if it does exist, take the user to the confirmation page
  const checkIfOrderExists = (qrData) => {
    // disable checkIfOrderExistsButton to prevent multiple clicks
    setCheckIfOrderExistsButtonEnabled(false);

    // set timer to increase progress bar value every 500ms
    const timer = setInterval(() => {
      setProgressBarValue((progressBarValue) => {
        const newValue = progressBarValue + 5;
        if (newValue >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newValue;
      });
    }, 500);

    let tempOrderNumber = orderNumber;

    console.log("tempOrderNumber: ", tempOrderNumber);

    if (qrData) {
      // Extract the order number from the QR code URL
      // url will be "https://www.crackerbarrel.com/mobilepay?store=CB0234&code=M7RF3"
      const url = new URL(qrData);
      const storeParam = url.searchParams.get("store");
      const codeParam = url.searchParams.get("code");

      const extractedStoreNumber = storeParam ? storeParam.slice(2) : null;
      const extractedOrderNumber = codeParam ? codeParam.slice(0, 5) : null;

      tempOrderNumber =
        String(extractedStoreNumber) + String(extractedOrderNumber);
    } else {
      // extract any non-alphanumeric characters from the order number
      tempOrderNumber = tempOrderNumber.replace(/[^a-zA-Z0-9]/g, "");
    }

    console.log("tempOrderNumber before setOrderNumber: ", tempOrderNumber);
    setOrderNumber(tempOrderNumber);

    // fetch GET request to check if order exists
    fetch(
      process.env.REACT_APP_GET_WARMUP_URL +
        `/?tx=${tempOrderNumber}&isWarmup=1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
        },
      }
    )
      .then((res) => res.json())
      .then(
        (data) => {
          console.log("data", data);
          setCheckIfOrderExistsButtonEnabled(true);
          if (
            data &&
            data.cryptoPaymentReceived &&
            data.cryptoPaymentReceived === "PAID"
          ) {
            // if order exists, redirect user to /agent/${tempOrderNumber}
            window.location.href = `${process.env.REACT_APP_STAGE_URL}/agent/${tempOrderNumber}`;
            // TODO: try going to step 3
          } else if (data && data.error) {
            switch (data.error) {
              case "Order number not found":
                setInvoiceError(
                  "Your order number was not found. If it was paid already, this is normal. If it was not paid, please check with the staff at the merchant to see if it has been paid."
                );
                setInvoiceErrorDetails(
                  "Please check the order number above to ensure it matches the order number on the receipt. Only dine-in receipts are valid. You must have the receipt already to use this. View the video demo below for help."
                );
                break;
              case "Order number not found - bad_api":
                setInvoiceError("Something is wrong with your order number.");
                setInvoiceErrorDetails(
                  "Please check the order number above to ensure it matches the order number on the receipt. Only dine-in receipts are valid. You must have the receipt already to use this. View the video demo below for help."
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
                  setInvoiceErrorDetails(
                    "Please check the order number above to ensure it matches the order number on the receipt. Only dine-in receipts are valid. You must have the receipt already to use this. View the video demo below for help."
                  );
                } else {
                  setInvoiceError(data.error);
                  setInvoiceErrorDetails(
                    "Please check the order number above to ensure it matches the order number on the receipt. Only dine-in receipts are valid. You must have the receipt already to use this. View the video demo below for help."
                  );
                }
                break;
            }
          } else {
            // if order doesn't exist, set step to 2
            setStep(steps[1]);
            if (data && data.PreCheck) {
              setPreCheck(data.PreCheck);
            }
            if (data && data.TotalToPay) {
              setTotalToPay(data.TotalToPay);
            }
          }
        } // end of .then()
      ); // end of fetch()
  };

  const setIsFinalStep = (value) => {
    if (value === true) {
      setCryptoPaymentStatus("UNPAID");
      setCreditCardPaymentStatus("UNPAID");
      setPaymentIframeEnabled(false);
    } else {
      setCryptoPaymentStatus(null);
      setCreditCardPaymentStatus(null);
      setPaymentIframeEnabled(true);
    }
  };

  const getPaymentIframe = () => {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        hidden={!paymentIframeEnabled}
      >
        <br />
        {/* message that iphone users must copy the address because "pay in wallet" will not work in safari */}
        {/* create div with light blue background */}

        <div className="alert alert-info" role="alert">
          <label>Step 1</label>
          {isiOS() ? (
            <p>
              Tap the copy icon (do not press and hold) below the QR code to
              copy the address and paste it into your wallet.
            </p>
          ) : (
            <p>
              Click the "Pay in Wallet" button to open your wallet or tap the
              copy icon (do not press and hold) to copy the address below the QR
              code and paste it into your wallet.
            </p>
          )}
          {/* The "Pay
            in Wallet" button may not work in some iPhone web browsers. */}
          <label style={{ marginTop: "1em" }}>Step 2</label>
          <p>Return to this page.</p>
          <label style={{ marginTop: "1em" }}>Step 3</label>
          <p>
            <a
              href="#"
              onClick={() => setIsFinalStep(true)}
              // style underline
              style={{ textDecoration: "underline" }}
            >
              Check Payment Status
            </a>
          </p>
          <label style={{ marginTop: "1em" }}>Any Issues?</label>
          <a
            href="#"
            onClick={() => {
              setIsFinalStep(true);
              setTimeout(() => {
                setIsFinalStep(false);
              }, 500);
            }}
            // style underline
            style={{ textDecoration: "underline" }}
          >
            Reload payment prompt
          </a>{" "}
          or refresh to start over.
        </div>

        {/* <p>
          Click the "Pay in Wallet" button to open your wallet or copy the
          address below the QR code and paste it into your wallet.
        </p> */}
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
            `${process.env.REACT_APP_STAGE_CALLBACK_API}`
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
              <hr />
            </>
          ) : null}
          {/* form with text box for QR code link */}
          <div className="strawpurchase-form">
            <form>
              {step === steps[0] ? (
                <>
                  {/* restaurant select dropdown */}
                  {false && (
                    <>
                      <div className="form-group">
                        <label htmlFor="restaurant">Restaurant</label>
                        <small
                          id="restaurant-help"
                          className="form-text text-muted"
                        >
                          Select who you want to purchase from, more coming
                          soon!
                        </small>
                        <select
                          className="form-control"
                          id="restaurant"
                          onChange={(e) => setMerchant(e.target.value)}
                        >
                          <option value="cracker barrel">Cracker Barrel</option>
                        </select>
                      </div>
                      <br />
                    </>
                  )}

                  {/* order number */}
                  <div className="form-group">
                    {showCameraPrompt && (
                      <div>
                        <p>
                          <a
                            href="#"
                            className="btn btn-lg btn-block btn-primary"
                            onClick={requestCameraPermission}
                            style={{ fontSize: "1.5em" }}
                          >
                            Scan QR Code on Receipt
                          </a>
                        </p>
                      </div>
                    )}
                    {isCameraPermissionGranted ? (
                      <QRCodeScanner
                        width="300px"
                        height="200px"
                        onScan={checkIfOrderExists}
                      />
                    ) : (
                      <>
                        {/* <div
                        hidden={true}
                        style={{
                          width: "300px",
                          height: "200px",
                          backgroundColor: "#000", // Optional: change to any color you prefer
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "auto",
                        }}
                      >
                        <p></p>
                      </div> */}
                      </>
                    )}
                  </div>
                  {/* create next button */}
                  <br />
                  <label htmlFor="order-number">
                    Or enter order number manually
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      id="order-number"
                      placeholder="ex: 0123-AB789"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      style={{
                        fontSize: "1.25em",
                        height: "2em",
                        width: "60%",
                      }}
                    />
                    <div style={{ width: "10%" }}></div>
                    <button
                      type="button"
                      id="checkIfOrderExistsButton"
                      disabled={
                        !checkIfOrderExistsButtonEnabled ||
                        orderNumber.length < 9
                      }
                      className="btn btn-primary btn-sm"
                      onClick={() => checkIfOrderExists()}
                      style={{
                        fontSize: "1.25em",
                        height: "2em",
                        width: "30%",
                      }}
                    >
                      Next
                    </button>
                  </div>
                  {/* progress bar */}
                  <div
                    hidden={checkIfOrderExistsButtonEnabled}
                    style={{ marginTop: "1em" }}
                  >
                    <ProgressBar now={progressBarValue} animated />
                  </div>
                </>
              ) : null}
              {step === steps[1] ? (
                <>
                  <p style={{ fontSize: "24px" }}>
                    Order:{" "}
                    {String(orderNumber.slice(0, 4)) +
                      "-" +
                      String(orderNumber.slice(4))}
                  </p>
                  <br />
                  {/* form errors show all errors in formErrors state object in a nice red box with a dark red outline of 1px */}
                  {formErrors && (
                    <div
                      className="alert alert-danger"
                      role="alert"
                      hidden={formErrors.length === 0}
                    >
                      <p>Fix the errors in red below</p>
                    </div>
                  )}
                  {/* password */}
                  <div className="form-group" hidden>
                    <label htmlFor="password">Password</label>
                    <br />
                    <small id="password-help" className="form-text text-muted">
                      Required for early access.{" "}
                      <a href="/waiting-list-agent-purchase">Click here</a> to
                      be placed on a waiting list
                    </small>
                    <br />
                    {/* add error text for formErrors.password */}
                    {formErrors && formErrors.password ? (
                      <span className="text-danger">
                        <b>{formErrors.password}</b>
                      </span>
                    ) : null}
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {/* totalToPay from Cracker Barrel */}
                  <div className="form-group">
                    <label htmlFor="preCheck">Cost Before Tip</label>
                    {/* display totalToPay */}
                    <p style={{ fontSize: "36px" }}>${totalToPay.toFixed(2)}</p>
                  </div>

                  {/* email */}
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <small id="email-help" className="form-text text-muted">
                      to send the payment confirmation
                      {/* View the confirmation email before leaving just in
                  case payment fails for some reason. Or just put your order
                  number into the restaurant{"'"}s website to see if it still
                  exists. 

                   To send you payment confirmation that we receive from the
                      restaurant. If your email has a period in the username,
                      you may not receive the email.
                  
                  */}
                    </small>
                    {/* add a "read more" link to read another paragraph */}
                    <br />
                    {/* add error text for formErrors.email */}
                    {formErrors && formErrors.email ? (
                      <span className="text-danger">
                        <b>{formErrors.email}</b>
                      </span>
                    ) : null}

                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="user@gmail.com"
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
                    <label htmlFor="refund-address">Refund BCH Address</label>
                    {/* small italic text */}
                    <small
                      id="refund-address-help"
                      className="form-text text-muted"
                    >
                      If payment fails, we'll refund this BCH address
                    </small>
                    <br />
                    {/* add error text for formErrors.refundAddress */}
                    {formErrors && formErrors.refundAddress ? (
                      <span className="text-danger">
                        <b>{formErrors.refundAddress}</b>
                      </span>
                    ) : null}
                    <input
                      type="text"
                      className="form-control"
                      id="refund-address"
                      placeholder="bitcoincash:qz0..."
                      value={refundAddress}
                      onChange={(e) => setRefundAddress(e.target.value)}
                    />
                  </div>

                  {getTipForm()}

                  <br />

                  {/* submit button */}
                  <button
                    type="submit"
                    className="btn btn-lg btn-block btn-primary"
                    onClick={(e) => onFormSubmit(e)}
                  >
                    Pay
                  </button>
                  <br />
                  <br />

                  {/* create button to go back to step[0] */}
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg btn-block"
                    onClick={() => setStep(steps[0])}
                  >
                    Go Back
                  </button>

                  {/* "see full receipt" button to see receipt down below */}
                  <br />
                  <br />
                  {preCheck ? (
                    <button
                      type="button"
                      className="btn btn-secondary btn-lg btn-block"
                      onClick={() => setShowFullReceipt(!showFullReceipt)}
                      style={{
                        backgroundColor: "#551505",
                        color: "#F9A812",
                      }}
                    >
                      {showFullReceipt ? "Hide" : "See"} Full Receipt
                    </button>
                  ) : null}
                  {showFullReceipt ? (
                    <>
                      <br />
                      {/* preCheck print out of receipt */}
                      <div className="form-group">
                        <label htmlFor="preCheck">
                          Check From Cracker Barrel
                        </label>
                        <br />
                        <textarea
                          className="form-control"
                          id="preCheck"
                          rows="35"
                          value={preCheck}
                          readOnly
                        ></textarea>
                      </div>
                    </>
                  ) : null}
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

                  {/* submit button - if button enabled */}
                  <button
                    type="submit"
                    disabled={!formEnabled}
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
                    hidden={!paymentIframeEnabled}
                    method="POST"
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
                    {env === "production" ? (
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
                      value={process.env.REACT_APP_STAGE_CALLBACK_API}
                    />
                    {/* <br />
                    <p>If barcode to pay doesn't load, click here</p>
                    <button type="submit" className="btn btn-primary">
                      Pay ${totalAmount.toFixed(2)} BitcoinCash
                    </button> */}
                  </form>
                </div>
              ) : (
                !invoiceError && <></>
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

  const formatOrderNumber = (str) => {
    if (str && str.length >= 4 && str.charAt(4) !== "-") {
      return str.slice(0, 4) + "-" + str.slice(4);
    }
    return str;
  };

  const getPaymentStatusDiv = () => {
    if (finalStepFirstTime) {
      setFinalStepFirstTime(false);

      // set progressbarvalue to 15 when cryptopaymentstatus changes - 15 just so it's visible to user
      setProgressBarValue(15);
    }
    return (
      <div className="outer-home-container">
        <div className="home">
          {/* orderID */}
          <h3>
            Order:{" "}
            {id
              ? formatOrderNumber(id.slice(-9))
              : orderNumber
              ? formatOrderNumber(orderNumber)
              : "unknown"}
          </h3>
          <hr />
          <h4>Payment Status</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* crypto payment status */}
            <div>
              <h4 style={{ marginBottom: "-0.4em" }}>Crypto</h4>
              {/* small text */}
              <small className="form-text text-muted">from you to us</small>
              <br />
              <span style={{ fontSize: "1.25em" }}>
                {cryptoPaymentStatus == "PAID" && (
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    PAID
                  </span>
                )}
                {cryptoPaymentStatus == "UNPAID" && (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    UNPAID
                    <br />
                    <a href="#" onClick={() => setIsFinalStep(false)}>
                      Return to pay?
                    </a>
                  </span>
                )}
                {cryptoPaymentStatus != "PAID" &&
                  cryptoPaymentStatus != "UNPAID" && (
                    <span style={{ color: "grey", fontWeight: "bold" }}>
                      PENDING
                    </span>
                  )}
              </span>
            </div>
            {/* text to float left */}
            <div>
              <h4 style={{ marginBottom: "-0.4em" }}>Credit Card</h4>
              {/* small text */}
              <small className="form-text text-muted">
                from us to merchant
              </small>
              {/* credit card payment status */}
              <br />
              <span>
                {creditCardPaymentStatus == "PAID" && (
                  <>
                    <span
                      style={{
                        color: "green",
                        fontWeight: "bold",
                        fontSize: "1.25em",
                      }}
                    >
                      PAID
                    </span>
                  </>
                )}
                {creditCardPaymentStatus == "UNPAID" &&
                  progressBarValue >= 99 && (
                    <span
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "1.25em",
                      }}
                    >
                      UNPAID
                    </span>
                  )}
                {creditCardPaymentStatus == "loading" ||
                  (creditCardPaymentStatus != "PAID" ? (
                    progressBarValue < 99 ? (
                      <span
                        style={{
                          color: "grey",
                          fontWeight: "bold",
                          fontSize: "1.25em",
                        }}
                      >
                        PENDING
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "grey",
                          fontWeight: "bold",
                          fontSize: "1.25em",
                        }}
                      >
                        FAILED.{" "}
                        <a href={host + "/agent/" + orderNumber}>Retry?</a>
                      </span>
                    )
                  ) : null)}
              </span>
            </div>
          </div>

          {/* receipt image */}
          {creditCardPaymentStatus == "PAID" && (
            <>
              {bucketImageKey && (
                <>
                  <hr />
                  <label htmlFor="receipt-image">Click Image to Download</label>
                  <div
                    id="receipt-image"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                  >
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
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </a>
                  </div>
                  <hr />
                </>
              )}
            </>
          )}

          {/* div that is below the float left and float right text */}
          <div style={{ clear: "both" }}>&nbsp;</div>

          {/* progress bar */}
          {(cryptoPaymentStatus == "loading" ||
            creditCardPaymentStatus == "loading" ||
            creditCardPaymentStatus == "PENDING" ||
            creditCardPaymentStatus == "UNPAID") && (
            <div>
              <div>
                {progressBarValue < 100 && (
                  <>
                    <label>Loading Payment Status</label>
                    <ProgressBar
                      now={progressBarValue}
                      label={`${progressBarValue}%`}
                    />
                  </>
                )}
              </div>
            </div>
          )}
          <button
            type="button"
            className="btn btn-xs btn-block btn-secondary"
            style={{ fontSize: "1.25em" }}
            onClick={() =>
              setShowEmailConfirmInfoText(!showEmailConfirmInfoText)
            }
          >
            No email confirmation?
          </button>
          {showEmailConfirmInfoText && (
            <>
              <br />
              <p>
                If you don't receive an email confirmation after you pay us,
                just ask the cashier to check your order number on your check to
                ensure your order was paid. If payment failed for some reason,
                we will refund you to the email or crypto address you provided.
              </p>
              <br />
            </>
          )}

          <br />

          {/* <button
            type="button"
            className="btn btn-xs btn-block btn-secondary"
            style={{ fontSize: "1.25em" }}
            onClick={() =>
              setShowRefreshOrderStatusInfoText(!showRefreshOrderStatusInfoText)
            }
          >
            Recheck order status?
          </button> */}
          {showRefreshOrderStatusInfoText && (
            <>
              <br />
              <p>
                If your order status doesn't load and you want to check again,
                you can refresh the page and enter your order number again to
                check the status.
              </p>
              <br />
            </>
          )}
          <br />
          {/* donate button (a tag styled as button) - link to /paybch */}
          <a href="/paybch">
            <button
              className="btn btn-lg btn-block btn-secondary"
              type="button"
              style={{
                color: "#333",
                fontSize: "1.25em",
                position: "fixed",
                bottom: "0",
                left: "0",
                right: "0",
                width: "80%",
                maxWidth: "400px",
                margin: "1em auto",
              }}
            >
              Donate
            </button>
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="outer-home-container">
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
            {env != "production"
              ? `BCH for CB - ${env.slice(0, 4)} env`
              : "BCH for Cracker Barrel"}
          </li>
        </ol>
      </nav>
      {/* add image from wiki commons for bch logo */}
      {step !== steps[0] && (
        <img
          width="64"
          alt="Bitcoin Cash"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Bitcoin_Cash.png/64px-Bitcoin_Cash.png"
        />
      )}

      {step === steps[0] && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flowDirection: "row",
          }}
        >
          <div>
            <img
              width="64"
              alt="Bitcoin Cash"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Bitcoin_Cash.png/64px-Bitcoin_Cash.png"
            />
          </div>
          <h1 style={{ fontSize: "24px" }}>&nbsp; for Cracker Barrel</h1>
        </div>
      )}

      <div className="home">
        <div>
          {/* Error Message Display Div */}
          {invoiceError && typeof invoiceError === "string" ? (
            <>
              {/* show order number */}
              <h3>Order: {orderNumber ?? "unknown"}</h3>
              <div
                id="error-message"
                className="alert alert-danger"
                role="alert"
              >
                <strong>Error!</strong> {invoiceError}
                <br />
                <br />
                <p>{invoiceErrorDetails ?? "No details available."}</p>
              </div>
            </>
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
            <div hidden>
              <button
                className="btn btn-secondary btn-xs btn-block"
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
              <br />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flowDirection: "row",
              }}
            >
              <div
                style={{
                  marginBottom: "100px",
                }}
              >
                <a href="https://youtu.be/euI-3ciQ1_s">
                  <i
                    className="fa-brands fa-youtube"
                    style={{
                      fontSize: "48px",
                      color: "grey",
                    }}
                  ></i>
                  <div
                    style={{
                      margin: "-15px -20px",
                    }}
                  >
                    &nbsp;
                  </div>
                  <small
                    className="form-text text-muted"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    Video Demo
                  </small>
                </a>
              </div>
            </div>
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

            {/* donate button (a tag styled as button) - link to /paybch */}
            <a href="/paybch">
              <button
                className="btn btn-lg btn-block btn-secondary"
                type="button"
                style={{
                  color: "black",
                  fontSize: "1em",
                  position: "fixed",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  width: "100%",
                  margin: "0 auto",
                }}
              >
                Donate &#9829;
              </button>
            </a>

            {/* suggest restaurant button */}
            {false && (
              <>
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
                    More restaurants coming soon! Suggest restaurants who have
                    QR code payment receipts by{" "}
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
                      Agent purchases (or proxy purchases) are a way to pay for
                      your meal at a restaurant that has QR code payments on
                      their bill. You can pay for your meal by asking for your
                      bill and scanning it with your phone. Then you can send
                      the order number to us, and we will request the equivalent
                      amount of crypto from you. Once we receive right amount of
                      crypto from you, we will pay the restaurant bill on your
                      behalf.
                    </p>
                    <br />
                    <p onClick={unlockParagraphClickHandler}>
                      The restaurant will not know that you paid with crypto,
                      and you will not have to give them your credit card or
                      cash. If they ask, just say that you paid through the QR
                      code on the receipt.
                    </p>
                    <p>
                      If you have suggestions for restaurants that we should add
                      to our list who accept QR code payment receipts, let us
                      know by <a href="/new-restaurant-agent">clicking here</a>.
                    </p>
                  </div>
                </div>
                <br />
              </>
            )}
          </>
        ) : null}

        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default StrawPurchase;
