import React from "react";
import "./notFound.scss";

const NotFound = ({ text }) => {
  return (
    <div className="error-container">
      <div>
        <h1 className="error-status-code">404</h1>
        <h2 className="error-message">{text ? text : "This page could not be found"}</h2>
      </div>
    </div>
  );
};

export default NotFound;
