import React from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
} from "react-router-dom";

import "./flylert.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../other/Footer/Footer";

const Flylert = () => {
  return (
    <div className="outer-page-container">
      {/* breadcrumb links to higher pages */}
      <div className="breadcrumbDiv">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Flylert
            </li>
          </ol>
        </nav>
      </div>

      <div className="page">
        <h1>Flylert</h1>
        {/* create an italicized subtitle in grey text below */}
        <h4>
          <i>low airfare for flexible adventurers</i>
        </h4>

        <br />

        <div className="page-content">
          <div className="">
            <a
              title="Janayna Velozo, CC BY 2.0 &lt;https://creativecommons.org/licenses/by/2.0&gt;, via Wikimedia Commons"
              href="https://commons.wikimedia.org/wiki/File:Above_the_world.._(8598303011).jpg"
            >
              <img
                width="256"
                alt="Above the world.. (8598303011)"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Above_the_world.._%288598303011%29.jpg/256px-Above_the_world.._%288598303011%29.jpg"
              />
            </a>
          </div>
          <div className="">
            <h3>About Me</h3>
            <p style={{ textAlign: "left" }}>
              I'm David Hudman, and I created Flylert to allow users to see the
              cheapest flight deals for various destinations.
              <br />
              <br />
              When users sign up, they set their home airports and their
              preferred destinations. Then, I start scanning the internet for
              the cheapest flight deals based on their preferences.
              <br />
              <br />I will then send these deals directly to my users' email
              inboxes, so they can see hundreds of amazing deals to destinations
              all over the world in one simple email. When users click on any
              flight price in the email, I track it and alert the user if the
              flight price drops.
            </p>
            <br />
            <h3>Tech Stack</h3>
            <p>React, Node.js, AWS (API Gateway, Lambda, RDS / MySQL)</p>
            <br />
            <a
              href="https://www.flylert.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg btn-block btn-warning"
              style={{ fontSize: "18px" }}
            >
              Visit Flylert.com
            </a>
            <br />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Flylert;
