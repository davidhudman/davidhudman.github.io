import React, { useState, useEffect } from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
  useParams,
} from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

import "./orderreceived.css";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderReceived = () => {
  // get the order id from useParams
  const { id } = useParams();
  const [cryptoPaymentStatus, setCryptoPaymentStatus] = useState("loading");
  const [creditCardPaymentStatus, setCreditCardPaymentStatus] =
    useState("loading");
  const [progressBarValue, setProgressBarValue] = useState(0);

  // setTimeout to update the progressBarValue by 1 every 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      if (progressBarValue < 100) {
        if (progressBarValue !== 99) {
          setProgressBarValue(progressBarValue + 1);
        }
      }
    }, 300);
    return () => clearInterval(interval);
  }, [progressBarValue]);

  useEffect(() => {
    console.log("OrderReceived.js useEffect() id: ", id);

    // fetch the order from the prompt cash get-payment api
    fetch(
      `https://43o1h1vh40.execute-api.us-east-1.amazonaws.com/default/bchInvoice2`,
      {
        method: "PUT",
        // fix cors error
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          //   fix cors error
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          tx: id,
        }),
      }
    )
      .then((res) => {
        console.log("OrderReceived.js useEffect() res: ", res);
        return res.json();
      })
      .then((data) => {
        console.log("OrderReceived.js useEffect() data: ", data);
        if (data.status) {
          setCryptoPaymentStatus(data.status);
        } else {
          setCryptoPaymentStatus("UNPAID");
        }
        if (data.creditCardPaymentResult) {
          setCreditCardPaymentStatus(data.creditCardPaymentResult);
        } else {
          setCreditCardPaymentStatus("UNPAID");
        }
      });
  }, [id]);

  return (
    <div className="outer-home-container">
      <div className="home">
        {/* title */}
        <h1 className="home-title">Order Status Page</h1>

        {/* orderID */}
        <h3>Order ID: {id.split("-")[1]}</h3>

        {/* crypto payment status */}
        <h3>
          Crypto Payment Status:
          {cryptoPaymentStatus === "PAID" && (
            <span style={{ color: "green", fontWeight: "bold" }}>PAID</span>
          )}
          {cryptoPaymentStatus === "UNPAID" && (
            <span style={{ color: "red", fontWeight: "bold" }}>UNPAID</span>
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
        </h3>

        {/* progress bar */}
        {cryptoPaymentStatus === "loading" && (
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

export default OrderReceived;
