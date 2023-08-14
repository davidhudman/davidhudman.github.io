import React from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
} from "react-router-dom";

import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div className="outer-home-container">
      <div className="home">
        <h1>David Hudman</h1>
        <h4>Full Stack Web Developer</h4>

        <br />

        <div className="home-links">
          <a
            className="btn btn-lg btn-block btn-default"
            style={{ fontSize: "18px" }}
            href="/pay"
          >
            Donate / Pay Me
          </a>
          <br />

          <a
            href="https://drive.google.com/file/d/11g9-P2hGSXU8WgvZXUGOleyBw8pFMRqP/view"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-primary"
            style={{ fontSize: "18px" }}
          >
            Download Resume PDF
          </a>
          <br />
          <a
            href="https://www.linkedin.com/in/davidhudman/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-default"
            style={{ fontSize: "18px" }}
          >
            LinkedIn
          </a>
          <br />
          <a
            href="https://www.github.com/davidhudman/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-primary"
            style={{ fontSize: "18px" }}
          >
            Github
          </a>
          <br />
          <a
            href="https://www.github.com/davidhudman/personal-resume-site"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-default"
            style={{ fontSize: "18px" }}
          >
            View Site Code
          </a>
          <br />

          {/* Buffer */}

          <h2>Projects</h2>
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

        {/* footer */}
        <div className="footer">
          <p>&copy; {new Date().getFullYear()} David Hudman</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
