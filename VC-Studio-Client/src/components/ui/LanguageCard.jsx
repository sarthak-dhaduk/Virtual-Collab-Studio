import React from "react";

const LanguageCard = ({ name, icon }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="d-flex language-card">
        {icon && <img src={icon} className="ms-3" alt={name} />}
        <span className="text-center ms-2 language-name">{name}</span>
      </div>
    </div>
  );
};

export default LanguageCard;
