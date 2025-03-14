import React from 'react';

const Input = ({ type, name, placeholder, value, onChange, className, label }) => {
    return (
        <div className="input-field">
            {label && <label htmlFor={name} className="form-label">{label}</label>}
            <input
                type={type}
                name={name}
                id={name}
                className={`form-control ${className}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default Input;