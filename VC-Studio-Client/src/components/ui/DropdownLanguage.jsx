import React, { useState } from "react";

const DropdownLanguage = ({ options, selectedOption, onOptionSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="dropdown ms-2">
            <button
                className="btn d-flex align-items-center justify-content-between text-light custom-btn"
                style={{ appearance: "none" }}
                onClick={toggleDropdown}
            >
                <span style={{color: "#686B6E"}}>{selectedOption}</span>
                <span className="ms-2">
                    <i className="bi bi-chevron-down" style={{ color: "#686B6E", fontWeight: "bold", fontSize: "1.4em" }}></i>
                </span>
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
