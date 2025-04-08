import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MainContent from "../../components/main-content";
import ReviewList from "../../components/ui/ReviewList";
import AddReview from "../../components/modals/AddReview";

const BlogPage = () => {  
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isReviewOpen, setIsReviewOpen] = useState(true);
  const [copyStatuses, setCopyStatuses] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewRefreshFunctions, setReviewRefreshFunctions] = useState({});

  const reviews = [
    { name: "Sarthak Dhaduk", rating: "⭐⭐⭐⭐⭐", initial: "S" },
    { name: "Yash Lalani", rating: "⭐⭐⭐⭐", initial: "Y" },
    { name: "Jigar Kalariya", rating: "⭐⭐⭐⭐⭐", initial: "J" },
  ];

  // Fetch blogs when component mounts
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/blog/getAllBlogs");
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = (codeSnippet, blogId) => {
    if (codeSnippet) {
      navigator.clipboard.writeText(codeSnippet)
        .then(() => {
          setCopyStatuses(prev => ({
            ...prev,
            [blogId]: "Copied!"
          }));
          setTimeout(() => {
            setCopyStatuses(prev => ({
              ...prev,
              [blogId]: "Copy Code"
            }));
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    }
  };

  const handleReviewAdded = (blogId) => {
    // Refresh blogs to update ratings
    fetchBlogs();
    // Refresh reviews for the specific blog
    if (reviewRefreshFunctions[blogId]) {
      reviewRefreshFunctions[blogId]();
    }
  };

  const handleReviewChange = (blogId, refreshFunction) => {
    setReviewRefreshFunctions(prev => ({
      ...prev,
      [blogId]: refreshFunction
    }));
  };

  if (loading) {
    return (
      <MainContent>
        <div className="d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <div className="row align-items-top">
        {blogs.map((blog, index) => (
          <div className="col-12 col-lg-12 mb-4" key={index}>
            <div className="card">
              <div
                className="card-header d-flex justify-content-between align-items-center"
                style={{
                  background: "#0D0F10",
                  borderRadius: "20px 20px 0px 0px",
                }}
              >
                <div className="d-flex align-items-center fw-bolder p-3">
                  <div className="d-flex align-items-center">
                    <div className="profile-avatar me-2">
                      {blog.username ? blog.username[0].toUpperCase() : 'U'}
                    </div>
                    <h5 className="text-white mb-0">
                      {blog.username || 'Unknown User'}
                    </h5>
                  </div>
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
                          onClick={() => handleCopyCode(blog.CodeSnippet, blog._id)}
                        >
                          <svg
                            width="18"
                            className="me-2"
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
                          {copyStatuses[blog._id] || "Copy Code"}
                        </button>
                      </header>
                      <div>
                        <pre>
                          <code style={{ color: "#686B6E" }}>
                            {blog.CodeSnippet}
                          </code>
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
                      <h5 className="fw-bold text-white p-4" style={{ fontSize: "20px" }}>
                        {blog.Title}
                      </h5>
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
                              {blog.Description}
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
                              <span className="ms-2">Reviews</span>
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
                              <ReviewList 
                                blogId={blog._id} 
                                onReviewChange={(refreshFunction) => handleReviewChange(blog._id, refreshFunction)}
                              />
                              <AddReview 
                                blogId={blog._id} 
                                onReviewAdded={() => handleReviewAdded(blog._id)} 
                              />
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
        ))}
      </div>
    </MainContent>
  );
};

export default BlogPage;
