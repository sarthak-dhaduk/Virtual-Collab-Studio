import React, { useState } from "react";
import Title from "../../components/ui/Title";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import ContactDropdown from "../../components/ui/ContactDropdown";
import MainContent from "../../components/main-content";
import axios from "axios";

const ContactUs = ({ isLoggedIn }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    message: "",
  });
  const subjects = ["General Inquiry", "Feature Request", "Feedback"];
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      subject: selectedSubject,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/contact/send-email", payload);
      alert("Message sent successfully!");
      setForm({ fullName: "", email: "", mobileNo: "", message: "" });
    } catch (err) {
      console.error("Email send failed:", err);
      alert("Failed to send message.");
    }
  };
  return (
    <MainContent isLoggedIn={isLoggedIn}>
      <section className="section">
        <div className="row align-items-top">
          <div className="col-12">
            <div className="card">
              <div className="card-body text-start d-flex justify-content-center">
                <form className="p-3 w-50 h-25" onSubmit={handleSubmit}>
                  <div className="text-container text-start w-100">
                    <Title></Title>
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
                        <ContactDropdown
                          label="Subject"
                          options={subjects}
                          selected={selectedSubject}
                          onSelect={setSelectedSubject}
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Input
                          type="text"
                          name="message"
                          placeholder="Type your message here..."
                          value={form.message}
                          onChange={handleChange}
                          className="custom-input"
                          label="Message"
                        />
                      </div>
                      <div className="col-md-6"></div>
                    </div>
                    
                    <Button
                      text="Create free account"
                      type="submit"
                      className="btn-create w-100 mt-4"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainContent>
  );
  
};

export default ContactUs;
