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
        <h1>Jax Social Group</h1>
        <h4>come hang with us</h4>

        <br />

        <div className="home-links">
          <a
            href="https://www.meetup.com/jax-social-group-20s-30s/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-primary"
          >
            Upcoming Events
          </a>
          <br />
          <a
            href="https://www.facebook.com/Jax-Social-Group-102412898875152/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-default"
          >
            Facebook
            <i className="fab fa-facebook"></i>
          </a>
          <br />
          <a
            href="https://www.instagram.com/jaxsocialgroup/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block btn-primary"
          >
            Instagram
          </a>
          <br />
          {/* <button className="btn btn-lg btn-block btn-default">
            <Link to="/pay">Buy Merch</Link>
          </button>
          <br /> */}
        </div>

        {/* footer */}
        <div className="footer">
          <p>&copy; {new Date().getFullYear()} Jax Social Group</p>
          <p>
            <a
              href="http://davidhudman.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Designed by David Hudman
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
