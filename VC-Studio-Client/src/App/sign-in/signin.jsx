import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import AuthLayout from "../../components/auth-layout";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import axios from "axios"; 

const SignIn = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Send login request to the backend
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );

      // If login is successful, store user data in sessionStorage and update the state
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      setIsLoggedIn(true); // Update the parent component state

      // Redirect to home page
      setTimeout(() => {
        navigate("/dashboard"); // Redirect to Home after a successful login
      }, 2000); // 2 seconds delay to allow success message to be visible
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        console.log(error.message);
        setErrorMessage("Something went wrong. Please try again.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <AuthLayout title="Sign In">
      <div className="auth-container">
        <div className="auth-card">
          <span style={{ fontSize: "36px" }}>Let's get </span>
          <span className="gradient-text" style={{ fontSize: "36px" }}>
            creative!
          </span>
          <p className="paragraph mt-3">
            Log in to access a powerful online compiler and collaborate with
            your team in real-time.
          </p>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="input-field">
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                className="custom-input"
              />
            </div>
            <div className="input-field">
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="custom-input"
              />
            </div>
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
            {successMessage && (
              <div className="text-success">{successMessage}</div>
            )}
            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="gradient d-block">
                Forgot Password?
              </Link>
              <Button
                text="Log In to Code Together"
                type="submit"
                className="btn-create w-100 mt-4 "
              />
            </div>
          </form>
          <div className="mt-4 text-center">
            <span style={{ color: "#B2B2B2" }}>
              Don't have an account?{" "}
              <Link to="/sign-up" className="gradient">
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
