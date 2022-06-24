import React from "react"; // Fragment
import {
    Link,
  } from "react-router-dom";

import "./notfound.css";
import "bootstrap/dist/css/bootstrap.min.css";

const NotFound = () => {
    return (
        <div className="NotFound text-center">
          <h3>Sorry, page not found!</h3>
        </div>
      );
}

export default NotFound;