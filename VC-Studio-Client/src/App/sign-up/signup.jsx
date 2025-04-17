import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth-layout";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import axios from "axios"; // Import axios

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, contactNumber, password, confirmPassword } =
      formData;

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setSuccessMessage("");
      return;
    }

    // Clear previous error messages if all fields are valid
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          username,
          email,
          contactNumber,
          password,
        }
      );

      // If registration is successful, display the success message and redirect
      setSuccessMessage(response.data.message);
      setTimeout(() => {
        // Redirect to login page after 2 seconds
        navigate("/login");
      }, 2000);
    } catch (error) {
      // Handle API error response
      if (error.response && error.response.data) {
        // If there's a specific error message from the backend, show it
        setErrorMessage(error.response.data.message);
      } else {
        // For any other errors (e.g., network issues)
        setErrorMessage("Something went wrong. Please try again.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <AuthLayout title="Sign Up">
      <div className="auth-container">
        <div className="auth-card">
          <span style={{ fontSize: "36px" }}>Let's code </span>
          <span className="gradient-text" style={{ fontSize: "36px" }}>
            together!
          </span>
          <p className="paragraph">
            Sign up to unlock a dynamic compiler and start coding together in
            real-time with your team.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <Input
                  type="text"
                  placeholder="Full Name"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="custom-input"
                  label="Full Name"
                />
              </div>
              <div className="col-md-6">
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
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
                  placeholder="Mobile No."
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="custom-input"
                  label="Mobile No."
                />
              </div>
              <div className="col-md-6">
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
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
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="custom-input"
                  label="Confirm Password"
                />
              </div>
              <div className="col-md-6"></div>
            </div>
            {/* <div className="form-check">
              <input
                type="checkbox"
                name="agreeTerms"
                id="agreeTerms"
                checked={form.agreeTerms}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor="agreeTerms" className="form-check-label">
                I agree with{" "}
                <span className="gradient">Terms and conditions</span>
              </label>
            </div> */}
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
            {successMessage && (
              <div className="text-success">{successMessage}</div>
            )}
            <Button
              text="Create free account"
              type="submit"
              className="btn-create w-100 mt-4"
            />
          </form>

          <div className="mt-3 text-center">
            <span>
              Already have an account?{" "}
              <Link to="/" className="gradient">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
