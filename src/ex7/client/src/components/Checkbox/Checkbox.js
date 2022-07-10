const Checkbox = ({ children, ...props }) => {
  switch (props.type) {
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
  }
};

export default Checkbox;
