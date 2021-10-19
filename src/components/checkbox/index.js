import React from "react";
import "./checkbox.scss";

const Checkbox = ({ name, value, onChange, disabled }) => {
  return (
    <span className={`checkbox-wrapper ${disabled ? "checkbox-wrapper--disabled" : ""}`}>
      <span className="checkbox-tick-wrapper">
        <input type="checkbox" name={name} checked={value} onChange={onChange} disabled={disabled} />
        <span className="checkbox-tick">
          <img
            src="https://ovo-fs-frontend-dev.oss-ap-southeast-5.aliyuncs.com/Font-awesom-icon/check-white.svg"
            alt="check"
          />
        </span>
      </span>
    </span>
  );
};

export default Checkbox;
