import React from "react";

import icon from "./assets/reload-icon.png";

interface Props {
  onReload: () => void;
}

const ReloadButton = ({ onReload }: Props) => {
  return (
    <button className="reload-button" onClick={() => onReload()}>
      <img src={icon} alt="icon button" className="reload-icon" />
    </button>
  );
};

export default ReloadButton;
