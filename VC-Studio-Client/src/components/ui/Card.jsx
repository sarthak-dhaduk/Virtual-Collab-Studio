import React from "react";
import Tilt from "react-parallax-tilt";

const Card = ({ image, title, description }) => {
  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <Tilt
        glareEnable={true} 
        glareMaxOpacity={0.3}
        glareColor="#ffffff"
        glarePosition="bottom"
        tiltMaxAngleX={15} 
        tiltMaxAngleY={15} 
        transitionSpeed={500}
        className="tilt-card"
      >
        <div
          className="text-start card-height"
          style={{
            border: "1px solid #A1AEBF",
            borderRadius: "4px",
            background: "#131619",
            padding: "20px",
            height: "270px",
          }}
        >
          <img
            src={image}
            className="my-3 ms-3"
            style={{ width: "50px", height: "50px" }}
            alt={title}
          />
          <h5 className="text-white mb-3 ms-4">{title}</h5>
          <p className="px-4" style={{ color: "#9B9C9E" }}>
            {description}
          </p>
        </div>
      </Tilt>
    </div>
  );
};

export default Card;
