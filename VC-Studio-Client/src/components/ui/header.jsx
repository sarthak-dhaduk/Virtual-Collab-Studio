import React from 'react';
import Logo from './logo';

const Header = ({ title }) => {
    return (
        <header className="mt-4">
            <div className="container d-flex justify-content-between align-items-center">
                <Logo />
                <span className="m-0 gradient-text fw-bolder" style={{fontSize:'20px'}}>{title}</span>
            </div>
        </header>
    );
};

export default Header;
