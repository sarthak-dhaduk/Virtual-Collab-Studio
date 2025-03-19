import TeamTitle from "./TeamTitle";
import TeamCard from "./TeamCard";
import { teamCardData } from "./TeamCardData";
const Team=()=>{

    return(
        <div className="card-body mx-4 mt-3 mb-3" style={{ backgroundColor: "#000000" }}
>
        <TeamTitle></TeamTitle>
        <div className="container mt-4">
        <div className="row row-cols-1 mb-3 row-cols-sm-2 row-cols-md-3 d-flex justify-content-center g-4">
          {teamCardData.map((card, index) => (
            <TeamCard
              key={index}
              name={card.name}
              role={card.role}
              description={card.description}
              initial={card.initial}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;