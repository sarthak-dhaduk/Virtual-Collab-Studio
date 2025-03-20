import React, { useState } from "react";

const ContactDropdown = ({ label, options, selected, onSelect, className }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (option) => {
    onSelect(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className={`dropdown-container ${className}`}>
      {label && (
        <label className="form-label text-secondary" htmlFor="contact-dropdown">
          {label}
        </label>
      )}
      <div className="dropdown">
        <button
          className="btn dropdown-menu-contact d-flex align-items-center text-light dropdown-toggle custom-btn"
          type="button"
          onClick={toggleDropdown}
        >
          {selected || "Select an option"}
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu-contact">
            {options.map((option) => (
              <div
                key={option}
                className="dropdown-item-contact text-center"
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactDropdown;
