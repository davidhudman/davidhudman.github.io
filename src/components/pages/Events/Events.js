import React, { useState, useEffect } from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
  useParams,
} from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import * as yup from "yup";

import "./events.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Events = () => {
  const [formEnabled, setFormEnabled] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [formType, setFormType] = useState("waitingListAgentPurchases");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [failedToFindEvent, setFailedToFindEvent] = useState(false);

  const { eventId } = useParams();

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
          formType: "events",
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
                  Tell me about how you found this site and what you hope to get
                  out of the event(s)
                </small>
                <textarea
                  type="text"
                  className="form-control"
                  id="message"
                  placeholder="Enter Message"
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

  const getSignUpPage = () => {
    return (
      <>
        <div className="home">
          <h1>Event List</h1>
          <strong>Submit this form to join the email list for events</strong>
          <br />
          <br />
          <p>
            I may post some social events here from time to time but most will
            be sent via email. I will also notify you about any invites to group
            messages or messaging platforms I use to communicate about the
            events.
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
              <strong>Success!</strong> You have been added to the event mailing
              list.
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
        </div>
        {getWaitingListForm()}
      </>
    );
  };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    // create a mock function that will return a list of events after a delay
    let useMocks = false;
    if (!useMocks) {
      // get events from this api - https://4cljs7mcdi.execute-api.us-east-1.amazonaws.com/default/socialevents
      return fetch(
        "https://4cljs7mcdi.execute-api.us-east-1.amazonaws.com/default/socialevents"
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          setEvents(data.socialEvents);
        })
        .catch((err) => {
          console.log("err", err);
          return [];
        });
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          setEvents([
            {
              socialEventId: "1", // "top-golf-tuesday-001",
              title: "A Fake Event For Testing",
              date: "May 23, 2023",
              time: "7:15 PM",
              location: "Jax Beach Pier, Jacksonville, FL",
              length: "2 hours",
              spacesLeft: 1,
              cost: 10,
              description: "fish all you want, but eat all you fish",
            },
          ])
        );
      }, 1000);
    });
  }, []);

  const getSpecificEventPage = () => {
    const event = events.find((e) => e.socialEventId === eventId);

    if (event) {
      return (
        <>
          <div className="home">
            <h1>{event.title}</h1>
            <div>
              <strong>Date:</strong> {event.date}
            </div>
            <div>
              <strong>Time:</strong> {event.time} ({event.length})
            </div>
            <div>
              <strong>Location:</strong> {event.location}
            </div>
            {/* remaining slots */}
            <div>
              <strong>Spaces Left:</strong> {event.spacesLeft}
            </div>
            {/* cost */}
            <div>
              <strong>Cost:</strong>{" "}
              {event.cost > 0 ? "$" + event.cost : "Free"}
            </div>
            <hr />
            <p>{event.description}</p>
            <br />
            <hr />
            {/* Pay button */}
            <div className="text-center">
              <a
                type="button"
                disabled={event.spacesLeft == 0}
                href="/pay"
                className={
                  event.spacesLeft == 0
                    ? "btn btn-lg btn-warning"
                    : "btn btn-lg btn-success"
                }
                style={{ fontSize: "18px" }}
              >
                Reserve Your Spot - Pay Now
              </a>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="home">
            <h1>Event Not Found</h1>
          </div>
        </>
      );
    }
  };

  const getLoadingEventsPage = () => {
    setTimeout(() => {
      setFailedToFindEvent(true);
    }, 1000);
    return (
      <>
        <div className="home">
          {failedToFindEvent ? (
            <div id="error-message" className="alert alert-danger" role="alert">
              Event not found for this URL: /{eventId}
            </div>
          ) : (
            <h1>Event Loading...</h1>
          )}
        </div>
      </>
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
            <Link to="/events">Event Signup</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Event Page
          </li>
        </ol>
      </nav>

      {eventId && eventId.length > 0
        ? events && events.length > 0
          ? getSpecificEventPage()
          : getLoadingEventsPage()
        : getSignUpPage()}

      <br />
      <br />
      <br />

      <hr />

      {/* footer */}
      <div className="footer">
        <p>&copy; {new Date().getFullYear()} David Hudman</p>
      </div>
    </div>
  );
};

export default Events;
