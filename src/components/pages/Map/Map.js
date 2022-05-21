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

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true);
    });
  }, []);

  return (
    <div className="App">
      <h2>Bitcoin Cash Merchant Map</h2>
      {!loadMap ? <div>Loading...</div> : <GMap />}
      <br />
      <br />
    </div>
  );
};

export default App;
