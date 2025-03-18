import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import AuthLayout from '../../components/auth-layout';
import Input from '../../components/ui/input';
import Button from '../../components/ui/button';

const SignIn = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sign In Data:', form);
        navigate('/dashboard'); 
    };

    return (
        <AuthLayout title="Sign In">
            <div className="auth-container">
                <div className="auth-card">
                    <span style={{ fontSize: '36px' }}>Let's get </span><span className="gradient-text" style={{ fontSize: '36px' }}>creative!</span>
                    <p className="paragraph mt-3">Log in to access a powerful online compiler and collaborate with your team in real-time.</p>
                    <form onSubmit={handleSubmit} className='mt-4'>
                        <div className="input-field">
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                className="custom-input"
                            />

                        </div>
                        <div className="input-field">
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                className="custom-input"
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <Link to="/forgot-password" className="gradient d-block">Forgot Password?</Link>
                            <Button text="Log In to Code Together" type="submit" onClick={handleSubmit} className="btn-create w-100 mt-4 " />
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <span style={{ color: '#B2B2B2' }}>Don't have an account? <Link to="/sign-up" className='gradient'>Sign Up</Link></span>
                    </div>


                </div>
            </div>
        </AuthLayout>
    );
};

export default SignIn;