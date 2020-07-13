import React from "react";
import cn from "classnames";

export const Button = (props) => {
  const classNames = cn("border rounded px-2 py-1", props.className, {
    "bg-white text-black": props.selected,
  });
  return (
    <button
      className={classNames}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
