import React, { ReactNode } from "react";

import "./Button.css";
type PropTypes = {
  text: string;
  onClickHandler: any;
  icon?: ReactNode;
};
export default function SecondaryButton({
  text,
  onClickHandler,
  icon,
}: PropTypes) {
  return (
    <>
      <span className="getNow-btn" onClick={onClickHandler}>
        {icon && icon}
        {text}
      </span>
    </>
  );
}
