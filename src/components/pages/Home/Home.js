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
        <button className="btn btn-lg btn-block btn-default">
            <Link to="/pay">Pay or Tip Me</Link>
          </button>
          <br />
          
          <a
            href="https://drive.google.com/file/d/1EUCtMWTBrS1XcNVteu6IcWiR9XNa1U1s/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-primary"
          >
            Download Resume PDF
          </a>
          <br />
          <a
            href="https://www.linkedin.com/in/davidhudman/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-default"
          >
            LinkedIn
            <i className="fab fa-linkedin"></i>
          </a>
          <br />
          <a
            href="https://www.github.com/davidhudman/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-primary"
          >
            Github
          </a>
          <br />
          <a
            href="https://www.github.com/davidhudman/personal-resume-site"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-default"
          >
            View Code for This Site
          </a>
          <br />
          

          {/* Buffer */}

          <h2>Projects</h2>
          <br />
          <a
            href="https://www.flylert.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-warning"
          >
            Flylert: cheap flight emails
          </a>
          <br />
          <a
            href="https:www.lightspeedpacing.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-info"
          >
            Light Speed Pacing: track lights
          </a>
          <br />
        </div>

        {/* footer */}
        <div className="footer">
          <p>
            &copy; {new Date().getFullYear()} David Hudman
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
