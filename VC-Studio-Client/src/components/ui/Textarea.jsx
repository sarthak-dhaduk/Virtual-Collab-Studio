import React from "react";

const Textarea = ({ name, placeholder, value, onChange, className, label, rows }) => {
    return (
        <div className="input-field ">
            {label && <label htmlFor={name} className="form-label">{label}</label>}
            <textarea
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows={rows}
                className={`custom-textarea text-white border-0 ${className}`}
                style={{ height: "200px" }}

            ></textarea>
        </div>
    );
};

export default Textarea;
