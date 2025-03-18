import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/auth-layout';
import Input from '../../components/ui/input';
import Button from '../../components/ui/button';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Forgot Password:', email);
    };

    return (
        <AuthLayout title="Forgot Password">
            <div className="auth-container">
                <div className="auth-card">
                    <span style={{fontSize:'36px'}} className="gradient-text">Forgot Password</span>
                    <p className="paragraph">
                        Regain access to your account by resetting your password. Enter your
                        registered email address, and we'll send you a link to reset it.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-field">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Enter Your Registered Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="custom-input"
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Button
                                        text="Send Reset Link"
                                        type="submit"
                                        className="btn-create w-100"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="mt-4 text-center">
                        <div className="mt-3 text-start">
                            <span style={{ color: '#9B9C9E' }}>Do you remember your password? </span>
                            <span><Link to="/" className="gradient">Sign In</Link></span>

                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default ForgotPassword;