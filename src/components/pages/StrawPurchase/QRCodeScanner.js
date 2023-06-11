import React, { useRef, useEffect } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";

const QRCodeScanner = ({ onScan, width, height }) => {
  const videoRef = useRef(null);
  const codeReader = useRef(null);

  useEffect(() => {
    codeReader.current = new BrowserQRCodeReader();
    codeReader.current
      .decodeOnceFromVideoDevice(undefined, videoRef.current)
      .then((result) => {
        onScan(result.text);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      codeReader.current = null;
    };
  }, []);

  const videoStyle = {
    width,
    height,
    border: "1px solid black",
  };

  return <video ref={videoRef} style={videoStyle} />;
};

export default QRCodeScanner;
