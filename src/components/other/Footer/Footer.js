import React, { useState, useEffect } from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
  useParams,
} from "react-router-dom";

import "./footer.css";
import "bootstrap/dist/css/bootstrap.min.css";

// create React component
export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        View{" "}
        <a href="https://www.github.com/davidhudman/personal-resume-site">
          site code
        </a>
        .<p>&copy; {new Date().getFullYear()} David Hudman</p>
      </div>
    );
  }
}
