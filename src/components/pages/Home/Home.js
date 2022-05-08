import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div className="outer-home-container">
      <div className="home">
        <h1>David Hudman</h1>
        <h4>Full Stack Web Developer</h4>

        <br />
        <br />

        <div className="home-links">
          <a
            href="https://www.github.com/davidhudman/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-default"
          >
            Github
          </a>
          <br />
          <a
            href="https://www.linkedin.com/in/davidhudman/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-primary"
          >
            LinkedIn
            <i className="fab fa-linkedin"></i>
          </a>
          <br />
          <button className="btn btn-lg btn-block btn-default">
            <Link to="/1">Pay Me Crypto</Link>
          </button>

          {/* Buffer */}
          <br />
          <br />

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
      </div>
    </div>
  );
};

export default Home;
