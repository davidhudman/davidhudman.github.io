import React, { useState, useEffect } from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import * as yup from "yup";

import "./hoover.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../other/Footer/Footer";

const Hoover = () => {
  const [formEnabled, setFormEnabled] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [expectedFinishTime, setExpectedFinishTime] = useState("");
  const [classYear, setHighSchoolGraduationYear] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [formType, setFormType] = useState("hooverxmasrace2023");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [isFormHidden, setIsFormHidden] = useState(true);

  const [unlockParagraphClickCount, setUnlockParagraphClickCount] = useState(0);
  const [env, setEnv] = useState("production");
  const [progressBarValue, setProgressBarValue] = useState(0);

  // usenavigate
  const navigate = useNavigate();

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
      message: yup.string().max(1000).optional(),
    });

    schema
      .validate({ email, firstName, lastName, message })
      .then(() => {
        setFormEnabled(false);
        setProgressBarValue(0);

        // build the payment request
        const req = {
          email: email ? email : "blank",
          firstName: firstName ? firstName : "blank",
          lastName: lastName ? lastName : "blank",
          phone: phone ? phone : "blank",
          expectedFinishTime: expectedFinishTime ? expectedFinishTime : "blank",
          classYear: classYear ? classYear : "blank",
          message: message ? message : "blank",
          formType: "hooverxmasrace2023",
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
                setFormError(JSON.stringify(data.error));
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

  const getWaitingListForm = () => {
    if (formEnabled) {
      return (
        <>
          {/* form with text box for QR code link */}
          <div className="form">
            <form>
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

              {/* Phone Number */}
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  placeholder="Enter Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              {/* high school graduation year */}
              <div className="form-group">
                <label htmlFor="highSchoolGraduationYear">
                  What year did / will you graduate high school?
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="highSchoolGraduationYear"
                  placeholder="Enter High School Graduation Year"
                  onChange={(e) => setHighSchoolGraduationYear(e.target.value)}
                />
              </div>

              {/* expected finish time */}
              <div className="form-group">
                <label htmlFor="expectedFinishTime">
                  What is your expected mile finish time?
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="expectedFinishTime"
                  placeholder="Enter Expected Finish Time"
                  onChange={(e) => setExpectedFinishTime(e.target.value)}
                />
              </div>

              {/* message */}
              <div className="form-group">
                <label htmlFor="message">
                  Questions / Comments / Suggestions
                </label>
                <small id="message-help" className="form-text text-muted">
                  Leave any questions, comments, or suggestions here
                </small>
                <textarea
                  type="text"
                  className="form-control"
                  id="message"
                  placeholder="Enter Questions"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <br />

              {/* Error Message Display Div */}
              {formError ? (
                <div
                  id="error-message"
                  className="alert alert-danger"
                  role="alert"
                >
                  <strong>Error!</strong> {formError}
                </div>
              ) : null}

              {/* submit button */}
              <button
                type="submit"
                className="btn btn-lg btn-block btn-primary"
                style={{
                  fontSize: "20px",
                  backgroundColor: "black",
                  color: "orange",
                  fontWeight: "bold",
                }}
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
      <div className="breadcrumbDiv">
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <a href="/hoover">Hoover Christmas Eve Mile Race</a>
            </li>
          </ol>
        </nav>
      </div>
      <div className="home">
        <h2 className="text-center">Reunion Mile Race Signup</h2>
        <hr />
        <h3 className="text-center">Thanksgiving Day</h3>
        <span className="text-center">(Thu Nov 28, 2024)</span>
        <hr />
        <h5 className="text-center">AND</h5>
        <hr />
        <h3>Christmas Eve</h3>
        <span className="text-center">(Tue Dec 24, 2024)</span>
        <hr />
        <p className="text-center">
          Hoover HS track
          <br />
          <br />
          9:30am: meet at track
          <br />
          10:00am: first race start
          <br />
          *more races starting after if needed*
          <br />
          <br />
          Check back here for ongoing race updates.
        </p>
        <div
          style={{
            // text align justified and centered
            textAlign: "justify",
            textJustify: "inter-word",
          }}
        >
          <div
            style={{ marginBottom: "20px" }} // 20px space between images
          >
            <img
              src={`https://s3.amazonaws.com/social-images-public/main/hoover_run_2023_002.jpg`}
              style={{
                maxWidth: "100%", // make image responsive
                display: "block", // center the image
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            {/* label below photo in italic text */}
            <p style={{ fontStyle: "italic", textAlign: "center" }}>
              2023 Christmas Eve Mile Race
            </p>
          </div>
          <h3 style={{ textAlign: "center" }}>Signup Here!</h3>
          <div className="text-center">
            {/* nice looking button linking to google form */}
            <button
              className="btn btn-lg btn-block btn-success"
              style={{
                fontSize: "18px",
                marginTop: "15px",
                marginBottom: "15px",
              }}
              onClick={() =>
                window.open("https://forms.gle/5i4H3GmzVf7fHL7J7", "_blank")
              }
              type="button"
            >
              Signup
            </button>
          </div>
          <h3 style={{ textAlign: "center" }}>Updates</h3>
          <p
            style={{
              textAlign: "center",
            }}
          >
            None yet. Continue checking back.
          </p>

          <h3 style={{ textAlign: "center" }}>Photos / Group Chat</h3>
          <p>
            We will post photos in the GroupMe Chat after the race that you can
            join here. You can also discuss the race here.
          </p>
          {/* button to gropume share link (external) with GroupMe Colors */}
          <button
            className="btn btn-lg btn-block btn-success"
            style={{
              fontSize: "18px",
              marginTop: "15px",
              marginBottom: "15px",
              backgroundColor: "#00aae4",
              color: "white",
            }}
            onClick={() =>
              window.open(
                "https://groupme.com/join_group/103443666/UVdfgUPP",
                "_blank"
              )
            }
          >
            Join GroupMe Chat
          </button>

          <h3 style={{ textAlign: "center" }}>Who?</h3>
          <p>
            Invite your fellow Hoover alumni, former competitors from rival
            schools, spouses, family, and friends.
          </p>
          <h3 style={{ textAlign: "center" }}>Current RSVPs</h3>

          <ul
            style={{
              // no bullets
              listStyleType: "none",
            }}
          >
            <li>Coach Hind</li>
            <li>David Hudman (2010)</li>
          </ul>
          <h3 style={{ textAlign: "center" }}>When/Where?</h3>
          <p>
            There will be two races. One will be Thanksgiving Day (Thu Nov 28,
            2024) and the other will be Xmas Eve (Tue Dec 24, 2024). Both races
            will take place at 10am at the Hoover High School track.
          </p>
          <p>
            If the track is in use, we'll meet at the gate outside the track and
            run the one mile road loop around the school.
          </p>
          <p>
            This is the second annual race. We're expecting this year to be
            bigger than last year where 40 runners showed up.
          </p>
          <h3 style={{ textAlign: "center" }}>What?</h3>
          <p>
            This is a one mile race at the Hoover High School track with
            friends.
          </p>
          <p>
            There's no plan to have any official timing or anything like that,
            so bring your watch if you want a time. If the track is in use for
            some reason, then our fallback plan is to run the mile loop on the
            road around the school.
          </p>
          <p>
            This is very unofficial, but your biggest rivals may rub it in your
            face if they beat you.
          </p>
          <p>
            Several people have told me that they plan to come just to watch and
            hang out. That's great too!
          </p>
          <h3 style={{ textAlign: "center" }}>Cost?</h3>
          <p style={{ textAlign: "center" }}>Free!</p>
          <div className="text-center" hidden={true}>
            <p>
              If you'd like to donate, I'll put the money towards coffee or
              snacks or something.
            </p>
            <button
              onClick={() => navigate("/pay")}
              className="btn btn-lg btn-block btn-default"
              style={{
                fontSize: "18px",
                backgroundColor: "black",
                color: "orange",
                fontWeight: "bold",
              }}
            >
              Donate Here
            </button>
          </div>
          <hr />
        </div>
        {/* see more button that toggles setIsFormHidden */}
        <div className="text-center" hidden={true}>
          <button
            type="button"
            className="btn btn-lg btn-block btn-secondary"
            style={{
              fontSize: "18px",
              marginTop: "15px",
              marginBottom: "15px",
            }}
            onClick={() => setIsFormHidden(!isFormHidden)}
          >
            {isFormHidden ? "Signup" : "See Less"}
          </button>
        </div>
        {/* nice looking button linking to google form */}
        <div className="text-center">
          {/* nice looking button linking to google form */}
          <button
            className="btn btn-lg btn-block btn-success"
            style={{
              fontSize: "18px",
              marginTop: "15px",
              marginBottom: "15px",
            }}
            onClick={() =>
              window.open("https://forms.gle/5i4H3GmzVf7fHL7J7", "_blank")
            }
            type="button"
          >
            Signup
          </button>
        </div>
        <div hidden={isFormHidden}>
          <h3>Competitor Sign Up</h3>

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
              <strong>Success!</strong> We received your race entry. We will be
              in touch soon. Thank you!
            </div>
          ) : null}

          {/* Loading Message Display Div */}
          {!formEnabled && !formError && progressBarValue != 100 ? (
            <>
              <div
                id="loading-message"
                className="alert alert-info"
                role="alert"
              >
                <strong>
                  If you are not shown a success message within 10 seconds,
                  please refresh the page and try again.
                </strong>
              </div>
              {/* create a loading spinner with inline css */}
              <ProgressBar now={progressBarValue} animated />
            </>
          ) : null}

          {getWaitingListForm()}

          <br />
          <br />
          <br />
        </div>
      </div>

      <hr />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Hoover;
