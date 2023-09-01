import React, { useState, useEffect } from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
  useParams,
} from "react-router-dom";

import "./sociallinks.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SocialLinks = () => {
  return (
    <div className="social-links">
      <div className="link-container">
        <a
          href="https://www.meetup.com/beachsocialgroup"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-lg btn-block social-link"
          style={{
            fontSize: "18px",
            backgroundColor: "#ED1C40",
            color: "white",
          }}
        >
          <div className="icon-container">
            <i className="fa fa-calendar"></i>
          </div>
        </a>
        <p className="link-label small">Meetup</p>
      </div>

      <div className="link-container">
        <a
          href="https://www.facebook.com/profile.php?id=100095526403968"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-lg btn-block social-link"
          style={{
            fontSize: "18px",
            backgroundColor: "#4267B2",
            color: "white",
          }}
        >
          <div className="icon-container">
            <i className="fab fa-facebook"></i>
          </div>
        </a>
        <p className="link-label small">Facebook</p>
      </div>

      <div className="link-container">
        <a
          href="https://www.instagram.com/beachsocialgroup/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-lg btn-block social-link"
          style={{
            fontSize: "18px",
            backgroundColor: "#C13584",
            color: "white",
          }}
        >
          <div className="icon-container">
            <i className="fab fa-instagram"></i>
          </div>
        </a>
        <p className="link-label small">Instagram</p>
      </div>
    </div>
  );
};

export default SocialLinks;
