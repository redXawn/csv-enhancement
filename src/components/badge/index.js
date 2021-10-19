import React from "react";

import "./badge.scss";

const Badge = ({ success, warning, danger, info, children }) => {
  function setColor() {
    let badgeProps = "";
    if (success) {
      badgeProps = "success";
    } else if (info) {
      badgeProps = "info";
    } else if (warning) {
      badgeProps = "warning";
    } else if (danger) {
      badgeProps = "danger";
    }
    return "badge--" + badgeProps;
  }

  return <div className={`badge ${setColor()}`}>{children}</div>;
};

export default Badge;
