import React from "react";
import Tilt from "react-parallax-tilt";

const Card = ({ image, title, description }) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 d-flex">
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.3}
        glareColor="#ffffff"
        glarePosition="bottom"
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        transitionSpeed={500}
        className="tilt-card w-100"
      >
        <div
          className="card-height p-4 d-flex flex-column justify-content-between"
          style={{
            border: "1px solid #A1AEBF",
            borderRadius: "4px",
            background: "#131619",
            minHeight: "270px",
          }}
        >
          {/* Title & Image Row */}
          <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start">
            <img
              src={image}
              className="img-fluid my-2 me-md-3"
              style={{ width: "50px", height: "50px" }}
              alt={title}
            />
            <h5 className="text-white mb-0 mt-2 mt-md-0">{title}</h5>
          </div>

          {/* Description */}
          <p className="text-center text-md-start" style={{ color: "#9B9C9E" }}>
            {description}
          </p>
        </div>
      </Tilt>
    </div>
  );
};

export default Card;
