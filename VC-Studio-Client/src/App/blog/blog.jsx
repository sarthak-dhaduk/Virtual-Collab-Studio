import { useState } from "react";
import { motion } from "framer-motion";
import MainContent from "../../components/main-content";
import ReviewList from "../../components/ui/ReviewList";

const BlogPage = () => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isReviewOpen, setIsReviewOpen] = useState(true);

  const reviews = [
    { name: "Sarthak Dhaduk", rating: "⭐⭐⭐⭐⭐", initial: "S" },
    { name: "Yash Lalani", rating: "⭐⭐⭐⭐", initial: "Y" },
    { name: "Jigar Kalariya", rating: "⭐⭐⭐⭐⭐", initial: "J" },
  ];

  return (
    <MainContent>
      <div className="row align-items-top">
        <div className="col-12 col-lg-12">
          <div className="card">
            <div
              className="card-header d-flex justify-content-between align-items-center"
              style={{
                background: "#0D0F10",
                borderRadius: "20px 20px 0px 0px",
              }}
            >
              <div className="d-flex align-items-center fw-bolder p-3">
                <h5 className="text-white mb-0">Armstrong Number</h5>
              </div>
              <div className="d-flex align-items-center">
                <span className="text-white me-2">4.5</span>
                <div className="ms-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.08094 1.64069C8.42102 0.786437 9.57934 0.786437 9.91943 1.64069L11.4 5.35972C11.5434 5.71985 11.8676 5.96591 12.2397 5.99708L16.0827 6.31896C16.9655 6.39289 17.3234 7.54381 16.6509 8.1457L13.7229 10.7661C13.4393 11.0198 13.3155 11.4179 13.4021 11.7973L14.2967 15.7153C14.5022 16.6152 13.5651 17.3265 12.8093 16.8443L9.51914 14.7447C9.20053 14.5414 8.79983 14.5414 8.48123 14.7447L5.19104 16.8443C4.43529 17.3265 3.4982 16.6152 3.70367 15.7153L4.59822 11.7973C4.68485 11.4179 4.56102 11.0198 4.27749 10.7661L1.34949 8.1457C0.676938 7.54381 1.03488 6.39289 1.91762 6.31896L5.76067 5.99708C6.13281 5.96591 6.45698 5.71985 6.60035 5.35972L8.08094 1.64069Z"
                      stroke="#686B6E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div
                    className="code-editor mt-3"
                    style={{ position: "relative", borderRadius: "12px" }}
                  >
                    <header
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "#191919",
                        borderRadius: "12px 12px 0 0",
                      }}
                    >
                      <h5 style={{ margin: "0", color: "white" }}></h5>
                      <button
                        className="btn btn-sm"
                        style={{ color: "#686B6E" }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.5 6H15C16.1046 6 17 6.89543 17 8V15C17 16.1046 16.1046 17 15 17H8C6.89543 17 6 16.1046 6 15V14.5M3 12H10C11.1046 12 12 11.1046 12 10V3C12 1.89543 11.1046 1 10 1H3C1.89543 1 1 1.89543 1 3V10C1 11.1046 1.89543 12 3 12Z"
                            stroke="#686B6E"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Copy Code
                      </button>
                    </header>
                    <div>
                      <pre>
                        <code style={{ color: "#686B6E" }}></code>
                      </pre>
                    </div>

                    <footer
                      style={{
                        background: "#191919",
                        color: "white",
                        borderRadius: "0 0 12px 12px",
                        textAlign: "center",
                        padding: "10px",
                      }}
                    ></footer>
                  </div>
                </div>

                <div className="col-12 col-md-6 mt-3">
                  <div className="accordion-container">
                    {/* Description Accordion */}
                    <div className="accordion" id="accordionDescription">
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id="headingDescription"
                        >
                          <button
                            className="accordion-button"
                            type="button"
                            onClick={() =>
                              setIsDescriptionOpen(!isDescriptionOpen)
                            }
                            aria-expanded={isDescriptionOpen}
                            aria-controls="collapseDescription"
                          >
                            <i
                              className={`bi bi-chevron-down accordion-icon ${
                                isDescriptionOpen ? "rotate-180" : ""
                              }`}
                            ></i>
                            <span className="ms-2">Description</span>
                          </button>
                        </h2>
                        <motion.div
                          id="collapseDescription"
                          className="accordion-collapse"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: isDescriptionOpen ? "auto" : 0,
                            opacity: isDescriptionOpen ? 1 : 0,
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="accordion-body">
                            Program to check if a given number N is an Armstrong
                            number.
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Review Accordion */}
                    <div className="accordion" id="accordionReview">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingReview">
                          <button
                            className="accordion-button"
                            type="button"
                            onClick={() => setIsReviewOpen(!isReviewOpen)}
                            aria-expanded={isReviewOpen}
                            aria-controls="collapseReview"
                          >
                            <i
                              className={`bi bi-chevron-down accordion-icon ${
                                isReviewOpen ? "rotate-180" : ""
                              }`}
                            ></i>
                            <span className="ms-2">Review</span>
                          </button>
                        </h2>
                        <motion.div
                          id="collapseReview"
                          className="accordion-collapse"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: isReviewOpen ? "auto" : 0,
                            opacity: isReviewOpen ? 1 : 0,
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="accordion-body">
                            <ReviewList reviews={reviews} />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContent>
  );
};

export default BlogPage;
