import React from "react";
import cn from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export const Button = (props: ButtonProps) => {
  const classNames = cn("border rounded px-2 py-1", props.className, {
    "bg-white text-black": props.selected,
  });
  return (
    <button
      {...props}
      className={classNames}
      type={props.type || "button"}
    />
  );
};
