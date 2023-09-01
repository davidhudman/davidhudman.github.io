import React, { useState, useEffect } from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
} from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import * as yup from "yup";

import "./formnewrestaurantagentpurchase.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../other/Footer/Footer";

const FormNewRestaurantAgentPurchase = () => {
  const [formEnabled, setFormEnabled] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [formType, setFormType] = useState("waitingListAgentPurchases");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  const [unlockParagraphClickCount, setUnlockParagraphClickCount] = useState(0);
  const [env, setEnv] = useState("production");
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [showAgentPurchasesText, setShowAgentPurchasesText] = useState(false);

  // setTimeout to update the progressBarValue by 1 every 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      if (progressBarValue < 100) {
        setProgressBarValue(progressBarValue + 1);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [progressBarValue]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate form against yup schema
    const schema = yup.object().shape({
      email: yup.string().max(100).email().required(),
      firstName: yup.string().max(100).required(),
      lastName: yup.string().max(100).required(),
      message: yup.string().max(1000).required(),
    });

    schema
      .validate({ email, firstName, lastName, message })
      .then(() => {
        setFormEnabled(false);
        setProgressBarValue(0);

        // build the payment request
        const req = {
          email,
          firstName,
          lastName,
          message,
          formType: "formNewRestaurantAgentPurchases",
        };

        // send the payment request to the server
        // local endpoint
        const formApi = {
          local: "http://localhost:3001/formWaitingListAgentPurchases",
          local2:
            "https://ps5lyq6sa8.execute-api.us-east-1.amazonaws.com/default/formWaitingListAgentPurchases",
          production:
            "https://ps5lyq6sa8.execute-api.us-east-1.amazonaws.com/default/formWaitingListAgentPurchases",
        };

        fetch(formApi[env], {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // access-control-allow-origin: *

            "Access-Control-Allow-Origin": "*", // this is the important part
          },
          body: JSON.stringify(req),
        })
          .then((res) => res.json())
          .then(
            (data) => {
              console.log("data", data);
              setFormEnabled(false);
              setProgressBarValue(100);

              // if data.error is set, set the error message to formError
              if (data.error) {
                // TODO: handle error cases
                setFormError(
                  "Something went wrong. Please try again: " +
                    JSON.stringify(data.error)
                );
              } else {
                setFormSuccess(true);
              }
            } // end of .then()
          ); // end of fetch()
      })
      .catch((err) => {
        console.log("err", err);
        setFormError(err.errors[0]);
        setFormEnabled(true);
      });
  };

  const getForm = () => {
    if (formEnabled) {
      return (
        <>
          {/* form with text box for QR code link */}
          <div className="form">
            <form>
              {/* email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* first name */}
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              {/* last name */}
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              {/* message */}
              <div className="form-group">
                <label htmlFor="message">Restaurant Name</label>
                <br />
                <small id="message-help" className="form-text text-muted">
                  Please only send restaurants that currently support QR code
                  payments
                </small>
                <textarea
                  type="text"
                  className="form-control"
                  id="message"
                  placeholder="Enter Restaurant Name"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

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

  return (
    <div className="outer-home-container">
      <div className="home">
        <h1>Restaurant Suggestions</h1>
        <strong>
          Submit this form only if you know of restaurants with QR code payment
        </strong>

        <hr />

        {/* Error Message Display Div */}
        {formError ? (
          <div id="error-message" className="alert alert-danger" role="alert">
            <strong>Error!</strong> {formError}
          </div>
        ) : null}

        {/* Success Message Display Div */}
        {formSuccess ? (
          <div
            id="success-message"
            className="alert alert-success"
            role="alert"
          >
            <strong>Success!</strong> You have submitted a restaurant for us to
            review.
          </div>
        ) : null}

        {/* Loading Message Display Div */}
        {!formEnabled && !formError && progressBarValue != 100 ? (
          <>
            <div id="loading-message" className="alert alert-info" role="alert">
              <strong>
                If you are not shown a success message within 10 seconds, please
                refresh the page and try again.
              </strong>
            </div>
            {/* create a loading spinner with inline css */}
            <ProgressBar now={progressBarValue} animated />
          </>
        ) : null}
      </div>

      {getForm()}

      <br />
      <hr />

      {/* "what are agent purchases" button - click to expand and see text */}
      <button
        type="button"
        className="btn btn-xs btn-block btn-secondary"
        data-toggle="collapse"
        data-target="#collapse1"
      >
        What are Agent Purchases?
      </button>
      <div id="collapse1" className="collapse">
        <div className="well">
          <p>
            Agent purchases (or proxy purchases) are a way to pay for your meal
            at a restaurant that has QR code payments on their bill. You can pay
            for your meal by asking for your bill and scanning it with your
            phone. Then you can send the order number to us, and we will request
            the equivalent amount of crypto from you. Once we receive right
            amount of crypto from you, we will pay the restaurant bill on your
            behalf.
          </p>
          <br />
          <p>
            The restaurant will not know that you paid with crypto, and you will
            not have to give them your credit card or cash. If they ask, just
            say that you paid through the QR code on the receipt.
          </p>
          <p>
            If you would like to join as a beta tester before the full release,
            let us know by <a href="/wait">clicking here</a>.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FormNewRestaurantAgentPurchase;
