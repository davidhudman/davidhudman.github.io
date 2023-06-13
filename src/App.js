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
import StrawPurchase from "./components/pages/StrawPurchase/StrawPurchase";
import Wallet from "./components/pages/Wallet/Wallet";
import OrderReceived from "./components/pages/OrderReceived/OrderReceived";
import FormWaitingList from "./components/pages/FormWaitingListAgentPurchases/FormWaitingList";
import FormNewRestaurantAgentPurchase from "./components/pages/FormNewRestaurantAgentPurchase/FormNewRestaurantAgentPurchase";
import Events from "./components/pages/Events/Events";
import Coach from "./components/pages/Coach/Coach";

const App = () => (
  <Router>
    <Fragment>
      {/* <NavbarCustom /> */}
      <Routes>
        {/* fix react router for when user navigates to a specific link */}
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/bitcoin" element={<Payment />} />
        <Route path="/cash" element={<Payment />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/strawpurchase" element={<StrawPurchase />} />
        <Route path="/agentpurchase" element={<StrawPurchase />} />
        <Route path="/agent-purchase" element={<StrawPurchase />} />
        <Route path="/proxy-purchase" element={<StrawPurchase />} />
        <Route path="/proxy" element={<StrawPurchase />} />
        <Route path="/agent" element={<StrawPurchase />} />
        <Route path="/cracker" element={<StrawPurchase />} />
        <Route path="/cb" element={<StrawPurchase />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<Events />} />
        <Route path="/agent/:id" element={<StrawPurchase />} />
        <Route
          path="/waiting-list-agent-purchase"
          element={<FormWaitingList />}
        />
        <Route path="/wait" element={<FormWaitingList />} />
        <Route
          path="/new-restaurant-agent"
          element={<FormNewRestaurantAgentPurchase />}
        />
        <Route path="/coach" element={<Coach />} />
        <Route path="/train" element={<Coach />} />
        <Route path="/trainer" element={<Coach />} />

        <Route path="/new" element={<FormNewRestaurantAgentPurchase />} />
        <Route path="/add-merchant" element={<AddMerchant />} />
        <Route path="/add" element={<AddMerchant />} />
        <Route path="/paybch" element={<App1 />} />
        <Route path="/merchant/:merchantId" element={<Merchant />} />
        <Route path="/order-received/:id" element={<OrderReceived />} />
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
