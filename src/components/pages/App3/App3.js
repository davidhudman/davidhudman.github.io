import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const App3 = () => {
  const formik = useFormik({
    initialValues: {
      invoiceAmount: "",
      tipAmount: "",
      description: "",
    },
    validationSchema: Yup.object({
      invoiceAmount: Yup.number().min(0).required("Required"),
      tipAmount: Yup.number().min(0),
      description: Yup.string(),
    }),
    // handleSubmit ?
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      axios
        .get("https://prompt.cash/pay", {
          params: {
            amount: getTotalAmount(),
            desc: values.description,
            currency: "USD",
            token: "608-eiDIZuKh",
            tx_id: Date.now(),
            // return: "DavidHudman.com/3"
            // callback: "your-store.com/api/v1/update-payment"
          },
          headers: {
            "Access-Control-Allow-Origin": "*",
            Referer: "origin",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const isTipValid = () => parseFloat(formik.values.tipAmount) >= 0;

  const isInvoiceValid = () => parseFloat(formik.values.invoiceAmount) >= 0;

  const getTotalAmount = () => {
    if (isTipValid() && isInvoiceValid()) {
      return (
        parseFloat(formik.values.invoiceAmount) +
        parseFloat(formik.values.tipAmount)
      ).toFixed(2);
    } else {
      if (isInvoiceValid()) {
        return parseFloat(formik.values.invoiceAmount).toFixed(2);
      }
      if (isTipValid()) {
        return parseFloat(formik.values.tipAmount).toFixed(2);
      }
      return parseFloat(0.0).toFixed(2);
    }
  };

  const showHideTipSection = (e) => {
    if (document.getElementById("tipSection").style.display === "block") {
      document.getElementById("tipSection").style.display = "none";
    } else {
      document.getElementById("tipSection").style.display = "block";
    }
  };

  const getTipSection = () => {
    return (
      <>
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

        {/* Tip Button Section */}
        <div id="tipSection" style={{ display: "none" }}>
          <div className="btn-group btn-group-justified" role="group">
            {[0, 0.15, 0.18, 0.2, 0.25].map((num, i) => {
              return (
                <div className="btn-group" role="group" key={i}>
                  <button
                    className="btn btn-default btn-lg"
                    onClick={(e) =>
                      (formik.values.tipAmount = parseFloat(
                        num * formik.values.invoiceAmount
                      ).toFixed(2))
                    }
                  >
                    {num * 100}%
                  </button>
                </div>
              );
            })}
          </div>
          <br />
          <input
            id="tipAmount"
            name="tipAmount"
            placeholder="Enter custom tip amount"
            className="form-control text-center"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tipAmount}
          />
          {formik.touched.tipAmount && formik.errors.tipAmount ? (
            <div style={{ color: "red" }}>{formik.errors.tipAmount}</div>
          ) : (
            <div>&nbsp;</div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="App3">
      <h1>Test Pay App 3</h1>
      <br />
      <br />
      <div className="form-group input-group-lg">
        <form onSubmit={formik.handleSubmit}>
          <input
            id="invoiceAmount"
            name="invoiceAmount"
            placeholder="Enter amount owed"
            className="form-control text-center"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.invoiceAmount}
          />
          {formik.touched.invoiceAmount && formik.errors.invoiceAmount ? (
            <div style={{ color: "red" }}>{formik.errors.invoiceAmount}</div>
          ) : (
            <div>&nbsp;</div>
          )}

          <br />

          {/* Show / Hide Tip Button */}
          {getTipSection()}

          <br />
          <br />

          <input
            id="description"
            name="description"
            placeholder="Enter description"
            className="form-control text-center"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div style={{ color: "red" }}>{formik.errors.description}</div>
          ) : (
            <div>&nbsp;</div>
          )}

          <br />
          <br />

          <button
            type="submit"
            disabled={!formik.isValid || getTotalAmount() <= 0}
            className={
              getTotalAmount() > 0
                ? "btn btn-block btn-lg btn-success payBtn"
                : "btn btn-block btn-lg btn-warning payBtn"
            }
          >
            Pay ${getTotalAmount()}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App3;
