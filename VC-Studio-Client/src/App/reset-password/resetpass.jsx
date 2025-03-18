import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/auth-layout';
import Input from '../../components/ui/input';
import Button from '../../components/ui/button';

const ResetPass = () => {
    const [form, setForm] = useState({
        password: '',
        confirmPassword: '',
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
        <AuthLayout title="Reset">
            <div className="auth-container">
                <div className="auth-card">
                    <span style={{ fontSize: '36px' }}>Forgot Password -   </span>
                    <span className="gradient-text" style={{ fontSize: '36px' }}>Create a New Password</span>
                    <p className="paragraph">Please enter your new password below to reset your account password. Ensure your new password meets the security requirements.</p>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Nwe Password"
                            value={form.fullName}
                            onChange={handleChange}
                            className="custom-input"
                            label="New Password"
                        />
                        <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={form.email}
                            onChange={handleChange}
                            className="custom-input"
                            label="Confirm Password"
                        />

                        <Button
                            text="Reset Password"
                            type="submit"
                            className="btn-create w-100 mt-4"
                        />
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
};

export default ResetPass;