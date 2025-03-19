import React, { useState } from "react";

const DropdownLanguage = ({ options, selectedOption, onOptionSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="dropdown ms-2">
            <button
                className="btn d-flex align-items-center text-light dropdown-toggle custom-btn"
                onClick={toggleDropdown}
            >
                {selectedOption}
            </button>
            {isOpen && (
                <div className="dropdown-menu-lang dropdown-menu-dark show">
                    {options.map((option) => (
                        <div
                            key={option}
                            className="dropdown-item-lang text-center"
                            onClick={() => {
                                onOptionSelect(option);
                                setIsOpen(false);
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownLanguage;
