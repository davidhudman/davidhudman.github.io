import React, { useState } from "react"; // Fragment
import {
  // BrowserRouter as Router,
  // Route,
  // Routes,
  Link,
  useParams,
} from "react-router-dom";
import QRCode from "react-qr-code";

import "./printMerchantQr.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PrintMerchantQr() {
  const { merchantName } = useParams();

  return (
    <div className="Merchant">
      {/* Title */}
      <h1>BCH Merchant: {merchantName}</h1>
      <br />

      {/* QR Code */}
      <div className="qr-code">
        <QRCode value={"/merchant/" + merchantName} />
      </div>

      {/* Instructions */}
      <div className="instructions">
        <h2>Instructions</h2>
        <p>1. Have staff members scan this QR code with their phone.</p>

        <p>
          2. They will be taken to a page where they can enter the amount of BCH
          owed by the customer. They can also enter a tip amount.
        </p>

        <p>
          3. A new barcode will be generated for payment. The employee should
          leave their phone on this screen while the customer scans it with
          their BCH wallet app and confirms payment.
        </p>

        <p>
          4. The customer will be asked to confirm the amount of BCH to be paid.
        </p>

        <p>
          5. After the customer confirms the payment, the merchant will see a
          green checkmark if they left their phone on the screen they asked the
          customer to scan.
        </p>
      </div>

      {/* footer */}
      <div className="footer">
        <p>&copy; {new Date().getFullYear()} David Hudman</p>
      </div>
    </div>
  );
}
