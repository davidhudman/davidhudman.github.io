import React, { useState, useEffect } from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
} from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import * as yup from "yup";

import "./coach.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../other/Footer/Footer";

const Coach = () => {
  const [formEnabled, setFormEnabled] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [formType, setFormType] = useState("waitingListAgentPurchases");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [isFormHidden, setIsFormHidden] = useState(true);

  const [unlockParagraphClickCount, setUnlockParagraphClickCount] = useState(0);
  const [env, setEnv] = useState("production");
  const [progressBarValue, setProgressBarValue] = useState(0);

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
          formType: "coach",
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
                <label htmlFor="message">Message</label>
                <br />
                <small id="message-help" className="form-text text-muted">
                  Tell me about how you found this site and what you hope to
                  achieve.
                </small>
                <textarea
                  type="text"
                  className="form-control"
                  id="message"
                  placeholder="Enter Message"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <br />

              {/* submit button */}
              <button
                type="submit"
                className="btn btn-lg btn-block btn-primary"
                style={{ fontSize: "20px" }}
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
        <nav
          aria-label="breadcrumb"
          style={{ width: "100%", textAlign: "left" }}
        >
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <a href="/coach">Coaching</a>
            </li>
          </ol>
        </nav>
      </div>
      <div className="home">
        <h1>Personal Coaching</h1>
        <h3>Training Philosophy</h3>
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
              src={`https://s3.amazonaws.com/social-images-public/run_group_0008.jpg`}
              style={{
                maxWidth: "100%", // make image responsive
                height: "400px", // auto adjust the height
                display: "block", // center the image
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </div>
          <p>My running training is based on the 80/20 rule.</p>
          <p>
            So 80% of my workouts will be focused on zone 2. 20% of my workouts
            will focus on zone 4.
          </p>
          <p>
            Zone 2 is between 60-70% of your max heart rate. Since my max heart
            rate is 200 beats per minute, my zone 2 is between 120-140 beats per
            minute. Zone 4 is between 80-90% of your max heart rate. So my zone
            4 is between 160-180 beats per minute. I never train in zone 3. I
            think zone 3 is a waste of time.
          </p>
          <p>
            By workouts, I mean either running, jogging, or walking. Whatever it
            takes to stay in the proper zone. On zone 2 days, I can stay in zone
            2 the entire time. On zone 4 days, I warm up in zone 2 and cool down
            in zone 2, but the middle part of the session (15 minutes) is zone
            4.
          </p>
          <div
            style={{ marginBottom: "20px" }} // 20px space between images
          >
            <img
              src={`https://s3.amazonaws.com/social-images-public/run_group_me_running_0005.jpeg`}
              style={{
                maxWidth: "100%", // make image responsive
                height: "400px", // auto adjust the height
                display: "block", // center the image
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </div>
          <p>
            So that basically ends up being a 5 day schedule for me where the
            first 4 days are the zone 2 jog/walk. And the final 5th day is the
            zone 4 focused day I described. The key thing is that I must do 4
            workouts that are focused on zone 2 before I'm allowed to do the
            zone 4 focused workout. That's key because if I miss a day, I don't
            want to skip ahead to the zone 4 workout. I still need to do the
            zone 2 workouts first.
          </p>
          <p>
            I think you could apply this same training to cycling or any
            endurance sport. It also works for people who can only stay in zone
            2 if they're walking.
          </p>
          <p>
            Sometimes the last few minutes of my zone 4 workouts will creep up
            into zone 5 but I try to avoid that.
          </p>
          <div
            style={{ marginBottom: "20px" }} // 20px space between images
          >
            <img
              src={`https://s3.amazonaws.com/social-images-public/run_group_0002.jpg`}
              style={{
                maxWidth: "100%", // make image responsive
                height: "400px", // auto adjust the height
                display: "block", // center the image
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </div>
          <p>
            My advice is to save the zone 5 for race efforts. I sort of made
            this up, but I'll try to do a race effort every 25 days because it's
            sort of like the 80/20 rule again but with my hard runs. So that 80%
            of my hard runs are zone 4 and 20% are zone 5 (max effort or close
            to it)
          </p>
          <p>
            And I never hesitate to take a sick day if I'm feeling bad but I
            also don't plan to take off days. So I may run for a month straight
            with no off days but the zone 2 days are so easy that it's not a
            problem for me. If I'm sick, I may take a few days off in a row.
          </p>
          <p>
            Aside from that, I try to do some leg work in the gym like squats,
            calf raises, and glute exercises. And then just staying generally
            active like playing sports throughout the week.
          </p>
        </div>
        {/* see more button that toggles setIsFormHidden */}
        <div className="text-center">
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
            {isFormHidden ? "Get Coaching" : "See Less"}
          </button>
        </div>
        <div hidden={isFormHidden}>
          <strong>Submit this form to join the people I train!</strong>
          <br />
          <br />
          <p>
            I am currently accepting a limited number of people to train. If you
            are interested in personal coaching, please submit this form. I will
            contact you to discuss your goals and how I can help you achieve
            them.
          </p>
          <br />
          <p>
            I primarily work with runners, but I have also worked with people to
            advance their careers and projects in software engineering.
          </p>
          <br />
          <p>
            The first step is always the hardest. Take the first step and submit
            this form.
          </p>

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
              <strong>Success!</strong> We received your submission for personal
              coaching. We will be in touch soon. Thank you!
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

export default Coach;
