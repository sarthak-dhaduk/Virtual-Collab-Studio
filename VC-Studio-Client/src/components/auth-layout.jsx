import React from 'react';
import Header from './ui/header';
import '../../src/App.css';
import Footer from './ui/footer';

const AuthLayout = ({ title, children }) => {
    return (
        <>
            <Header title={title} />
            <div className="auth-container">
                <div className="p-4 shadow-sm auth-card">
                    {children}
                </div>
            </div>
            <Footer title={title}/>
        </>
    );
};

export default AuthLayout;
