import React from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
  useNavigate,
} from "react-router-dom";

import "./home.css";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "../../other/Footer/Footer";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="outer-home-container">
      <div className="home">
        <h1>David Hudman</h1>
        <h4>Full Stack Web Developer</h4>

        <br />

        <div className="home-links">
          <button
            onClick={() => navigate("/pay")}
            className="btn btn-lg btn-block btn-default"
            style={{ fontSize: "18px" }}
          >
            Donate / Pay Me
          </button>
          <br />

          {/* Professional */}
          <button
            onClick={() => navigate("/professional")}
            className="btn btn-lg btn-block btn-primary"
            style={{ fontSize: "18px" }}
          >
            Resume & Portfolio
          </button>
          <br />
          <button
            onClick={() => navigate("/bitcoin")}
            className="btn btn-lg btn-block btn-success"
            style={{ fontSize: "18px" }}
          >
            Bitcoin Cash
          </button>
          <br />
          <button
            onClick={() => navigate("/fly")}
            className="btn btn-lg btn-block btn-warning"
            style={{ fontSize: "18px" }}
          >
            Flylert: cheap flight emails
          </button>
          <br />
          <button
            onClick={() =>
              window.open("https://www.lightspeedpacing.com", "_blank")
            }
            className="btn btn-lg btn-block btn-info"
            style={{ fontSize: "18px" }}
          >
            Light Speed Pacing: track lights
          </button>
          <br />
          <button
            onClick={() => navigate("/events")}
            className="btn btn-lg btn-block btn-danger"
            style={{ fontSize: "18px" }}
          >
            Events
          </button>
          <br />
          <button
            onClick={() => navigate("/coach")}
            className="btn btn-lg btn-block"
            style={{
              fontSize: "18px",
              backgroundColor: "purple",
              color: "white",
            }}
          >
            Personal Coaching
          </button>
          <br />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
