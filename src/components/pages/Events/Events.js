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
                  Tell me which event you're waiting for and/or what you're
                  interested in and how you found this site
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
      if (eventId) {
        // get events from this api - specific event
        return fetch(
          `https://4cljs7mcdi.execute-api.us-east-1.amazonaws.com/default/socialevents?id=${eventId}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("specific event data: ", data);
            if (data && data.socialEvents && data.socialEvents.Item) {
              setEvents([data.socialEvents.Item]);
            } else {
            }
          })
          .catch((err) => {
            console.log("err", err);
            return [];
          });
      } else {
        // get events from this api - all public events
        return fetch(
          "https://4cljs7mcdi.execute-api.us-east-1.amazonaws.com/default/socialevents"
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("public events data: ", data);
            if (data && data.socialEvents) {
              setEvents(data.socialEvents);
            } else {
              console.log(
                "called public event api, but no events were returned"
              );
            }
          })
          .catch((err) => {
            console.log("err", err);
            return [];
          });
      }
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
            <div>{event.cost > 0 ? "$" + event.cost : "Free to attend"}</div>
            <div>{event.date}</div>
            <div>
              {event.time} ({event.length})
            </div>
            <div>{event.location}</div>
            <div>
              {event.spacesLeft != "" ? (
                <>
                  <strong>Spaces Left:</strong> {event.spacesLeft}
                </>
              ) : null}
            </div>
            <hr />
            <p>{event.description}</p>
            <br />
            <div>
              {event.spacesLeft > 0 && event.cost > 0 ? (
                <>
                  Spots go to the first people to pay. When they're gone,
                  they're gone. Remaining spots will update shortly after you
                  pay. I will see your name on Venmo/CashApp, but{" "}
                  <b>
                    you must write your name in the description if you pay with
                    Crypto
                  </b>
                  .
                </>
              ) : null}
            </div>
            <hr />
            {/* Pay button */}
            {event.spacesLeft != "" && event.spacesLeft == 0 ? (
              <div className="text-center">
                <a
                  type="button"
                  href="/events"
                  className="btn btn-lg btn-warning"
                  style={{ fontSize: "18px" }}
                >
                  Sold Out! Sign up for the waiting list.
                </a>
              </div>
            ) : event.cost > 0 ? (
              <div className="text-center">
                <a
                  type="button"
                  href="/pay"
                  className="btn btn-lg btn-success"
                  style={{ fontSize: "18px" }}
                >
                  Reserve Your Spot - Pay Now
                </a>
              </div>
            ) : (
              <div className="text-center">
                <a
                  type="button"
                  href="/events"
                  className="btn btn-lg btn-warning"
                  style={{ fontSize: "18px" }}
                >
                  Sign up to be notified for future events
                </a>
              </div>
            )}
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
    }, 5000);
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
