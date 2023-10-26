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
                "https://drive.google.com/file/d/1QX5Ka-XCbo2vj6GCbFPjERbGCKjlD89a/view",
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
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Professional;
