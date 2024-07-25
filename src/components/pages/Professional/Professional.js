import React from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
  useNavigate,
} from "react-router-dom";

import "./professional.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../other/Footer/Footer";

const Professional = () => {
  const navigate = useNavigate();
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
          <button
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/1d8cA7XNG2A7q6ABedUyLDejInjhJetwI/view",
                "_blank"
              )
            }
            className="btn btn-lg btn-block btn-primary"
            style={{ fontSize: "18px" }}
          >
            Download Resume PDF
          </button>
          <br />
          <button
            onClick={() =>
              window.open("https://www.linkedin.com/in/davidhudman/", "_blank")
            }
            className="btn btn-lg btn-block btn-default"
            style={{ fontSize: "18px" }}
          >
            LinkedIn
          </button>
          <br />
          <button
            onClick={() =>
              window.open("https://www.github.com/davidhudman/", "_blank")
            }
            className="btn btn-lg btn-block btn-primary"
            style={{ fontSize: "18px" }}
          >
            Github
          </button>
          <br />
          <button
            onClick={() =>
              window.open(
                "https://www.github.com/davidhudman/personal-resume-site",
                "_blank"
              )
            }
            className="btn btn-lg btn-block btn-default"
            style={{ fontSize: "18px" }}
          >
            View Site Code
          </button>
          <br />
          <h3>Current Role</h3>
          <br />
          <p>
            I am the sole operator for{" "}
            <a
              href="https://www.activebeaches.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Active Beaches
            </a>
            , a community for active young adults. We host a variety of outdoor
            events, promoting both fitness and friendship.
          </p>
          <p>
            As a full-stack developer proficient in NodeJS, React, and AWS, I've
            built and managed our digital infrastructure, including web design,
            dynamic event sign-up forms, event announcements, database
            management, and secure payment systems.
          </p>
          <p>
            My unique blend of technical skills and community engagement ensures
            Active Beaches runs smoothly and thrives.
          </p>
          <p>Let's discuss how I can bring this expertise to your team.</p>
          <button
            onClick={() =>
              window.open("https://www.activebeaches.com", "_blank")
            }
            className="btn btn-lg btn-block btn-default"
            style={{
              fontSize: "18px",
              // peachy background, appropriate text color
              backgroundColor: "#ffcc99",
              color: "black",
            }}
          >
            Active Beaches
          </button>
          <br />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Professional;
