const Heading = () => {
    return (
      <div className="card-body w-100">
        <div className="title-bar mt-3 position-relative d-flex align-items-center justify-content-center rounded w-100">
          <div className="background-overlay"></div>
          <div className="grid-overlay"></div>
          <div className="content text-center">
            <h1 className="main-heading my-gradient text-start text-md-center fs-3 fs-md-1">
              Code, collaborate, and innovate together,
              <br className="d-none d-md-block" />
              let's shape the future of technology.
            </h1>
            <p className="sub-heading text-start text-md-center fs-6 fs-md-4">
              Join thousands of developers and bring your ideas to life!
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Heading;