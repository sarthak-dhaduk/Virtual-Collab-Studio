import React from "react";
import Tilt from "react-parallax-tilt";

const TeamCard = ({ name, role, description, initial }) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <Tilt
        glareEnable={true} 
        glareMaxOpacity={0.3}
        glareColor="#ffffff"
        glarePosition="bottom"
        tiltMaxAngleX={15} 
        tiltMaxAngleY={15} 
        transitionSpeed={500}
        className="tilt-card"
        style={{ borderRadius: "100px" }}
      >
        <div
          className="card-height text-start p-4"
          style={{
            border: "2px solid #A1AEBF",
            backgroundColor: "#0F0F0F",
            height: "100%", // Ensures equal height for all cards
          }}
        >
          <div className="d-flex align-items-center">
            <div
              className="d-flex justify-content-center align-items-center bg-primary text-white rounded-circle flex-shrink-0"
              style={{ width: "40px", height: "40px" }}
            >
              {initial}
            </div>
            <div className="ms-3">
              <span className="text-white d-block">{name}</span>
              <small className="text-muted d-block">{role}</small>
            </div>
          </div>
          <p className="text-white mt-4">{description}</p>
        </div>
      </Tilt>
    </div>
  );
};

export default TeamCard;
