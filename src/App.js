/* eslint-disable jsx-a11y/href-no-hash */
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

// import Navbar from "./components/layout/Navbar";
import NavbarCustom from "./components/NavbarCustom/NavbarCustom";
// import Home from "./components/pages/Home";
import Home from "./components/pages/Home/Home";
import App1 from "./components/pages/App1/App1";
// eslint-disable-next-line import/no-named-as-default
import App2 from "./components/pages/App2/App2";
import App3 from "./components/pages/App3/App3";
import Pay from "./components/pages/Pay/Pay";
import Payment from "./components/pages/Payment/Payment";
import AddMerchant from "./components/pages/AddMerchant/AddMerchant";
import Merchant from "./components/pages/Merchant/Merchant";
import PrintMerchantQr from "./components/pages/PrintMerchantQr/PrintMerchantQr";

import Map from "./components/pages/Map/Map";
import Terms from "./components/pages/Terms/Terms";
import Privacy from "./components/pages/Privacy/Privacy";

const App = () => (
  <Router>
    <Fragment>
      <NavbarCustom />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/add-merchant" element={<AddMerchant />} />
        <Route path="/paybch" element={<App1 />} />
        <Route path="/merchant/:merchantId" element={<Merchant />} />
        <Route path="/printqr/:merchantName" element={<PrintMerchantQr />} />
        <Route path="/map" element={<Map />} />
        {/* If you ever change /privacy or /tos - update google cloud app links for those */}
        <Route path="/tos" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/1" element={<App1 />} />
        <Route path="/2" element={<App2 />} />
        <Route path="/3" element={<App3 />} />
      </Routes>
    </Fragment>
  </Router>
);

export default App;
