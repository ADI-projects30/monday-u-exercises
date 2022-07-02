import PropTypes from "prop-types";

import "./Loader.css";

export function Loader({ size = "large", type = "secondary" }) {
  return (
    <div className={`loader size-${size}`}>
      <svg className={`circle-loader-spinner state-${type}`} viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
      </svg>
    </div>
  );
}

Loader.propTypes = {
  size: PropTypes.oneOf(["xs", "small", "medium", "large"]),
  type: PropTypes.oneOf(["primary", "dark", "secondary", "onColor"]),
};