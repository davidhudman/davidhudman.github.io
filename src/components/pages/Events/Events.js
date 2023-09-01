import React, { useState, useEffect } from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import * as yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import axios from "axios";

import SocialLinks from "../../other/SocialLinks/SocialLinks";

import "./events.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../other/Footer/Footer";

const EVENT_API_URL = `https://4cljs7mcdi.execute-api.us-east-1.amazonaws.com/default/socialevents`;

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
  const [isCreateAndJoinListHidden, setIsCreateAndJoinListHidden] =
    useState(true);

  const { eventId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [unlockParagraphClickCount, setUnlockParagraphClickCount] = useState(0);
  const [env, setEnv] = useState("production");
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({});

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

  // function to convert date "May 29, 2023" to "Mon May 29"
  const convertDate = (date) => {
    const d = new Date(date);
    const day = d.toLocaleString("default", { weekday: "short" });
    const month = d.toLocaleString("default", { month: "short" });
    const dayOfMonth = d.getDate();
    return `${day} ${month} ${dayOfMonth}`;
  };

  const getSignUpPage = () => {
    return (
      <>
        <div className="home">
          {/* event link is href={`/events/${event.socialEventId}`} */}
          {/* display each element in events array in a clean bootstrap card */}
          {events.length > 0 ? (
            events.map((eventItem) => {
              // if date is before yesterday, don't show it
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              const eventDate = new Date(eventItem.date);
              if (eventDate < yesterday) {
                return null;
              }
              return (
                <div
                  className="card"
                  style={{
                    width: "100%",
                    border: "1px solid black",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <a href={`/events/${eventItem.socialEventId}`}>
                    <div className="card-body">
                      <div className="card-title" style={{ fontSize: "18px" }}>
                        {eventItem.title}
                      </div>
                      <div className="card-footer text-muted">
                        {convertDate(eventItem.date)} {eventItem.time}
                      </div>
                      <div className="card-footer text-muted">
                        @ {eventItem.location}
                      </div>
                    </div>
                  </a>
                </div>
              );
            })
          ) : (
            <div className="text-center">
              <i className="fa fa-spinner fa-spin fa-3x"></i>
            </div>
          )}

          <br />

          <h4>
            <a href="http://www.beachsocialgroup.com">
              Beach Social Group 20s 30s
            </a>
          </h4>
          <br />

          {SocialLinks()}

          <hr />

          {/* see more button that toggles setIsCreateAndJoinListHidden */}
          <div className="text-center">
            <button
              type="button"
              className="btn btn-lg btn-block btn-secondary"
              style={{ fontSize: "18px" }}
              onClick={() =>
                setIsCreateAndJoinListHidden(!isCreateAndJoinListHidden)
              }
            >
              {isCreateAndJoinListHidden ? "See More" : "See Less"}
            </button>
          </div>

          {/* button to navigate to create event page */}
          <div hidden={isCreateAndJoinListHidden}>
            <hr />
            <div className="create-event-button">
              <Link to="/events/create">
                <button
                  type="button"
                  className="btn btn-lg btn-block btn-primary"
                  style={{ fontSize: "18px" }}
                >
                  Create Your Own Event
                </button>
              </Link>
            </div>

            <hr />
            <strong>Join the email list for events</strong>

            <hr />

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

            {/* Success Message Display Div */}
            {formSuccess ? (
              <div
                id="success-message"
                className="alert alert-success"
                role="alert"
              >
                <strong>Success!</strong> You have been added to the event
                mailing list.
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
          </div>
        </div>
      </>
    );
  };

  useEffect(async () => {
    // create a mock function that will return a list of events after a delay
    let useMocks = false;
    if (!useMocks) {
      if (eventId) {
        // get events from this api - specific event
        await fetch(`${EVENT_API_URL}?id=${eventId}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("specific event data: ", data);
            if (data && data.socialEvents && data.socialEvents.Item) {
              console.log("setting event: ", data.socialEvents.Item);
              setEvent(data.socialEvents.Item);
            } else {
            }
          })
          .catch((err) => {
            console.log("err", err);
            return [];
          });
      }
      // get events from this api - all public events
      await fetch(EVENT_API_URL)
        .then((res) => res.json())
        .then((data) => {
          console.log("public events data: ", data);
          if (data && data.socialEvents) {
            // sort events by date
            data.socialEvents.sort((a, b) => {
              return new Date(a.date) - new Date(b.date);
            });
            setEvents(data.socialEvents);
          } else {
            console.log("called public event api, but no events were returned");
          }
        })
        .catch((err) => {
          console.log("err", err);
          return [];
        });
    }
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(
    //       setEvents([
    //         {
    //           socialEventId: "1", // "top-golf-tuesday-001",
    //           title: "A Fake Event For Testing",
    //           date: "May 23, 2023",
    //           time: "7:15 PM",
    //           location: "Jax Beach Pier, Jacksonville, FL",
    //           length: "2 hours",
    //           spacesLeft: 1,
    //           cost: 10,
    //           description: "fish all you want, but eat all you fish",
    //         },
    //       ])
    //     );
    //   }, 1000);
    // });
  }, []);

  const getSpecificEventPage = () => {
    getLoadingEventsPage();
    // let event = null;
    // if (events && events.length > 0) {
    //   oneEvent = events.find((e) => e.socialEventId === eventId);
    // } else
    // if (event && event.socialEventId === eventId) {
    //   console.log("event.socialEventId === eventId, event: ");
    //   event = event;
    // }
    // console.log("oneEvent: ", event);

    // setEvent(oneEvent)

    if (event && event.socialEventId === eventId) {
      return (
        <>
          <div className="home">
            <h4 style={{ fontWeight: "bold" }}>{event.title}</h4>
            <hr />
            <div>{event.cost > 0 ? "$" + event.cost : null}</div>
            <div>
              {event.date} @ {event.time} ({event.length})
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
            <>
              {event.imgKey && (
                <>
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
                        "https://s3.amazonaws.com/social-images-public/" +
                        event.imgKey
                      }
                      target="_blank"
                    >
                      <img
                        src={
                          "https://s3.amazonaws.com/social-images-public/" +
                          event.imgKey
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
            <p>
              {
                <>
                  {/* show event.description but replace "\n" with line breaks */}
                  {event.description.split("\n").map((item, key) => {
                    return (
                      <span key={key}>
                        {/*  "\n" should not be shown */}
                        {item.replace("\\n", "")}
                        {/* add a line break */}
                        <br />
                      </span>
                    );
                  })}
                </>
              }
            </p>
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
                <h3>Sold Out!</h3>
                <a
                  type="button"
                  href="/events"
                  className="btn btn-lg btn-warning"
                  style={{ fontSize: "18px", width: "100%" }}
                >
                  Sign up for the wait list
                </a>
              </div>
            ) : event.cost > 0 ? (
              <div className="text-center">
                <a
                  type="button"
                  href="/pay"
                  className="btn btn-lg btn-success"
                  style={{ fontSize: "18px", width: "100%" }}
                >
                  Reserve Your Spot - Pay Now
                </a>
              </div>
            ) : event && event.spacesLeft == 0 ? (
              <div className="text-center">
                <h3>Event Full</h3>
                <a
                  type="button"
                  href="/events"
                  className="btn btn-lg btn-warning"
                  style={{ fontSize: "18px", width: "100%" }}
                >
                  Sign up for wait list
                </a>
              </div>
            ) : (
              <>{/* reserve for free */}</>
            )}
            {/* edit button - onPress, render page for /create and fill fields with event info */}
            <br />
            <div className="text-center">
              <button
                type="button"
                className="btn btn-block btn-lg btn-primary"
                style={{ fontSize: "18px", width: "100%" }}
                onClick={() => {
                  // Construct query params from event details
                  const queryParams = new URLSearchParams(event).toString();

                  // Use the history object to navigate to the create page with the event details as query parameters
                  navigate(`/events/create?${queryParams}`);
                }}
              >
                Admin Edit
              </button>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="home">
            <div className="text-center">
              <i className="fa fa-spinner fa-spin fa-3x"></i>
            </div>
            <h1>Event Loading</h1>
            {/* in small text, show "try refreshing page" */}
            <div className="text-muted">
              Try refreshing the page if it takes a while.
            </div>
          </div>
        </>
      );
    }
  };

  const getCreateEventForm = () => {
    const searchParams = new URLSearchParams(location.search);
    try {
      const socialEventId = searchParams.get("socialEventId");
    } catch (err) {
      console.log("err finding search params", err);
    }

    // define the yup schema from this joi schema
    const yupSchema = yup.object().shape({
      title: yup.string().required(),
      password: yup.string().optional(),
      socialEventId: yup.string().required(),
      host: yup.string().required(),
      cost: yup.number().required(),
      description: yup.string().required(),
      date: yup.string().required(),
      time: yup.string().required(),
      length: yup.string().required(),
      location: yup.string().optional(),
      generalpublic: yup.boolean().optional(),
      spacesLeft: yup.string().optional(),
    });

    const generateSocialEventId = (title, date) => {
      return `${title
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase()}-${
        date.includes(new Date().getFullYear())
          ? date
              .replace(/[^a-zA-Z0-9 ]/g, "")
              .replace(/\s+/g, "-")
              .toLowerCase()
          : `${date
              .replace(/[^a-zA-Z0-9 ]/g, "")
              .replace(/\s+/g, "-")
              .toLowerCase()}-${new Date().getFullYear()}`
      }`;
    };

    const getInitialValues = () => {
      const searchParams = new URLSearchParams(location.search);
      try {
        const socialEventId = searchParams.get("socialEventId");
        const title = searchParams.get("title");
        const cost = searchParams.get("cost");
        const host = searchParams.get("host");
        const description = searchParams.get("description");
        const date = searchParams.get("date");
        const time = searchParams.get("time");
        const length = searchParams.get("length");
        const location = searchParams.get("location");
        const generalpublic = searchParams.get("generalpublic");
        const spacesLeft = searchParams.get("spacesLeft");

        return {
          socialEventId: generateSocialEventId(title, date),
          title: title ?? "",
          host: host ?? "",
          cost: cost ?? 0,
          description: description ?? "",
          date: date ?? "",
          time: time ?? "",
          length: length ?? "",
          location: location ?? "",
          generalpublic: generalpublic ?? false,
          spacesLeft: spacesLeft ?? "",
        };
      } catch (err) {
        console.log("err finding search params", err);
        return {
          title: "",
          host: "",
          password: "",
          socialEventId: "",
          cost: 0,
          description: "",
          date: "",
          time: "",
          length: "",
          location: "",
          generalpublic: false,
          spacesLeft: "",
        };
      }
    };

    return (
      <>
        <div className="home">
          <h1>Create Event</h1>
          <Formik
            initialValues={getInitialValues()}
            validationSchema={yupSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log("values", values);
              setSubmitting(true);
              // make async call - POST request to same URL as GET
              axios
                .post(EVENT_API_URL, values)
                .then((res) => {
                  console.log("res", res);
                  setSubmitting(false);

                  // if res status is not 2XX, then throw error
                  if (res.status !== 200 && res.status !== 201) {
                    setErrorMessage("Error creating event");
                    return;
                  }

                  // set success message
                  setSuccessMessage("Event created successfully");
                  setErrorMessage("");

                  // set timeout to clear success message after 5 seconds
                  setTimeout(() => {
                    setSuccessMessage("");
                    if (res?.data?.dbVal?.socialEventId) {
                      navigate(`/events/${res?.data?.dbVal?.socialEventId}`);
                    }
                  }, 2000);

                  resetForm();
                  setEvents([...events, res.data]);
                })
                .catch((error) => {
                  console.log("error", error);
                  setSubmitting(false);
                  if (
                    error.response &&
                    error.response.data &&
                    error.response.data.error
                  ) {
                    setErrorMessage(error.response.data.error);
                  }
                });
            }}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              } = props;
              // add these two functions
              const handleTitleChange = (e) => {
                handleChange(e);
                const newSocialEventId = generateSocialEventId(
                  e.target.value,
                  values.date
                );
                setFieldValue("socialEventId", newSocialEventId);
              };

              const handleDateChange = (e) => {
                handleChange(e);
                const newSocialEventId = generateSocialEventId(
                  values.title,
                  e.target.value
                );
                setFieldValue("socialEventId", newSocialEventId);
              };
              return (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <Field
                      name="title"
                      id="title"
                      placeholder="Title"
                      type="text"
                      onChange={handleTitleChange}
                      className={`form-control ${
                        touched.title && errors.title ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="input-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      name="password"
                      id="password"
                      placeholder="Password"
                      type="password"
                      className={`form-control ${
                        touched.title && errors.title ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="input-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <Field
                      name="date"
                      id="date"
                      placeholder="Date"
                      type="text"
                      onChange={handleDateChange}
                      className={`form-control ${
                        touched.title && errors.title ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="input-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="socialEventId">Social Event ID</label>
                    <Field
                      name="socialEventId"
                      id="socialEventId"
                      placeholder="Social Event ID"
                      type="text"
                      className={`form-control ${
                        touched.title && errors.title ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="socialEventId"
                      component="div"
                      className="input-feedback"
                    />
                  </div>
                  {/* Add a new field and errormessage for event creator name */}
                  <div className="form-group">
                    <label htmlFor="host">Your Name</label>
                    <Field
                      name="host"
                      id="host"
                      placeholder="Your Name"
                      type="text"
                      className={`form-control ${
                        touched.title && errors.title ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="host"
                      component="div"
                      className="input-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cost">Cost</label>
                    <Field
                      name="cost"
                      id="cost"
                      placeholder="Cost"
                      type="text"
                      className={`form-control ${
                        touched.title && errors.title ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="cost"
                      component="div"
                      className="input-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Field
                      name="description"
                      id="description"
                      placeholder="Description"
                      component="textarea"
                      rows="4"
                      type="text"
                      className={`form-control ${
                        touched.title && errors.title ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="input-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <Field
                      name="time"
                      id="time"
                      placeholder="Time"
                      type="text"
                      className={`form-control ${
                        touched.title && errors.title ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="time"
                      component="div"
                      className="input-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="length">Length</label>
                    <Field
                      name="length"
                      id="length"
                      placeholder="Length"
                      type="text"
                      className={`form-control ${
                        touched.title && errors.title ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="length"
                      component="div"
                      className="input-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <Field
                      name="location"
                      id="location"
                      placeholder="Location"
                      type="text"
                      className={`form-control ${
                        touched.title && errors.title ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="input-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="generalpublic">General Public</label>
                    <Field
                      name="generalpublic"
                      id="generalpublic"
                      type="checkbox"
                      checked={values.generalpublic}
                      className={`form-control ${
                        touched.title && errors.title ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="generalpublic"
                      component="div"
                      className="input-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="spacesLeft">Spaces Left</label>
                    <Field
                      name="spacesLeft"
                      id="spacesLeft"
                      placeholder="Spaces Left"
                      type="text"
                      className={`form-control ${
                        touched.title && errors.title ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="spacesLeft"
                      component="div"
                      className="input-feedback"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </form>
              );
            }}
          </Formik>
        </div>
      </>
    );
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
            <>
              <div className="text-center">
                <i className="fa fa-spinner fa-spin fa-3x"></i>
              </div>
              <h1>Event Loading...</h1>
            </>
          )}
        </div>
      </>
    );
  };
  return (
    <div className="outer-home-container">
      {/* breadcrumb links to higher pages */}
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
              <a href="/events">Events</a>
            </li>
          </ol>
        </nav>
      </div>

      {eventId && eventId.startsWith("create")
        ? getCreateEventForm()
        : eventId && eventId.length > 0
        ? getSpecificEventPage()
        : getSignUpPage()}

      <br />
      <br />
      <br />

      {/* show success message */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {/* show error message */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <hr />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Events;
