import React, { useState } from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
} from "react-router-dom";

import "./strawpurchase.css";
import "bootstrap/dist/css/bootstrap.min.css";

const StrawPurchase = () => {
  const [tipPercentageChecked, setTipPercentageChecked] = useState("option15");

  const getStrawPurchaseForm = () => {
    let formEnabled = true;
    if (formEnabled) {
      return (
        <>
          {/* form with text box for QR code link */}
          <div className="strawpurchase-form">
            <form>
              <div className="form-group">
                <label htmlFor="qr-code-link">QR Code Link</label>
                <input
                  type="text"
                  className="form-control"
                  id="qr-code-link"
                  placeholder="Enter QR Code Link"
                />
              </div>
              {/* bill amount */}
              <div className="form-group">
                <label htmlFor="bill-amount">Bill Amount (optional)</label>
                <br />
                {/* italic text */}
                <small id="bill-amount-help" className="form-text text-muted">
                  We will charge you based on the QR code you send, not the
                  amount entered here. This is just so you can specify a tip.
                </small>
                <input
                  type="number"
                  className="form-control"
                  id="bill-amount"
                  placeholder="Enter Bill Amount"
                />
              </div>
              {/* tip percentage buttons */}
              <div className="form-group">
                <label htmlFor="tip-percentage">Tip Percentage</label>
                <br />
                <div
                  className="btn-group btn-group-toggle"
                  data-toggle="buttons"
                >
                  <label className="btn btn-secondary active">
                    <input
                      type="radio"
                      name="options"
                      id="option15"
                      autoComplete="off"
                      defaultChecked
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
                      id="option25"
                      autoComplete="off"
                      value="25"
                      onClick={tipPercentageClickHandler}
                    />{" "}
                    25%
                  </label>
                </div>
              </div>

              {/* tip amount */}
              <div className="form-group">
                <label htmlFor="tip-amount">Tip Amount (in dollars)</label>
                <input
                  type="number"
                  className="form-control"
                  id="tip-amount"
                  placeholder="Enter Tip Amount"
                />
              </div>
              {/* total amount */}
              <div className="form-group">
                <label htmlFor="total-amount">Total Amount (in dollars)</label>
                <input
                  type="number"
                  className="form-control"
                  id="total-amount"
                  placeholder="Enter Total Amount"
                />
              </div>
              {/* email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                />
              </div>
              {/* submit button */}
              <button
                type="submit"
                className="btn btn-lg btn-block btn-primary"
                style={{ fontSize: "18px" }}
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
    // disable default checked for previously checked button
    console.log(`changing ${tipPercentageChecked} to ${e.target.id}`);

    document.getElementById(tipPercentageChecked).checked = false;
    document.getElementById(tipPercentageChecked).defaultChecked = false;
    // remove active class from previously checked button's label
    document
      .getElementById(tipPercentageChecked)
      .parentNode.classList.remove("active");

    // set new checked button
    setTipPercentageChecked(e.target.id);
    document.getElementById(e.target.id).checked = true;
    document.getElementById(e.target.id).defaultChecked = true;

    // set its label to active
    document.getElementById(e.target.id).parentNode.classList.add("active");

    // set target to defaultChecked
    e.target.defaultChecked = true;

    // get the tip percentage
    const tipPercentage = e.target.value;

    // get the bill amount
    const billAmount = document.getElementById("bill-amount").value;

    // calculate the tip amount
    const tipAmount = (billAmount * tipPercentage) / 100;

    // calculate the total amount
    const totalAmount = parseFloat(billAmount) + parseFloat(tipAmount);

    // display the tip amount
    document.getElementById("tip-amount").value = tipAmount;

    // display the total amount
    document.getElementById("total-amount").value = totalAmount;
  };
  return (
    <div className="outer-home-container">
      <div className="home">
        <h1>Straw Purchases</h1>
        <h4>Send a QR-enabled receipt & crypto, and we pay the restaurant.</h4>

        <br />

        <div>
          <p>
            Be sure to provide us with your email so we can send you payment
            confirmation that we receive from the restaurant. And view the
            confirmation email before leaving just in case payment fails for
            some reason.
          </p>
          <hr />
          <h3>Accepted Restaurants</h3>
          <p>Cracker Barrel coming soon</p>

          <hr />

          <br />
        </div>

        {getStrawPurchaseForm()}

        <br />
        <br />

        <p>
          Straw purchases are a way to pay for your meal at a restaurant that
          has QR code payments on their bill. You can pay for your meal by
          asking for your bill and scanning it with your phone. Then you can
          send the link to us, and we will request the equivalent amount of
          crypto from you. Once we receive right amount of crypto from you, we
          will pay the restaurant bill on your behalf.
        </p>
        <br />
        <p>
          The restaurant will not know that you paid with crypto, and you will
          not have to give them your credit card or cash. If they ask, just say
          that you paid through the QR code on the receipt.
        </p>
        <p>
          If you have suggestions for restaurants that we should add to our list
          who accept QR code payments, please let me know by reaching out to me
          on <a href="https://www.linkedin.com/in/davidhudman/">My LinkedIn</a>.
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
