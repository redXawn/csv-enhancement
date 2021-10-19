import React, { useEffect } from "react";
import "./loading.scss";

const Loading = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <div id="loading-wrapper" className="loading-container">
      <div className="loading-overlay" />
      <span className="loading-dots"></span>
      <span className="loading-dots"></span>
      <span className="loading-dots"></span>
    </div>
  );
};

export default Loading;
