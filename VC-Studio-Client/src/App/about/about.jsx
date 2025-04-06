import Heading from "../../components/ui/Heading";
import Languages from "../../components/ui/Languages";
import Offer from "../../components/ui/Offer";
import Choose from "../../components/ui/Choose";
import Team from "../../components/ui/Team";
import MainContent from "../../components/main-content";

const AboutPage = () => {

  return (
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
  );
};

export default AboutPage;
