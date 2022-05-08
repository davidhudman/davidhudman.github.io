import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/layout/Navbar";
import NavbarCustom from "./components/NavbarCustom/NavbarCustom";
// import Home from "./components/pages/Home";
import Home from "./components/pages/Home/Home";
import App1 from "./components/pages/App1/App1";
import App2 from "./components/pages/App2/App2";
import App3 from "./components/pages/App3/App3";

const App = () => {
  return (
    <Router>
      <Fragment>
        <NavbarCustom />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pay" element={<App1 />} />
          <Route path="/1" element={<App1 />} />
          <Route path="/2" element={<App2 />} />
          <Route path="/3" element={<App3 />} />
        </Routes>
      </Fragment>
    </Router>
  );
};

export default App;
