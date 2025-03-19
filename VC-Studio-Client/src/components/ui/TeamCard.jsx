import React from "react";
import Tilt from "react-parallax-tilt";

const TeamCard = ({ name, role, description, initial }) => {
  return (
    <div className="col">
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
          className="card-height text-start"
          style={{
            border: "2px solid #A1AEBF",
            backgroundColor: "#0F0F0F",
            padding: "20px",
            height: "300px",
          }}
        >
          <div className="d-flex justify-content-start ms-4 align-items-center mt-3">
            <div
              className="d-flex justify-content-center align-items-center bg-primary text-center text-white rounded-circle me-2"
              style={{ width: "40px", height: "40px" }}
            >
              {initial}
            </div>
            <div className="ms-3 text-center">
              <span className="text-white d-block">{name}</span>
              <small className="text-muted text-start d-block">{role}</small>
            </div>
          </div>
          <p className="text-white px-4 mt-5">{description}</p>
        </div>
      </Tilt>
    </div>
  );
};

export default TeamCard;
