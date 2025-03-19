import OfferTitle from "./OfferTitle";
import OfferDescription from "./OfferDescription";
import Card from "./Card";

import { cardData } from "./CardData";

const Offer = () => {
  return (
    <div className="card-body mt-5">
      <OfferTitle></OfferTitle>
      <OfferDescription></OfferDescription>
      <div className="justify-content-center mb-4 p-4">
        <div className="row row-cols-1 d-flex justify-content-center row-cols-md-4 g-4">
          {cardData.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offer;
