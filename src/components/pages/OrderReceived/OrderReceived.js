import React, { useState } from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
  useParams,
} from "react-router-dom";

import "./orderreceived.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

const OrderReceived = () => {
  // get the order id from useParams
  const { id } = useParams();
  const [paymentStatus, setPaymentStatus] = useState("loading");

  useEffect(() => {
    console.log("OrderReceived.js useEffect() id: ", id);

    // fetch the order from the prompt cash get-payment api
    fetch(
      `https://jdgjutwzk7.execute-api.us-east-1.amazonaws.com/default/bchPay`,
      {
        method: "POST",
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
        if (data.status === "PAID") {
          setPaymentStatus("PAID");
        } else if (data.status === "UNPAID") {
          setPaymentStatus("UNPAID");
        } else {
          setPaymentStatus("ERROR");
        }
      });
  });

  return (
    <div className="outer-home-container">
      <div className="home">
        <h1>Order ID:</h1>
        <h2>{id}</h2>
        <h2>Payment Status:</h2>
        {paymentStatus === "loading" && <h3>Loading...</h3>}
        {paymentStatus === "PAID" && (
          <h3 style={{ color: "green", fontSize: "48px", fontWeight: "bold" }}>
            PAID
          </h3>
        )}
        {paymentStatus === "UNPAID" && (
          <h3 style={{ color: "red", fontSize: "48px", fontWeight: "bold" }}>
            UNPAID
          </h3>
        )}
      </div>
    </div>
  );
};

export default OrderReceived;
