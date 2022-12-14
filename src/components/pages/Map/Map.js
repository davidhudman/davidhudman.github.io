import React, { useState, useEffect } from "react";
import GMap from "./GMap";

// TODO: API key of the google map that I will absolutely delete and change later
const GOOGLE_MAP_API_KEY = "AIzaSyB--d-Av1sjfOez49woBxKNYVR8BxTnoa4";

// load google map script
const loadGoogleMapScript = (callback) => {
  if (
    typeof window.google === "object" &&
    typeof window.google.maps === "object"
  ) {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
};

const App = () => {
  const [loadMap, setLoadMap] = useState(false);
  const [merchants, setMerchants] = useState([]);
  const [showMerchantList, setShowMerchantList] = useState(false);

  const showHideMerchantList = () => {
    setShowMerchantList(!showMerchantList);
  };

  const getMerchants = async () => {
    const response = await fetch(
      "https://j8tmnngcj5.execute-api.us-east-1.amazonaws.com/default/bchMerchant01"
    );
    const data = await response.json();

    // prepend hard coded merchants
    data.unshift(
      {
        merchantName: "Commercial Kitchen Stop",
        lastTransaction: "2022-05-20",
        transactionslast30days: "597",
        category: "Restaurant",
        partnerLevel: 4,
        coordinates: { lat: 26.64435, lng: -80.08751 },
        location: "2180 S Congress Ave Unit A, Palm Springs, FL 33406",
        phone: "(888) 219-8045",
        website: "commercialkitchenstop.com",
      },
      {
        merchantName: "Oli's Fashion Cuisine",
        lastTransaction: "2022-05-20",
        transactionslast30days: "321",
        category: "Restaurant",
        partnerLevel: 1,
        coordinates: { lat: 26.65018, lng: -80.21585 },
        location: "10610 Forest Hill Blvd #20, Wellington, FL 33414",
        phone: "(561) 792-2220",
        website: "olisfashioncuisine.com",
      },
      {
        merchantName: "Dibartolo's Wholesale Food Warehouse",
        lastTransaction: "2022-05-20",
        transactionslast30days: "125",
        category: "Restaurant",
        partnerLevel: 3,
        coordinates: { lat: 26.69091, lng: -80.17668 },
        location: "8140 Belvedere Rd, West Palm Beach, FL 33411",
        phone: "(561) 814-2988",
        website: "",
      },
      {
        merchantName: "Marbar Grille",
        lastTransaction: "2022-05-20",
        transactionslast30days: "248",
        category: "Restaurant",
        partnerLevel: 2,
        coordinates: { lat: 26.69448, lng: -80.24433 },
        location: "2001 Crestwood Blvd N, Royal Palm Beach, FL 33411",
        phone: "(561) 784-5225",
        website: "",
      },
      {
        merchantName: "Hobo's Gourmet Kitchen",
        lastTransaction: "2022-05-20",
        transactionslast30days: "511",
        category: "Restaurant",
        partnerLevel: 4,
        coordinates: { lat: 26.80773, lng: -80.05936 },
        location: "421 Northlake Blvd, North Palm Beach, FL 33408",
        phone: "(561) 841-8305",
        website: "hobosgourmetkitchen.net",
      },
      {
        merchantName: "Cucina Palm Beach Gardens",
        lastTransaction: "2022-05-20",
        transactionslast30days: "492",
        category: "Restaurant",
        partnerLevel: 1,
        coordinates: { lat: 26.8359586, lng: -80.131431 },
        location: "7100 Fairway Dr, FL-786 #61A, Palm Beach Gardens, FL 33418",
        phone: "(561) 557-9510",
        website: "cucinapbg.com",
      }
    );
    setMerchants(data);
  };

  useEffect(() => {
    getMerchants();
    loadGoogleMapScript(() => {
      setLoadMap(true);
    });
  }, []);

  return (
    <div className="App">
      <h2>Crypto Merchant Map</h2>
      <button
        className="btn btn-lg btn-block btn-default"
        onClick={showHideMerchantList}
      >
        Map View / List View
      </button>
      {showMerchantList ? (
        <div>
          {merchants.map((merchant) => (
            <div className="merchant" key={merchant.merchantId}>
              <h3>{merchant.merchantName}</h3>
              <p>Location: {merchant.location ? merchant.location : "N/A"}</p>
              {/* horizontal line */}
              <hr />
            </div>
          ))}
        </div>
      ) : null}
      {!loadMap ? <div>Loading...</div> : <GMap />}
      <br />
      <br />
    </div>
  );
};

export default App;
