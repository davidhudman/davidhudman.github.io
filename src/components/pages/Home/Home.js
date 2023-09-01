import React from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
} from "react-router-dom";

import "./home.css";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "../../other/Footer/Footer";

const Home = () => {
  return (
    <div className="outer-home-container">
      <div className="home">
        <h1>David Hudman</h1>
        <h4>Full Stack Web Developer</h4>

        <br />

        <div className="home-links">
          <Link to="/pay">
            <button
              className="btn btn-lg btn-block btn-default"
              style={{ fontSize: "18px" }}
            >
              Donate / Pay Me
            </button>
          </Link>
          <br />

          {/* Professional */}
          <a
            href="/professional"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-primary"
            style={{ fontSize: "18px" }}
          >
            Resume & Portfolio
          </a>
          <br />
          <a
            href="/bitcoin"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-success"
            style={{ fontSize: "18px" }}
          >
            Bitcoin Cash
          </a>
          <br />
          <a
            href="/fly"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-warning"
            style={{ fontSize: "18px" }}
          >
            Flylert: cheap flight emails
          </a>
          <br />
          <a
            href="https://www.lightspeedpacing.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-info"
            style={{ fontSize: "18px" }}
          >
            Light Speed Pacing: track lights
          </a>
          <br />
          <a
            href="/events"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-danger"
            style={{ fontSize: "18px" }}
          >
            Events
          </a>
          <br />
          <a
            href="/coach"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block"
            style={{
              fontSize: "18px",
              backgroundColor: "purple",
              color: "white",
            }}
          >
            Personal Coaching
          </a>
          <br />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
