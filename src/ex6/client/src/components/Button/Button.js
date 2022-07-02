import React from "react";
import "monday-ui-react-core/dist/main.css";
import "../Header/Header.css";

const Button = ({ children, ...props }) => {
  switch (props.as) {
    case "input":
      return (
        <input
          type="checkbox"
          name="done"
          value="done"
          id={props.id}
          checked={props.status}
          className="list-item-checkbox"
          onChange={props.change}
        >
          {children}
        </input>
      );
    case "button":
      return (
        <button onClick={props.click} type="button" id="list-item-submit">
          +{children}
        </button>
      );
    case "img":
      return (
        <img
          alt="delete"
          src={props.delete_icon}
          className="list-item-delete-button"
          onClick={props.click}
        >
          {children}
        </img>
      );
  }
};

export default Button;
