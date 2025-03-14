import React from "react";
import logoImage from '../../assets/img/MainLogo.svg'; 
const MainLogo = () => {
    return (
        <div className="main-logo">
            <img src={logoImage} alt="Main Logo" className="w-auto h-auto" />
        </div>
    );
};

export default MainLogo;
