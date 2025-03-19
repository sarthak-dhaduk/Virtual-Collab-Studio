import React from "react";
import { languagesList1, languagesList2 } from "./languageData"; // Import language data
import LanguageText from "./LanguageText";
import LanguageCard from "./LanguageCard";

const Languages = () => {
  return (
    <div className="card-body text-white mx-4 languages-container">
      <div className="d-flex align-items-center">
        <LanguageText></LanguageText>
      </div>

      {/* First Marquee Section */}
      <div className="tech-slideshow">
        <div className="marquee-img">
          {languagesList1.map((lang, index) => (
            <LanguageCard key={index} name={lang.name} icon={lang.icon} />
          ))}
        </div>
      </div>

      {/* Second Marquee Section */}
      <div className="tech-slideshow-2">
        <div className="marquee-img-2">
          {languagesList2.map((lang, index) => (
            <LanguageCard key={index} name={lang.name} icon={lang.icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Languages;
