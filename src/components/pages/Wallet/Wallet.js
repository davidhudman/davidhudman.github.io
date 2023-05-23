import React from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
} from "react-router-dom";

import "./wallet.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Wallet = () => {
  return (
    <div className="outer-home-container">
      {/* breadcrumb links to higher pages */}
      <nav aria-label="breadcrumb" style={{ width: "100%", textAlign: "left" }}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/bitcoin">Bitcoin Cash</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Wallet
          </li>
        </ol>
      </nav>

      <div className="home">
        <h1>Getting Started</h1>
        {/* subtitle */}
        <p>Creating a Bitcoin Wallet</p>
        <br />

        {/* Instructions on creating a Bitcoin.com Wallet copied from usecash.com/start-here */}
        <h3>Step 1: Download Wallet App</h3>
        {/* horizontal line */}
        <hr />
        {/* ios download button */}
        <a
          href="https://apps.apple.com/us/app/bitcoin-wallet-buy-btc-bch/id1252903728"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-lg btn-block btn-primary"
          style={{ fontSize: "18px" }}
        >
          Apple Store Download
        </a>
        <br />

        {/* android download button */}
        <a
          href="https://play.google.com/store/apps/details?id=com.bitcoin.mwallet"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-lg btn-block btn-default"
          style={{ fontSize: "18px" }}
        >
          Google Play Store Download
        </a>
        <br />

        <iframe
          width="350"
          height="197"
          src="https://www.youtube.com/embed/qTjWU5ZLtjs"
          title="How to Download the Bitcoin.com Wallet"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <hr />

        {/* Send and receive Bitcoin Cash */}
        <h3>Step 2: Send and Receive Bitcoin Cash</h3>
        <p>The app is simple and easy to use</p>
        {/* horizontal line */}
        <hr />
        <iframe
          width="350"
          height="197"
          src="https://www.youtube.com/embed/k_gQJy5lzu8"
          title="How to Send and Receive Bitcoin Cash"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <hr />

        {/* Kepp your bitcoin cash safe */}
        <h3>Step 3: Keep Your Bitcoin Cash Safe</h3>
        <p>
          Back up your private key so you can get your Bitcoin Cash back even if
          your phone breaks
        </p>
        {/* horizontal line */}
        <hr />
        <iframe
          width="350"
          height="197"
          src="https://www.youtube.com/embed/1gRNVV5gKzU"
          title="How to Keep Your Bitcoin Cash Safe (Backing Up Private Key)"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <hr />

        {/* footer */}
        <div className="footer">
          <p>&copy; {new Date().getFullYear()} David Hudman</p>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Wallet;
