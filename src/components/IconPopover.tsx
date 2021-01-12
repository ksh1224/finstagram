import { Popover } from "react-bootstrap";
import React from "react";

export default React.forwardRef(
  ({ popper, children, title, show: _, ...props }: any, ref) => {
    return (
      <Popover className="popover skin" ref={ref} {...props}>
        <h3 className="popover-header">{title}</h3>
        <div className="popover-body">{children}</div>
      </Popover>
    );
  }
);
