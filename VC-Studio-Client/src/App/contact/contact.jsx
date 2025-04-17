import React, { useState } from "react";
import Title from "../../components/ui/Title";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import ContactDropdown from "../../components/ui/ContactDropdown";
import MainContent from "../../components/main-content";

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
  return (
    <MainContent isLoggedIn={isLoggedIn}>
      <section className="section">
        <div className="row align-items-top">
          <div className="col-12">
            <div className="card">
              <div className="card-body text-start d-flex align-items-center justify-content-center">
                <div className="w-100 contact-card" style={{ maxWidth: "75%" }}>
                  <form className="p-3 w-100">
                    <div className="text-container text-start w-100">
                      <Title />
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
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
                          <div className="mb-3">
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
                          <div className="mb-3">
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
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
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
                          <div className="mb-3">
                            <ContactDropdown
                              label="Subject"
                              options={subjects}
                              selected={selectedSubject}
                              onSelect={setSelectedSubject}
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <Button
                            text="Create free account"
                            type="submit"
                            className="btn-create w-100 mt-4"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainContent>
  );
};

export default ContactUs;
