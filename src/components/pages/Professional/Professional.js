import React from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
} from "react-router-dom";

import "./professional.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../other/Footer/Footer";

const Professional = () => {
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
              Professional
            </li>
          </ol>
        </nav>
      </div>

      <div className="page">
        <h1>Professional Links</h1>

        <br />

        <div className="page-content">
          <a
            href="https://drive.google.com/file/d/1QX5Ka-XCbo2vj6GCbFPjERbGCKjlD89a/view"
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
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Professional;
