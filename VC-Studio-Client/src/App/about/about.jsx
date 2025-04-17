import React, { useState } from "react";
import Heading from "../../components/ui/Heading";
import Languages from "../../components/ui/Languages";
import Offer from "../../components/ui/Offer";
import Choose from "../../components/ui/Choose";
import Team from "../../components/ui/Team";
import MainContent from "../../components/main-content";
import { isLoggedIn } from "../../sessionUtils";

const AboutPage = ({ isLoggedIn }) => {
  return (
    <div className="d-flex">
      <MainContent isLoggedIn={isLoggedIn}>
        <section className="section">
          <div className="row align-items-top" />
          <div className="col-lg-12">
            <div className="card">
              <Heading></Heading>
              <Languages></Languages>
              <Offer></Offer>
              <Choose></Choose>
              <Team></Team>
            </div>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default AboutPage;
