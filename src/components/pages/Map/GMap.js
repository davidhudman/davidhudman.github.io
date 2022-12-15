import React, { useEffect, useRef } from "react";

const GMap = () => {
  const googleMapRef = useRef(null);
  let googleMap = null;

  const infoWindow = new window.google.maps.InfoWindow({
    content: "",
  });

  useEffect(() => {
    googleMap = initGoogleMap({ lat: 26.7975452, lng: -80.1156059 });

    const markers = [
      {
        name: "Commercial Kitchen Stop",
        lastTransaction: "2022-05-20",
        transactionslast30days: "597",
        category: "Restaurant",
        partnerLevel: 4,
        coordinates: { lat: 26.64435, lng: -80.08751 },
        address: "2180 S Congress Ave Unit A, Palm Springs, FL 33406",
        phone: "(888) 219-8045",
        website: "commercialkitchenstop.com",
      },
      {
        name: "Oli's Fashion Cuisine",
        lastTransaction: "2022-05-20",
        transactionslast30days: "321",
        category: "Restaurant",
        partnerLevel: 1,
        coordinates: { lat: 26.65018, lng: -80.21585 },
        address: "10610 Forest Hill Blvd #20, Wellington, FL 33414",
        phone: "(561) 792-2220",
        website: "olisfashioncuisine.com",
      },
      {
        name: "Dibartolo's Wholesale Food Warehouse",
        lastTransaction: "2022-05-20",
        transactionslast30days: "125",
        category: "Restaurant",
        partnerLevel: 3,
        coordinates: { lat: 26.69091, lng: -80.17668 },
        address: "8140 Belvedere Rd, West Palm Beach, FL 33411",
        phone: "(561) 814-2988",
        website: "",
      },
      {
        name: "Marbar Grille",
        lastTransaction: "2022-05-20",
        transactionslast30days: "248",
        category: "Restaurant",
        partnerLevel: 2,
        coordinates: { lat: 26.69448, lng: -80.24433 },
        address: "2001 Crestwood Blvd N, Royal Palm Beach, FL 33411",
        phone: "(561) 784-5225",
        website: "",
      },
      {
        name: "Hobo's Gourmet Kitchen",
        lastTransaction: "2022-05-20",
        transactionslast30days: "511",
        category: "Restaurant",
        partnerLevel: 4,
        coordinates: { lat: 26.80773, lng: -80.05936 },
        address: "421 Northlake Blvd, North Palm Beach, FL 33408",
        phone: "(561) 841-8305",
        website: "hobosgourmetkitchen.net",
      },
      {
        name: "Cucina Palm Beach Gardens",
        lastTransaction: "2022-05-20",
        transactionslast30days: "492",
        category: "Restaurant",
        partnerLevel: 1,
        coordinates: { lat: 26.8359586, lng: -80.131431 },
        address: "7100 Fairway Dr, FL-786 #61A, Palm Beach Gardens, FL 33418",
        phone: "(561) 557-9510",
        website: "cucinapbg.com",
      },
      // { lat: 26, lng: -80 },
    ];

    markers.forEach((marker) => {
      createMarker(marker);
    });
  }, []);

  // initialize the google map
  const initGoogleMap = (coordinates) => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: coordinates,
      zoom: 10,
      gestureHandling: "auto",
      zoomControl: false,
      disableDefaultUI: true,
    });
  };

  // create marker on google map
  const createMarker = (biz) => {
    const greenMarker = {
      path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: "green",
      fillOpacity: 1,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
      // anchor: new google.maps.Point(15, 30),
    };

    const redMarker = Object.create(greenMarker);
    redMarker.fillColor = "red";
    // redMarker.path = "";

    const blueMarker = Object.create(greenMarker);
    blueMarker.fillColor = "blue";
    // blueMarker.path = "";

    const chooseIcon = (partnerLevel) => {
      switch (partnerLevel) {
        // case 1:
        //   return greenMarker;
        // case 2:
        //   return redMarker;
        // case 3:
        //   return blueMarker;
        default:
          return greenMarker;
      }
    };

    const marker = new window.google.maps.Marker({
      position: biz.coordinates,
      map: googleMap,
      icon: chooseIcon(biz.partnerLevel),
    });

    marker.addListener("click", () => {
      let infoWindowDescription = `<div>
        <h3>${biz.name}</h3>
        <p>
          <strong>Category: ${biz.category}</strong>
          <br />
          <br />
          <strong>Monthly Transactions: ${biz.transactionslast30days}</strong>
          <br />
          <br />
          <strong>Last Transaction: ${biz.lastTransaction}</strong>
          <br />
          <br />
          <strong>Category: ${biz.category}</strong>
        </p>
      </div>`;

      infoWindowDescription = `<div class="info-window">
        ${
          true
            ? ""
            : '<a class="report-button" href="mailto:support@davidhudman.com?subject=Report about VendorId 1234" tabindex="0">Report</a>'
        }
        <h3>${biz.name}</h3>
        <span>${biz.address}</span>
        <br /><br />
        <span>${biz.phone}</span>
        <br /><br />
        <div class="currencies-header">Accepted currencies</div>
        <div class="currency-list-wrapper">
          <div class="currency">
            <!-- <img src="https://s3.amazonaws.com/map.bitcoin.com/img/icon-bch.png" width="24" height="24" alt="Bitcoin Cash is supported"> -->
            <span>Bitcoin Cash</span>
          </div>
        </div>
        <br /><br />
        <div class="cta">
          <a href="tel:+1 ${biz.phone}" class="info-phone">Call</a>
          &nbsp;&nbsp;
          <a target="_blank" rel="noopenner noreferrer" class="web-btn" href="${
            biz.website
          }">Visit Website</a>
          <br /><br />
          <a class="directions-button-green" target="_blank" rel="noopenner noreferrer" href="https://maps.google.com/maps/dir//${
            biz.address
          }">
            <h4 class="button">Directions</h4>
          </a>          
        </div>
      </div>`;
      // address, phone, website, etc.
      // may need to split the address in the link with %20

      infoWindow.setContent(infoWindowDescription);

      // infoWindow.open(googleMap, marker);
      infoWindow.open({ map: googleMap, anchor: marker, shouldFocus: false });
    });

    return marker;
  };

  return (
    <div className="mapContainer">
      <div
        className="map"
        ref={googleMapRef}
        style={{ width: "100%", height: "100vH" }}
      />
    </div>
  );
};

export default GMap;
