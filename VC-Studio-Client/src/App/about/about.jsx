import React, { useState } from 'react';
import Heading from "../../components/ui/Heading";
import Languages from "../../components/ui/Languages";
import Offer from "../../components/ui/Offer";
import Choose from "../../components/ui/Choose";
import Team from "../../components/ui/Team";
import MainContent from "../../components/main-content";
import Sidebar from '../../components/sidebar';
import { isLoggedIn } from '../../sessionUtils';

const AboutPage = ({ isLoggedIn: isLoggedInProp }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [users, setUsers] = useState([]);

  // Use the prop if provided, otherwise check session
  const isLoggedInState = isLoggedInProp ?? isLoggedIn();

  return (
    <div className="d-flex">
      <Sidebar
        isSidebarVisible={isSidebarVisible}
        isLoggedIn={isLoggedInState}
        users={users}
      />
      <MainContent>
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
