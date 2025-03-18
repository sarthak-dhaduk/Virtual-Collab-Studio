import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/auth-layout';
import Input from '../../components/ui/input';
import Button from '../../components/ui/button';

const SignUp = () => {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        mobileNo: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sign Up Data:', form);
    };

    return (
        <AuthLayout title="Sign Up">
            <div className="auth-container">
                <div className="auth-card">
                    <span style={{ fontSize: '36px' }}>Let's code  </span>
                    <span className="gradient-text" style={{ fontSize: '36px' }}>together!</span>
                    <p className="paragraph">Sign up to unlock a dynamic compiler and start coding together in real-time with your team.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <Input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    className="custom-input"
                                    label="Full Name"
                                />
                            </div>
                            <div className="col-md-6">
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="custom-input"
                                    label="Email"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Input
                                    type="text"
                                    name="mobileNo"
                                    placeholder="Mobile No."
                                    value={form.mobileNo}
                                    onChange={handleChange}
                                    className="custom-input"
                                    label="Mobile No."
                                />
                            </div>
                            <div className="col-md-6">
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="custom-input"
                                    label="Password"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    className="custom-input"
                                    label="Confirm Password"
                                />
                            </div>
                            <div className="col-md-6">
                            </div>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                name="agreeTerms"
                                id="agreeTerms"
                                checked={form.agreeTerms}
                                onChange={handleChange}
                                className="form-check-input"
                            />
                            <label htmlFor="agreeTerms" className="form-check-label">
                                I agree with <span className="gradient">Terms and conditions</span>
                            </label>
                        </div>
                        <Button
                            text="Create free account"
                            type="submit"
                            className="btn-create w-100 mt-4"
                        />
                    </form>

                    <div className="mt-3 text-center">
                        <span>Already have an account? <Link to="/" className="gradient">Login</Link></span>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default SignUp;